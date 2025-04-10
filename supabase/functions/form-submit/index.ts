
// Form submission edge function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

interface FormData {
  formType: 'contact' | 'prayer' | 'volunteer' | 'resource';
  data: Record<string, any>;
}

serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error('Expected POST request');
    }

    const { formType, data } = await req.json() as FormData;

    if (!formType || !data) {
      throw new Error('Form type and data are required');
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    let insertResult;
    let notificationSubject = '';
    let notificationBody = '';

    // Process different form types
    switch (formType) {
      case 'contact':
        // Process contact form
        notificationSubject = `Nouveau message de contact de ${data.name}`;
        notificationBody = `
          Nom: ${data.name}
          Email: ${data.email}
          Sujet: ${data.subject}
          Message: ${data.message}
        `;
        break;

      case 'prayer':
        // Insert into prayer_commitments table
        insertResult = await supabaseClient
          .from('prayer_commitments')
          .insert(data);
        
        notificationSubject = `Nouvel engagement de prière de ${data.name}`;
        notificationBody = `
          Nom: ${data.name}
          Email: ${data.email}
          Fréquence: ${data.frequency}
          Sujets: ${Array.isArray(data.preferred_topics) ? data.preferred_topics.join(', ') : data.preferred_topics}
        `;
        break;

      case 'volunteer':
        // Insert into volunteer_commitments table
        insertResult = await supabaseClient
          .from('volunteer_commitments')
          .insert(data);
        
        notificationSubject = `Nouvel engagement bénévole de ${data.name}`;
        notificationBody = `
          Nom: ${data.name}
          Email: ${data.email}
          Téléphone: ${data.phone || 'Non fourni'}
          Compétences: ${Array.isArray(data.skills) ? data.skills.join(', ') : data.skills}
          Disponibilité: ${data.availability}
          Message: ${data.message || 'Aucun message'}
        `;
        break;

      case 'resource':
        // Insert into resource_contributions table
        insertResult = await supabaseClient
          .from('resource_contributions')
          .insert(data);
        
        notificationSubject = `Nouvelle contribution de ressources de ${data.name}`;
        notificationBody = `
          Nom: ${data.name}
          Email: ${data.email}
          Téléphone: ${data.phone || 'Non fourni'}
          Type de ressource: ${data.resource_type}
          Description: ${data.description}
          Valeur estimée: ${data.estimated_value || 'Non spécifiée'}
          Récurrent: ${data.is_recurring ? 'Oui' : 'Non'}
          ${data.is_recurring ? `Fréquence: ${data.recurring_frequency}` : ''}
          Message: ${data.message || 'Aucun message'}
        `;
        break;

      default:
        throw new Error('Unknown form type');
    }

    // Send email notification if SMTP is configured
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpUsername = Deno.env.get("SMTP_USERNAME");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    
    if (smtpHost && smtpUsername && smtpPassword) {
      const client = new SmtpClient();
      await client.connectTLS({
        hostname: smtpHost,
        port: 587,
        username: smtpUsername,
        password: smtpPassword,
      });

      const notifyTo = Deno.env.get("NOTIFICATION_EMAIL") || "contact@gbuss.org";
      
      await client.send({
        from: smtpUsername,
        to: notifyTo,
        subject: notificationSubject,
        content: notificationBody,
      });
      
      await client.close();
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: "Form submitted successfully"
    }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders 
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 400,
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders 
      },
    });
  }
});
