"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageSquare, Heart, Clock } from "lucide-react";

const navItems = [
  { label: "Accueil", icon: Home, href: "/" },
  { label: "Clarifier", icon: Search, href: "/clarify" },
  { label: "Répondre", icon: MessageSquare, href: "/respond" },
  { label: "Enfant", icon: Heart, href: "/child" },
  { label: "Historique", icon: Clock, href: "/history" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[430px] h-16 bg-white/80 backdrop-blur-md border-t border-[#E2E0D9] flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
                isActive
                  ? "text-[#3563E9]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
