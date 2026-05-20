import { AlertTriangle, Heart, MessageCircle, Phone } from "lucide-react";

export const metadata = {
  title: "Urgences — Clair",
  description: "Numéros d'aide et d'urgence en France. Tu n'es pas seul.",
};

interface UrgencyContact {
  number: string;
  name: string;
  description: string;
  hours: string;
  icon: typeof Phone;
  highlight?: boolean;
}

const CONTACTS: UrgencyContact[] = [
  {
    number: "119",
    name: "Allô Enfance en danger",
    description: "Pour signaler ou être écouté en cas de maltraitance d'un enfant",
    hours: "24h/24, 7j/7, gratuit, anonyme",
    icon: Heart,
    highlight: true,
  },
  {
    number: "3018",
    name: "Cyberharcèlement et violences numériques",
    description: "Pour les jeunes victimes de harcèlement en ligne",
    hours: "Lundi à vendredi 9h-23h, samedi 9h-20h, gratuit",
    icon: MessageCircle,
    highlight: true,
  },
  {
    number: "3114",
    name: "Numéro national de prévention du suicide",
    description: "Si tu penses au suicide ou si tu t'inquiètes pour quelqu'un",
    hours: "24h/24, 7j/7, gratuit, confidentiel",
    icon: Heart,
    highlight: true,
  },
  {
    number: "09 72 39 40 50",
    name: "SOS Amitié",
    description: "Écoute anonyme pour traverser une difficulté",
    hours: "24h/24, 7j/7, anonyme",
    icon: Phone,
  },
  {
    number: "0 800 858 858",
    name: "Croix-Rouge Écoute",
    description: "Écoute en cas de handicap, précarité, isolement",
    hours: "Du lundi au vendredi 10h-19h, gratuit",
    icon: Phone,
  },
  {
    number: "15",
    name: "SAMU — Urgence médicale",
    description: "Urgences médicales graves",
    hours: "24h/24",
    icon: AlertTriangle,
  },
  {
    number: "18",
    name: "Pompiers",
    description: "Urgences (incendie, accident, secours)",
    hours: "24h/24",
    icon: AlertTriangle,
  },
  {
    number: "112",
    name: "Urgence européen",
    description: "Toutes urgences depuis n'importe quel pays UE",
    hours: "24h/24",
    icon: AlertTriangle,
  },
];

export default function UrgencyPage() {
  return (
    <main className="mx-auto max-w-[430px] min-h-screen pb-24 px-4">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#1E293B] mb-2">
          Tu n&apos;es pas seul
        </h1>
        <p className="text-[#475569] text-sm">
          Si tu vis une situation difficile, voici des numéros d&apos;aide gratuits et
          confidentiels.
        </p>
      </header>

      <div className="space-y-3 mt-4">
        {CONTACTS.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.number}
              href={`tel:${contact.number.replace(/\s/g, "")}`}
              className={`block rounded-2xl p-4 border transition-colors ${
                contact.highlight
                  ? "bg-[#FFE5E5] border-[#E07A5F] hover:bg-[#FFD6D6]"
                  : "bg-white border-[#E2E0D9] hover:bg-[#F8F6F0]"
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={`w-6 h-6 mt-1 flex-shrink-0 ${
                    contact.highlight ? "text-[#E07A5F]" : "text-[#3563E9]"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xl text-[#1E293B] tracking-wide">
                    {contact.number}
                  </div>
                  <div className="font-semibold text-[#1E293B] mt-1">
                    {contact.name}
                  </div>
                  <div className="text-sm text-[#475569] mt-1">
                    {contact.description}
                  </div>
                  <div className="text-xs text-[#64748B] mt-2 italic">
                    {contact.hours}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <section className="mt-8 p-4 bg-[#EDF4FF] rounded-2xl border border-[#3563E9]/20">
        <h2 className="font-semibold text-[#1E293B] mb-2">Pour aller plus loin</h2>
        <ul className="text-sm text-[#475569] space-y-2">
          <li>
            <strong>CMP (Centre Médico-Psychologique)</strong> de ta ville :
            consultations gratuites de psychiatrie sur prescription.
          </li>
          <li>
            <strong>CRA (Centre Ressources Autisme)</strong> de ta région :{" "}
            <a
              href="https://gncra.fr/cra/annuaire-cra/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3563E9] underline"
            >
              annuaire GNCRA
            </a>
          </li>
          <li>
            <strong>Maison Départementale des Personnes Handicapées (MDPH)</strong> :
            aides administratives liées au handicap.
          </li>
        </ul>
      </section>

      <p className="text-xs text-[#64748B] mt-6 text-center">
        Clair ne remplace pas un suivi professionnel. En cas de danger immédiat,
        appelle le 15, le 18 ou le 112.
      </p>
    </main>
  );
}
