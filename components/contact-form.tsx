"use client";

import { FormEvent, useState } from "react";
import { AnimatedLabel } from "@/components/animated-label";

const email = "santhoshsekar2903@gmail.com";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const from = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !from || !message) {
      setError("Please complete each field before sending.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${from}${phone ? `\nPhone: ${phone}` : ""}`)}`;
    setSent(true);
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
      <label className="contact-form__phone-field">Phone<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
      <label>Message<textarea name="message" rows={4} placeholder="Tell me a little about your project…" required /></label>
      {error && <p className="contact-form__message" role="alert">{error}</p>}
      {sent && <p className="contact-form__message" role="status">Your email app should open with a draft ready to send.</p>}
      <button className="button button--dark" type="submit" aria-label="Send message"><AnimatedLabel>SEND MESSAGE</AnimatedLabel><span>↗</span></button>
      <p className="contact-form__footnote">This form opens your email app with a prefilled message.</p>
    </form>
  );
}
