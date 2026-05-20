import Link from "next/link";
import { LifeBuoy } from "lucide-react";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Link
        href="/urgence"
        aria-label="Besoin d'aide d'urgence"
        className="fixed top-3 right-3 z-50 bg-[#E07A5F] hover:bg-[#C56A50] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors"
      >
        <LifeBuoy className="w-6 h-6" aria-hidden="true" />
      </Link>
      {children}
    </div>
  );
}
