import {
  CheckCircle,
  EnvelopeSimple,
  PaperPlaneTilt,
} from '@phosphor-icons/react';
import { useState, type FormEvent } from 'react';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

interface ContactFormProps {
  email?: string;
}

interface FormspreeResponse {
  errors?: Array<{ message?: string }>;
}

const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

export function ContactForm({ email }: ContactFormProps) {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  function handleFormChange() {
    if (submissionState === 'success' || submissionState === 'error') {
      setSubmissionState('idle');
      setStatusMessage('');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionState === 'sending') {
      return;
    }

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    if (!formEndpoint) {
      setSubmissionState('error');
      setStatusMessage(
        email
          ? `The form is not connected yet. Please email ${email} instead.`
          : 'The form is not connected yet. Please try again later.',
      );
      return;
    }

    const formData = new FormData(form);

    setSubmissionState('sending');
    setStatusMessage('Sending your message…');

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const result = (await response
          .json()
          .catch(() => null)) as FormspreeResponse | null;
        const errorMessage = result?.errors
          ?.map((error) => error.message)
          .filter(Boolean)
          .join(' ');

        throw new Error(errorMessage || 'Formspree rejected the submission.');
      }

      form.reset();
      setSubmissionState('success');
      setStatusMessage(
        'Message sent. Thanks for reaching out—I’ll get back to you soon.',
      );
    } catch {
      setSubmissionState('error');
      setStatusMessage(
        email
          ? `Your message could not be sent. Please try again or email ${email}.`
          : 'Your message could not be sent. Please try again later.',
      );
    }
  }

  return (
    <div className="contact-shell">
      <div className="contact-copy">
        <p className="contact-eyebrow">Say hello</p>
        <h2>Let’s build something useful together.</h2>
        <p>
          Have an engineering role, technical project, or collaboration in mind?
          Send a note here and it will land directly in my inbox.
        </p>

        {email && (
          <div className="contact-direct">
            <span>Prefer email?</span>
            <a className="focus-ring" href={`mailto:${email}`}>
              <EnvelopeSimple aria-hidden="true" size={18} weight="bold" />
              {email}
            </a>
          </div>
        )}
      </div>

      <form
        className="contact-form"
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      >
        <input
          aria-hidden="true"
          autoComplete="off"
          className="contact-honeypot"
          name="_gotcha"
          tabIndex={-1}
          type="text"
        />
        <input name="_subject" type="hidden" value="New portfolio message" />

        <fieldset
          className="contact-fields"
          disabled={submissionState === 'sending'}
        >
          <div className="contact-field">
            <label htmlFor="contact-name">Name</label>
            <input
              autoComplete="name"
              id="contact-name"
              name="name"
              placeholder="Your name"
              required
              type="text"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Email</label>
            <input
              autoComplete="email"
              id="contact-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a little about what you have in mind."
              required
              rows={5}
            />
          </div>
        </fieldset>

        <button
          className="button button-primary contact-submit"
          disabled={submissionState === 'sending'}
          type="submit"
        >
          {submissionState === 'sending' ? (
            'Sending…'
          ) : submissionState === 'success' ? (
            <>
              <CheckCircle aria-hidden="true" size={19} weight="bold" />
              Sent
            </>
          ) : (
            <>
              Send message
              <PaperPlaneTilt aria-hidden="true" size={18} weight="bold" />
            </>
          )}
        </button>

        <p
          aria-live="polite"
          className={`contact-status contact-status-${submissionState}`}
          role="status"
        >
          {statusMessage}
        </p>
      </form>
    </div>
  );
}
