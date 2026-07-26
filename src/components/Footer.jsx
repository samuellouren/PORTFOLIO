import { useLanguage } from "../context/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-borderSoft">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-5 px-5 py-7 sm:px-7">
        <span className="text-[13px] text-faint">{t.footer}</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-[#6F5B4D]">
          © {new Date().getFullYear()} · MACEIÓ, AL
        </span>
      </div>
    </footer>
  );
}
