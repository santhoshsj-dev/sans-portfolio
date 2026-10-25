"use client";

import { FormEvent, useState } from "react";

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
    <form className="contact-form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <label>NAME*<input name="name" autoComplete="off" required /></label>
      <label>EMAIL*<input name="email" type="email" autoComplete="off" required /></label>
      <label className="contact-form__phone-field">PHONE*<input name="phone" type="tel" autoComplete="off" /></label>
      <label>MESSAGE*<textarea name="message" rows={4} required /></label>
      {error && <p className="contact-form__message" role="alert">{error}</p>}
      {sent && <p className="contact-form__message" role="status">Your email app should open with a draft ready to send.</p>}
      <div className="contact-form__submit-row">
        <button className="button button--dark" type="submit">SUBMIT</button>
      </div>
    </form>
  );
}
