import { useState } from "react";
import { site } from "@/data/site";
import styles from "./ContactForm.module.css";

const openMail = ({ name, message }) => {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(message);
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
};

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      if (json.delivered) {
        setStatus("sent");
        e.currentTarget.reset();
      } else {
        setStatus("mailto");
        openMail(data);
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <label>
        Your name
        <input name="name" required minLength={2} maxLength={80} autoComplete="name" />
      </label>
      <label>
        Your email
        <input name="email" type="email" required maxLength={120} autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={10} maxLength={3000} rows={6} />
      </label>
      {/* Honeypot: real visitors never see or fill this. */}
      <input className={styles.trap} name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={styles.actions}>
        <button className="button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {status === "sent" && "Message sent. I will reply by email."}
          {status === "mailto" && "Your email app should open with the message ready to send."}
          {status === "error" && (
            <>Sending failed. Email me directly at <a href={`mailto:${site.email}`}>{site.email}</a>.</>
          )}
        </p>
      </div>
    </form>
  );
}
