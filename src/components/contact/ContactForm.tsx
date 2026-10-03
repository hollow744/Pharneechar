'use client';
import { useState, useEffect, type FormEvent } from 'react';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface ToastState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const [toast, setToast] = useState<ToastState | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [subjectVal, setSubjectVal] = useState('');
  const [messageVal, setMessageVal] = useState('');

  // Auto-dismiss toast after 6 seconds, pausing when user hovers
  useEffect(() => {
    if (!toast?.show || isPaused) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast, isPaused]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');
      const subject = params.get('subject');
      if (subject) {
        setSubjectVal(subject);
      } else if (product) {
        setSubjectVal(`Quote Request: ${product}`);
        setMessageVal(`Hello Pharneechar team,\n\nI am interested in the ${product}. Please share specifications, pricing for the default standard size, and custom fabrication options.`);
      }
    }
  }, []);

  function validate(data: { name: string; email: string; phone: string; message: string }): Record<string, string> {
    const validationErrors: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
      validationErrors.name = 'Please enter your name (at least 2 characters).';
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (data.phone && data.phone.trim().length > 0 && !/^[\d\s+\-()]{7,20}$/.test(data.phone.trim())) {
      validationErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (!data.message || data.message.trim().length < 10) {
      validationErrors.message = 'Please enter a message (at least 10 characters).';
    }

    return validationErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;

    console.log('📬 [Contact Form] Submit button clicked.');

    const formData = new FormData(formElement);

    // Honeypot check for bots
    const honeypot = (formData.get('hp_website_check') as string) || (formData.get('website_url') as string);
    if (honeypot && honeypot.trim() !== '') {
      console.warn('⚠️ [Contact Form] Honeypot triggered, blocking submission:', honeypot);
      return;
    }

    const name = ((formData.get('name') as string) || '').trim();
    const email = ((formData.get('email') as string) || '').trim();
    const phone = ((formData.get('phone') as string) || '').trim();
    const company = ((formData.get('company') as string) || '').trim();
    const subject = ((formData.get('subject') as string) || subjectVal || `New Furniture Inquiry from ${name}`).trim();
    const message = ((formData.get('message') as string) || messageVal || '').trim();

    const submissionData = {
      name,
      email,
      phone: phone || 'Not provided',
      company: company || 'Not provided',
      subject: subject || 'New Furniture Inquiry',
      message,
    };

    console.log('📋 [Contact Form] Submitted data payload:', submissionData);

    // Client-side validation
    const validationErrors = validate({ name, email, phone, message });
    if (Object.keys(validationErrors).length > 0) {
      console.warn('❌ [Contact Form] Validation failed with errors:', validationErrors);
      setErrors(validationErrors);

      // Focus first error field for immediate user feedback
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorInput = formElement.querySelector<HTMLElement>(`[name="${firstErrorKey}"]`);
      if (errorInput) {
        errorInput.focus();
      }

      setToast({
        show: true,
        type: 'error',
        title: 'Action Required',
        message: validationErrors[firstErrorKey],
        action: {
          label: 'Fix Field',
          onClick: () => {
            errorInput?.focus();
            setToast(null);
          },
        },
      });
      return;
    }

    setErrors({});
    setFormState({ status: 'loading', message: '' });
    console.log('🚀 [Contact Form] Sending inquiry to /api/contact...');

    try {
      // 1. Direct Web3Forms submission (reliable client-side submission for static Cloudflare Pages)
      const clientKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'df40e66b-4ba2-47df-bfdf-5fb8778b5f38';
      let w3Success = false;
      if (clientKey) {
        try {
          const w3Res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              access_key: clientKey,
              from_name: 'Pharneechar Inquiry',
              ...submissionData,
            }),
          });
          const w3Data = await w3Res.json();
          w3Success = w3Res.ok && Boolean(w3Data.success);
          console.log('🌐 [Contact Form] Web3Forms direct response:', w3Data);
        } catch (err) {
          console.warn('⚠️ [Contact Form] Client direct Web3Forms notice:', err);
        }
      }

      // 2. Server API route / Cloudflare Pages Function
      let serverSuccess = false;
      let serverMessage = '';
      let serverError = '';
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(submissionData),
        });
        const respData = await response.json().catch(() => null);
        if (response.ok && respData?.success) {
          serverSuccess = true;
          serverMessage = respData.message || '';
          console.log('📥 [Contact Form] Server response:', { status: response.status, respData });
        } else if (respData?.error) {
          serverError = respData.error;
        }
      } catch (srvErr) {
        console.warn('⚠️ [Contact Form] /api/contact route notice:', srvErr);
      }

      if (serverSuccess || w3Success) {
        console.log('✅ [Contact Form] Inquiry submitted and saved successfully!');
        setFormState({
          status: 'success',
          message: serverMessage || 'Thank you for your inquiry! We have received your message and will get back to you shortly.',
        });

        // Trigger Toast Notification (Amazon & Flipkart Style)
        setToast({
          show: true,
          type: 'success',
          title: 'Inquiry Sent Successfully! ✉️',
          message: 'Thank you! Your requirements have been received. Our team will contact you shortly.',
          action: {
            label: 'Chat on WhatsApp',
            href: 'https://wa.me/919016406429?text=Hello%20Pharneechar,%20I%20have%20submitted%20an%20inquiry%20on%20your%20website',
          },
        });

        try {
          formElement.reset();
        } catch {
          // Ignore if form is unmounted
        }
        setSubjectVal('');
        setMessageVal('');
      } else {
        const errorMsg = serverError || 'Something went wrong. Please try again or chat with us directly on WhatsApp.';
        console.error('❌ [Contact Form] Server responded with error:', errorMsg);
        setFormState({
          status: 'error',
          message: errorMsg,
        });
        setToast({
          show: true,
          type: 'error',
          title: 'Submission Issue',
          message: errorMsg,
          action: {
            label: 'WhatsApp Support',
            href: 'https://wa.me/919016406429',
          },
        });
      }
    } catch (err) {
      console.error('❌ [Contact Form] Network or submission exception:', err);
      setFormState({
        status: 'error',
        message: 'Unable to send message right now. Please chat with us on WhatsApp (+91 9157333844) or email pharneechar2478@gmail.com.',
      });
      setToast({
        show: true,
        type: 'error',
        title: 'Network Issue',
        message: 'Unable to send message right now. Connect directly on WhatsApp.',
        action: {
          label: 'Open WhatsApp',
          href: 'https://wa.me/919157333844',
        },
      });
    }
  }

  return (
    <>
      {/* Amazon & Flipkart Style Toast Notification Component */}
      {toast && toast.show && (
        <aside
          role="status"
          aria-live="polite"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="fixed bottom-5 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-1.5rem)] sm:w-auto sm:min-w-[420px] sm:max-w-lg transition-all duration-300 ease-out transform drop-shadow-2xl"
        >
          <div
            className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 backdrop-blur-xl shadow-2xl transition-all ${
              toast.type === 'success'
                ? 'bg-[#18181b]/95 text-white border-emerald-500/30 shadow-emerald-950/40 ring-1 ring-emerald-500/20'
                : 'bg-[#18181b]/95 text-white border-rose-500/30 shadow-rose-950/40 ring-1 ring-rose-500/20'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {/* Status Badge Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${
                  toast.type === 'success'
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                    : 'bg-rose-500 text-white ring-4 ring-rose-500/20'
                }`}
              >
                {toast.type === 'success' ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 pt-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                    {toast.title}
                  </p>
                  {toast.type === 'success' && (
                    <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {toast.message}
                </p>

                {/* E-Commerce Flipkart/Amazon Style Action Button */}
                {toast.action && (
                  <div className="mt-3 flex items-center gap-2">
                    {toast.action.href ? (
                      <a
                        href={toast.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500 hover:bg-accent-400 px-3.5 py-1.5 text-xs font-bold text-neutral-900 transition-colors shadow-sm"
                      >
                        {toast.action.label}
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={toast.action.onClick}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500 hover:bg-accent-400 px-3.5 py-1.5 text-xs font-bold text-neutral-900 transition-colors shadow-sm"
                      >
                        {toast.action.label}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setToast(null)}
                className="text-neutral-400 hover:text-white rounded-lg p-1.5 transition-colors hover:bg-white/10 shrink-0"
                aria-label="Dismiss notification"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Countdown progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
              <div
                className={`h-full ${toast.type === 'success' ? 'bg-emerald-400' : 'bg-rose-400'}`}
                style={{
                  animation: 'shrinkWidth 6s linear forwards',
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
              />
            </div>
          </div>
        </aside>
      )}

      {formState.status === 'success' ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-8 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-primary-900">Inquiry Received Successfully!</h3>
          <p className="mt-2 text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            {formState.message}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919157333844?text=Hello%20Pharneechar,%20I%20have%20submitted%20an%20inquiry%20on%20your%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              Chat with us on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setFormState({ status: 'idle', message: '' })}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from users, catches bots */}
      <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="hp_website_check">Do not fill this field</label>
        <input
          type="text"
          id="hp_website_check"
          name="hp_website_check"
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-primary-800">
          Name <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          className="mt-1.5 block w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm text-primary-800 placeholder:text-neutral-400 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-primary-800">
          Email <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          autoComplete="email"
          className="mt-1.5 block w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm text-primary-800 placeholder:text-neutral-400 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
        )}
      </div>

      {/* Phone & Company - 2 column */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-primary-800">
            Phone
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            className="mt-1.5 block w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm text-primary-800 placeholder:text-neutral-400 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
            placeholder="+91 XXXXX XXXXX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-primary-800">
            Company
          </label>
          <input
            type="text"
            id="contact-company"
            name="company"
            autoComplete="organization"
            className="mt-1.5 block w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm text-primary-800 placeholder:text-neutral-400 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
            placeholder="Your company name"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-primary-800">
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          value={subjectVal}
          onChange={(e) => setSubjectVal(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm text-primary-800 placeholder:text-neutral-400 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
          placeholder="Product inquiry, quote request, etc."
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-primary-800">
          Message <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={messageVal}
          onChange={(e) => setMessageVal(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm text-primary-800 placeholder:text-neutral-400 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors resize-y"
          placeholder="Tell us about your requirements..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600" role="alert">{errors.message}</p>
        )}
      </div>

      {/* Error message */}
      {formState.status === 'error' && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4" role="alert">
          <p className="text-sm text-red-700">{formState.message}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState.status === 'loading'}
        className="inline-flex w-full items-center justify-center rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 sm:w-auto"
      >
        {formState.status === 'loading' ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
    )}
  </>
  );
}
