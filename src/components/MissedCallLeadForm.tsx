import { useState, type FormEvent } from "react";

const TRADES = ["Plumber", "HVAC", "Roofing", "Dental", "Salon", "Law firm", "Other"];
const ENDPOINT = "https://formsubmit.co/ajax/zkadtani@gmail.com";

const inputCls =
  "mt-1 w-full rounded-xl border border-[#0A0F1A]/20 bg-white px-4 py-3 font-sans text-[16px] text-[#0A0F1A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE]";

export default function MissedCallLeadForm({ monthlyLoss, yearlyLoss }: { monthlyLoss: number; yearlyLoss: number }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 200);
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: get("name"),
          business: get("business"),
          email: get("email"),
          phone: get("phone"),
          trade: get("trade"),
          monthly_loss: Math.round(monthlyLoss),
          yearly_loss: Math.round(yearlyLoss),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || (data && (data.success === false || data.success === "false"))) throw new Error();
      setStatus("ok");
      e.currentTarget?.reset?.();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="mcc-lead-heading" className="surface-card mt-8 rounded-3xl p-6 md:p-8">
      <h2 id="mcc-lead-heading" className="text-[32px] md:text-[44px] leading-none text-[#0A0F1A]" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
        Want help fixing this?
      </h2>
      <p className="mt-3 font-sans text-[17px] text-[#0A0F1A]/80">
        Send your details and I will run a free AI Checkup for your business.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="font-sans text-[14px] font-semibold text-[#0A0F1A]">Contact name
          <input name="name" required maxLength={100} autoComplete="name" className={inputCls} />
        </label>
        <label className="font-sans text-[14px] font-semibold text-[#0A0F1A]">Business name
          <input name="business" required maxLength={150} autoComplete="organization" className={inputCls} />
        </label>
        <label className="font-sans text-[14px] font-semibold text-[#0A0F1A]">Email
          <input name="email" type="email" required maxLength={255} autoComplete="email" className={inputCls} />
        </label>
        <label className="font-sans text-[14px] font-semibold text-[#0A0F1A]">Phone
          <input name="phone" type="tel" required maxLength={30} autoComplete="tel" className={inputCls} />
        </label>
        <label className="font-sans text-[14px] font-semibold text-[#0A0F1A] sm:col-span-2">Trade
          <select name="trade" required defaultValue="" className={inputCls}>
            <option value="" disabled>Choose one</option>
            {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-cta" disabled={status === "sending"}>Send</button>
          <p role="status" aria-live="polite" className="mt-3 font-sans text-[15px] text-[#0A0F1A]">
            {status === "ok" && "Thank you. Your details have been saved."}
            {status === "error" && "Your details could not be saved. Please try again."}
          </p>
        </div>
      </form>
    </section>
  );
}
