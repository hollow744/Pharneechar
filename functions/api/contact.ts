// Cloudflare Pages Function for /api/contact
export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  try {
    const body = (await context.request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      subject?: string;
      message?: string;
    };

    const { name, email, phone, company: companyName, subject, message } = body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'Name is required (at least 2 characters).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'A valid email address is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Message must be at least 10 characters.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const accessKey =
      context.env?.WEB3FORMS_ACCESS_KEY ||
      context.env?.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      'df40e66b-4ba2-47df-bfdf-5fb8778b5f38';

    if (accessKey) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            from_name: 'Pharneechar Website (Cloudflare Pages)',
            name: name.trim(),
            email: email.trim(),
            phone: phone ? String(phone).trim() : 'Not provided',
            company: companyName ? String(companyName).trim() : 'Not provided',
            subject: subject ? String(subject).trim() : `New Inquiry from ${name.trim()}`,
            message: message.trim(),
          }),
        });
      } catch (err) {
        console.warn('Web3Forms delivery note in Cloudflare Function:', err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your inquiry! Our team will contact you shortly.',
        inquiryId: `inq_${Date.now()}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred. Please try again or chat with us on WhatsApp.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
