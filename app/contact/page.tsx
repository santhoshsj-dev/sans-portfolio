import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <>
    <section className="contact-hero container"><span className="eyebrow">OPEN TO GOOD IDEAS</span><h1>contact<br /><span>me.</span></h1><div className="contact-hero-image" role="img" aria-label="Editorial concert concept image" /><p>Let’s make something<br />worth putting out there.</p></section>
    <section className="contact-section section-pad"><div className="container contact-grid"><div className="contact-info"><span className="eyebrow">SAY HELLO</span><a className="contact-email" href="mailto:santhoshsekar2903@gmail.com">santhoshsekar<br />2903@gmail.com <span>↗</span></a><a className="contact-phone" href="tel:+918608451017">+91 86084 51017</a><div className="contact-socials"><a href="https://in.linkedin.com/in/santhoshsj" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://designerdotsans.framer.website/" target="_blank" rel="noreferrer">Portfolio ↗</a></div><p className="contact-location"><span className="status-dot" /> BASED IN CHENNAI, INDIA<br />WORKING EVERYWHERE.</p></div><div><span className="eyebrow form-eyebrow">SEND A MESSAGE</span><ContactForm /></div></div></section>
  </>;
}
