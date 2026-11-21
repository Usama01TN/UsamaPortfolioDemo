import { site } from "@/data/site";

const hits = new Map(); // ip -> timestamps; resets whenever the server restarts
const LIMIT = 5;
const WINDOW = 60 * 1000;

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  if (limited(ip)) return res.status(429).json({ error: "Too many messages. Try again in a minute." });

  const { name = "", email = "", message = "", company = "" } = req.body || {};
  if (company) return res.status(200).json({ delivered: true }); // honeypot: pretend it worked

  const n = String(name).trim();
  const e = String(email).trim();
  const m = String(message).trim();
  if (n.length < 2 || n.length > 80) return res.status(400).json({ error: "Enter your name." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) || e.length > 120) return res.status(400).json({ error: "Enter a valid email." });
  if (m.length < 10 || m.length > 3000) return res.status(400).json({ error: "Write a message of 10 to 3000 characters." });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return res.status(200).json({ delivered: false }); // client falls back to mailto

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: e,
        subject: `Portfolio message from ${n}`,
        text: `${m}\n\nFrom: ${n} <${e}>`,
      }),
    });
    if (!r.ok) throw new Error(`Resend responded ${r.status}`);
    return res.status(200).json({ delivered: true });
  } catch {
    return res.status(502).json({ error: "Could not send the message." });
  }
}
