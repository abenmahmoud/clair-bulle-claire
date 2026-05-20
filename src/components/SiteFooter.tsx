import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 mb-20 px-4 text-center text-xs text-[#64748B] space-y-2">
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        <Link href="/a-propos" className="hover:text-[#3563E9] hover:underline">
          À propos
        </Link>
        <span>·</span>
        <Link href="/ethique" className="hover:text-[#3563E9] hover:underline">
          Éthique
        </Link>
        <span>·</span>
        <Link href="/confidentialite" className="hover:text-[#3563E9] hover:underline">
          Confidentialité
        </Link>
        <span>·</span>
        <Link href="/legal" className="hover:text-[#3563E9] hover:underline">
          Mentions légales
        </Link>
        <span>·</span>
        <Link href="/urgence" className="hover:text-[#E07A5F] font-semibold hover:underline">
          Urgences
        </Link>
      </div>
      <p>
        Clair ne remplace pas un suivi professionnel. Open source AGPL v3 ·{" "}
        <a
          href="https://github.com/abenmahmoud/clair-bulle-claire"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#3563E9] hover:underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
