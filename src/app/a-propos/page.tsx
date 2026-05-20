import Link from "next/link";

export const metadata = {
  title: "À propos — Clair",
  description: "Le projet Clair / Bulle Claire en quelques mots.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[430px] min-h-screen pb-24 px-4">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#1E293B]">À propos</h1>
      </header>

      <section className="text-[#1E293B] space-y-4">
        <div>
          <h2 className="font-semibold text-lg">Mission</h2>
          <p className="text-sm mt-2">
            Clair est une application qui aide les personnes neuroatypiques (TSA, TDAH,
            hypersensibles, anxieuses socialement) ainsi que les parents, enseignants et
            AESH à décoder l&apos;implicite social. Notre objectif est de proposer une
            traduction prudente, sans jamais affirmer ce qu&apos;une personne pense
            vraiment.
          </p>
          <p className="text-sm mt-2">
            <strong>Bulle Claire</strong> est le mode enfant dédié, conçu pour être utilisé
            en présence d&apos;un adulte de confiance.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mt-4">Pourquoi ce projet</h2>
          <p className="text-sm mt-2">
            L&apos;implicite social est l&apos;une des plus grandes difficultés rencontrées
            par les personnes neuroatypiques. Les outils existants soit posent des
            diagnostics, soit affirment des choses qu&apos;on ne peut pas savoir, soit ne
            sont pas adaptés aux contextes français (école, AESH, MDPH).
          </p>
          <p className="text-sm mt-2">
            Clair veut être un compagnon prudent et utile, validé par des professionnels,
            accessible à tous.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mt-4">Porteur du projet</h2>
          <p className="text-sm mt-2">
            Adel Benmahmoud — enseignant en lycée professionnel, fondateur d&apos;Essuf-Group
            SAS, porteur des projets SafeScol (anti-harcèlement scolaire) et Clair. Le
            projet vise à terme à devenir une association loi 1901 dédiée.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mt-4">Open source</h2>
          <p className="text-sm mt-2">Le code de Clair est publié sous licence AGPL v3 :</p>
          <a
            href="https://github.com/abenmahmoud/clair-bulle-claire"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3563E9] underline text-sm mt-1 inline-block"
          >
            github.com/abenmahmoud/clair-bulle-claire
          </a>
        </div>

        <div>
          <h2 className="font-semibold text-lg mt-4">Pour aller plus loin</h2>
          <ul className="text-sm space-y-1 mt-2">
            <li>
              <Link href="/ethique" className="text-[#3563E9] underline">
                Notre charte éthique
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="text-[#3563E9] underline">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/legal" className="text-[#3563E9] underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/urgence" className="text-[#3563E9] underline">
                Numéros d&apos;aide et d&apos;urgence
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
