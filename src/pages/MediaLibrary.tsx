
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Image, FileText, FileVideo, File, Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getMediaLibraryItems, uploadMediaFile } from "@/services/mediaLibraryService";
import type { MediaLibraryItem } from "@/lib/supabase";

const MediaLibrary = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: mediaItems, isLoading, refetch } = useQuery({
    queryKey: ['mediaLibrary'],
    queryFn: () => getMediaLibraryItems(),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Aucun fichier sélectionné",
        description: "Veuillez sélectionner un fichier à télécharger.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      await uploadMediaFile(selectedFile, altText, description);
      toast({
        title: "Téléchargement réussi",
        description: "Le fichier a été téléchargé avec succès.",
      });
      // Reset form
      setSelectedFile(null);
      setAltText("");
      setDescription("");
      setDialogOpen(false);
      // Refetch media items
      refetch();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur s'est produite lors du téléchargement du fichier.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Filter media by type
  const images = mediaItems?.filter(item => item.file_type === 'image') || [];
  const documents = mediaItems?.filter(item => item.file_type === 'application') || [];
  const videos = mediaItems?.filter(item => item.file_type === 'video') || [];
  const others = mediaItems?.filter(item => 
    !['image', 'application', 'video'].includes(item.file_type)
  ) || [];

  return (
    <Layout>
      <PageHeader
        title="Bibliothèque de médias"
        subtitle="Gérez tous les fichiers médias de votre site"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gbuss-blue">Fichiers médias</h2>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gbuss-green hover:bg-gbuss-green/90">
                  <Upload className="mr-2 h-4 w-4" /> Télécharger un fichier
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Télécharger un nouveau fichier</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Fichier</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alt-text">Texte alternatif</Label>
                    <Input
                      id="alt-text"
                      placeholder="Description pour l'accessibilité"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description du fichier"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleUpload} 
                    className="w-full" 
                    disabled={isUploading || !selectedFile}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Téléchargement...
                      </>
                    ) : "Télécharger"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-gbuss-blue" />
            </div>
          ) : (
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">Tous ({mediaItems?.length || 0})</TabsTrigger>
                <TabsTrigger value="images">Images ({images.length})</TabsTrigger>
                <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
                <TabsTrigger value="videos">Vidéos ({videos.length})</TabsTrigger>
                <TabsTrigger value="others">Autres ({others.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <MediaGrid items={mediaItems || []} />
              </TabsContent>

              <TabsContent value="images">
                <MediaGrid items={images} />
              </TabsContent>

              <TabsContent value="documents">
                <MediaGrid items={documents} />
              </TabsContent>

              <TabsContent value="videos">
                <MediaGrid items={videos} />
              </TabsContent>

              <TabsContent value="others">
                <MediaGrid items={others} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </Layout>
  );
};

const MediaGrid = ({ items }: { items: MediaLibraryItem[] }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun fichier trouvé dans cette catégorie.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(item => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
};

const MediaCard = ({ item }: { item: MediaLibraryItem }) => {
  const getFileIcon = () => {
    switch (item.file_type) {
      case 'image':
        return <Image className="h-10 w-10 text-gbuss-blue" />;
      case 'application':
        return <FileText className="h-10 w-10 text-gbuss-purple" />;
      case 'video':
        return <FileVideo className="h-10 w-10 text-gbuss-red" />;
      default:
        return <File className="h-10 w-10 text-gbuss-green" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {item.file_type === 'image' ? (
          <img 
            src={item.file_path} 
            alt={item.alt_text || item.file_name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center">
            {getFileIcon()}
            <span className="text-sm text-gray-500 mt-2">{item.file_type}</span>
          </div>
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="font-medium text-sm truncate" title={item.file_name}>
          {item.file_name}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <a 
          href={item.file_path} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-gbuss-blue hover:underline"
        >
          Voir le fichier
        </a>
      </CardFooter>
    </Card>
  );
};

export default MediaLibrary;
