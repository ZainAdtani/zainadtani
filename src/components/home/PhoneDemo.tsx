import { useState } from "react";

/** Phone frame around an app icon. Hover or tap plays a gentle looping demo built from the icon. */
export function PhoneDemo({ icon, name }: { icon: string; name: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-label={`${name} preview`}
      aria-pressed={on}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onClick={() => setOn((v) => !v)}
      className={`phone-demo ${on ? "is-on" : ""} relative w-[120px] h-[230px] rounded-[28px] border-[6px] border-[#0A0F1A] bg-[#0A0F1A] p-1 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] focus-visible:ring-offset-2`}
    >
      <span className="absolute left-1/2 top-1 h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/20" aria-hidden="true" />
      <span className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[20px] bg-[hsl(45,82%,94%)]">
        <span className="phone-demo-bg absolute inset-0 bg-center bg-cover opacity-25 blur-xl" style={{ backgroundImage: `url(${icon})` }} aria-hidden="true" />
        <img src={icon} alt={`${name} app icon`} width={64} height={64} loading="lazy" className="phone-demo-icon relative w-16 h-16 rounded-[22%] shadow-md" />
        <span className="relative mt-4 flex w-16 flex-col gap-1.5" aria-hidden="true">
          <span className="phone-demo-bar h-1.5 rounded-full bg-[#0A0F1A]/20" />
          <span className="phone-demo-bar h-1.5 w-3/4 rounded-full bg-[#0A0F1A]/15" />
          <span className="phone-demo-bar h-1.5 w-1/2 rounded-full bg-[#DD5013]/40" />
        </span>
      </span>
    </button>
  );
}
