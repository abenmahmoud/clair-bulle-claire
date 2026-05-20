export const metadata = {
  title: "Mentions légales — Clair",
  description: "Mentions légales du site Clair.",
};

export default function LegalPage() {
  return (
    <main className="mx-auto max-w-[430px] min-h-screen pb-24 px-4">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#1E293B]">Mentions légales</h1>
      </header>

      <div className="prose prose-sm text-[#1E293B] space-y-4">
        <section>
          <h2 className="font-semibold text-lg mt-4">Éditeur du site</h2>
          <p>
            <strong>Essuf-Group SAS</strong> (en cours d&apos;immatriculation)
            <br />
            Adresse : [À COMPLÉTER]
            <br />
            SIREN : [À COMPLÉTER]
            <br />
            Directeur de la publication : Adel Benmahmoud
            <br />
            Contact : contact@safescol.fr
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mt-4">Hébergeur</h2>
          <p>
            <strong>Vercel Inc.</strong>
            <br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA
            <br />
            Site : vercel.com
          </p>
          <p className="text-sm text-[#475569] mt-2">
            En vertu du RGPD, le transfert de données vers les États-Unis est encadré par
            les clauses contractuelles types (CCT) approuvées par la Commission européenne.
            Aucune donnée personnelle n&apos;est cependant transmise à Vercel par
            l&apos;application Clair (voir notre{" "}
            <a href="/confidentialite" className="text-[#3563E9] underline">
              politique de confidentialité
            </a>
            ).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mt-4">Propriété intellectuelle</h2>
          <p>
            Le code source de Clair est publié sous licence AGPL v3, disponible sur
            GitHub :{" "}
            <a
              href="https://github.com/abenmahmoud/clair-bulle-claire"
              className="text-[#3563E9] underline"
            >
              github.com/abenmahmoud/clair-bulle-claire
            </a>
            .
          </p>
          <p>
            Les pictogrammes utilisés (lorsque disponibles) proviennent de la banque
            ARASAAC, sous licence Creative Commons BY-NC-SA, propriété du gouvernement
            d&apos;Aragon (Espagne).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mt-4">Contact</h2>
          <p>Pour toute question : contact@safescol.fr</p>
        </section>
      </div>
    </main>
  );
}
