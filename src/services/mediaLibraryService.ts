
import supabase from '../lib/supabase';
import type { MediaLibraryItem } from '../lib/supabase';

const STORAGE_BUCKET = 'media';

/**
 * Get all media library items
 */
export const getMediaLibraryItems = async (fileType?: string): Promise<MediaLibraryItem[]> => {
  let query = supabase
    .from('media_library')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (fileType) {
    query = query.eq('file_type', fileType);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data as MediaLibraryItem[];
};

/**
 * Get a single media library item by ID
 */
export const getMediaLibraryItemById = async (id: number): Promise<MediaLibraryItem> => {
  const { data, error } = await supabase
    .from('media_library')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as MediaLibraryItem;
};

/**
 * Upload a file to the media library
 */
export const uploadMediaFile = async (
  file: File, 
  altText?: string, 
  description?: string
): Promise<MediaLibraryItem> => {
  // Generate a unique file path
  const filePath = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  
  // Upload file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file);
  
  if (uploadError) throw uploadError;
  
  // Get the public URL for the uploaded file
  const { data: { publicUrl } } = supabase
    .storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath);
  
  // Store metadata in the media_library table
  const { data: mediaItem, error: insertError } = await supabase
    .from('media_library')
    .insert({
      file_name: file.name,
      file_path: publicUrl,
      file_type: file.type.split('/')[0], // e.g., 'image', 'video', etc.
      file_size: file.size,
      alt_text: altText,
      description: description,
    })
    .select()
    .single();
  
  if (insertError) {
    // If metadata insertion fails, try to delete the uploaded file
    await supabase
      .storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);
    
    throw insertError;
  }
  
  return mediaItem as MediaLibraryItem;
};

/**
 * Delete a media library item and its associated file
 */
export const deleteMediaItem = async (id: number): Promise<void> => {
  // First get the item to retrieve the file path
  const { data: mediaItem, error: fetchError } = await supabase
    .from('media_library')
    .select('file_path')
    .eq('id', id)
    .single();
  
  if (fetchError) throw fetchError;
  
  // Extract the file name from the public URL
  const filePath = mediaItem.file_path.split('/').pop();
  
  // Delete the file from storage
  const { error: storageError } = await supabase
    .storage
    .from(STORAGE_BUCKET)
    .remove([filePath]);
  
  if (storageError) throw storageError;
  
  // Delete the metadata entry
  const { error: deleteError } = await supabase
    .from('media_library')
    .delete()
    .eq('id', id);
  
  if (deleteError) throw deleteError;
};

/**
 * Update media library item metadata
 */
export const updateMediaItemMetadata = async (
  id: number, 
  metadata: { alt_text?: string; description?: string; }
): Promise<MediaLibraryItem> => {
  const { data, error } = await supabase
    .from('media_library')
    .update(metadata)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as MediaLibraryItem;
};
