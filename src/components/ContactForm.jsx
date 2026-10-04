'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Reveal from './Reveal';
import { EMAIL, EMAILJS } from '../lib/site';

function problemWith(data) {
    if (!data.name || data.name.trim().length < 2) return 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) return 'Enter a valid email address.';
    if (!data.subject || data.subject.trim().length < 3) return 'Add a subject of at least 3 characters.';
    if (!data.message || data.message.trim().length < 10) return 'Write a message of at least 10 characters.';
    return null;
}

export default function ContactForm() {
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);      // { type: 'success' | 'error', text }
    const [justSent, setJustSent] = useState(false); // plays the chequered-flag finish
    const sentTimer = useRef(0);

    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form));

        const problem = problemWith(data);
        if (problem) { setStatus({ type: 'error', text: problem }); return; }

        setSending(true);
        setStatus(null);
        try {
            await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_email: EMAIL,
            }, { publicKey: EMAILJS.publicKey });
            setStatus({ type: 'success', text: "Message sent. I'll get back to you soon." });
            form.reset();
            setJustSent(true);
            clearTimeout(sentTimer.current);
            sentTimer.current = setTimeout(() => setJustSent(false), 2200);
        } catch (error) {
            console.error('EmailJS error:', error);
            setStatus({ type: 'error', text: `The message could not be sent. Email ${EMAIL} directly instead.` });
        } finally {
            setSending(false);
        }
    };

    return (
        <Reveal as="form" variant="fade-right" delay={0.2} className={`contact-form${justSent ? ' just-sent' : ''}`} id="contactForm" onSubmit={onSubmit} noValidate>
            <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" placeholder="Jonas Bondoc" autoComplete="name" required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" placeholder="jonas@example.com" autoComplete="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows={6} placeholder="Tell me about your project..." required />
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={sending}>
                <span>{sending ? 'Sending…' : 'Send Message'}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M19 1L9 11M19 1l-6 18-4-8-8-4 18-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className={`form-message${status ? ` ${status.type}` : ''}`} role="status">{status ? status.text : ''}</div>
        </Reveal>
    );
}
