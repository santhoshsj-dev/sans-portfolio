import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <>
    <section className="contact-page__hero site-layout__container"><span className="type__eyebrow">OPEN TO GOOD IDEAS</span><h1>contact<br /><span>me.</span></h1><div className="contact-page__hero-image" role="img" aria-label="Editorial concert concept image" /><p>Let’s make something<br />worth putting out there.</p></section>
    <section className="contact-page__section site-layout__section"><div className="site-layout__container contact-page__grid"><div className="contact-page__info"><span className="type__eyebrow">SAY HELLO</span><a className="contact-page__email" href="mailto:santhoshsekar2903@gmail.com">santhoshsekar<br />2903@gmail.com <span>↗</span></a><a className="contact-page__phone" href="tel:+918608451017">+91 86084 51017</a><div className="contact-page__socials"><a href="https://in.linkedin.com/in/santhoshsj" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://designerdotsans.framer.website/" target="_blank" rel="noreferrer">Portfolio ↗</a></div><p className="contact-page__location"><span className="contact-page__status-dot" /> BASED IN CHENNAI, INDIA<br />WORKING EVERYWHERE.</p></div><div><span className="type__eyebrow contact-form__eyebrow">SEND A MESSAGE</span><ContactForm /></div></div></section>
  </>;
}
