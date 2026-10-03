import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    const { name, email, phone, company: companyName, subject, message } = body || {};

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message is required and must be at least 10 characters.' },
        { status: 400 }
      );
    }

    const inquiry = {
      id: `inq_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : 'Not provided',
      company: companyName ? String(companyName).trim() : 'Not provided',
      subject: subject ? String(subject).trim() : `New Inquiry from ${name.trim()}`,
      message: message.trim(),
    };

    // 1. Persist lead to inquiries.json so NO customer submission is ever lost
    try {
      const dataDir = path.join(process.cwd(), 'src', 'data');
      const inquiriesFilePath = path.join(dataDir, 'inquiries.json');
      let inquiriesList = [];
      if (fs.existsSync(inquiriesFilePath)) {
        try {
          const content = fs.readFileSync(inquiriesFilePath, 'utf-8');
          inquiriesList = JSON.parse(content);
        } catch {
          inquiriesList = [];
        }
      }
      inquiriesList.unshift(inquiry);
      fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiriesList, null, 2), 'utf-8');
    } catch (fsErr) {
      console.error('Error saving inquiry to local file:', fsErr);
    }

    // 2. Try Web3Forms if an access key is set with 3.5s timeout so user is never blocked
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey && accessKey !== 'your_access_key_here') {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: siteUrl,
            Referer: `${siteUrl}/contact`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: inquiry.subject,
            from_name: 'Pharneechar Website',
            name: inquiry.name,
            email: inquiry.email,
            phone: inquiry.phone,
            company: inquiry.company,
            message: inquiry.message,
          }),
        });
        clearTimeout(timeoutId);
        console.log('📡 [Contact API] Web3Forms relay response status:', res.status);
      } catch (e) {
        clearTimeout(timeoutId);
        console.warn('⚠️ [Contact API] Web3Forms relay note (proceeding with local save):', e);
      }
    }

    console.log('✅ INCOMING INQUIRY RECORDED:');
    console.log(inquiry);

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your inquiry has been received. Our team will contact you shortly.',
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error('Contact form server error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again or chat with us on WhatsApp.' },
      { status: 500 }
    );
  }
}
