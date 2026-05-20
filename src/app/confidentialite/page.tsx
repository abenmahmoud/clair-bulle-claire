export const metadata = {
  title: "Confidentialité — Clair",
  description: "Politique de confidentialité et conformité RGPD.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[430px] min-h-screen pb-24 px-4">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Politique de confidentialité
        </h1>
        <p className="text-sm text-[#475569] mt-1">Dernière mise à jour : mai 2026</p>
      </header>

      <div className="text-[#1E293B] space-y-4">
        <section className="bg-[#E5F5E5] rounded-2xl p-4 border border-[#5B9279]/30">
          <h2 className="font-semibold text-lg">L&apos;essentiel</h2>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Aucun compte requis pour utiliser Clair.</li>
            <li>
              Tes analyses et ton historique restent dans le navigateur de ton appareil
              (localStorage).
            </li>
            <li>Aucune publicité, aucun cookie de tracking, aucun Google Analytics.</li>
            <li>Tu peux tout effacer à tout moment depuis les paramètres.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mt-4">Données collectées</h2>
          <p className="text-sm">Clair fonctionne sans inscription. Les textes que tu saisis sont :</p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>
              <strong>Envoyés au fournisseur d&apos;IA</strong> (Anthropic, OpenAI ou
              Moonshot selon la configuration) uniquement pour générer la réponse. Aucun
              log n&apos;est conservé chez nous.
            </li>
            <li>
              <strong>Stockés localement</strong> dans ton navigateur (localStorage) si
              tu choisis de sauvegarder l&apos;analyse dans ton historique. Tu peux
              supprimer ces données quand tu veux.
            </li>
          </ul>
          <p className="text-sm mt-2">
            Aucune donnée personnelle (nom, email, géolocalisation) n&apos;est collectée
            par Clair.
          </p>
          <p className="text-sm mt-2">
            Vos analyses sont anonymisées avant traitement IA. Les résultats
            peuvent être mis en cache pour améliorer la rapidité du service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mt-4">Tes droits (RGPD)</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>
              <strong>Droit d&apos;accès</strong> : tes données sont dans ton navigateur,
              tu y as accès via la page Historique.
            </li>
            <li>
              <strong>Droit à l&apos;effacement</strong> : bouton « Effacer mes données »
              dans les paramètres.
            </li>
            <li>
              <strong>Droit à la portabilité</strong> : tu peux exporter ton historique en
              JSON.
            </li>
            <li>
              <strong>Droit à la rectification</strong> : tu peux modifier ou supprimer
              chaque entrée d&apos;historique.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mt-4">Fournisseurs d&apos;IA utilisés</h2>
          <p className="text-sm">
            Les textes saisis sont envoyés en clair via HTTPS à l&apos;un des fournisseurs
            suivants :
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>
              <strong>Anthropic</strong> (Claude) — politique :{" "}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3563E9] underline"
              >
                anthropic.com/legal/privacy
              </a>
            </li>
            <li>
              <strong>OpenAI</strong> (GPT) — politique :{" "}
              <a
                href="https://openai.com/policies/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3563E9] underline"
              >
                openai.com/policies/privacy-policy
              </a>
            </li>
            <li>
              <strong>Moonshot</strong> (Kimi) — politique :{" "}
              <a
                href="https://platform.moonshot.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3563E9] underline"
              >
                platform.moonshot.ai
              </a>
            </li>
          </ul>
          <p className="text-sm mt-2 italic">
            Recommandation : ne pas inclure de noms, adresses ou informations
            identifiantes dans les textes analysés.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mt-4">
            Délégué à la protection des données
          </h2>
          <p className="text-sm">
            Contact DPO : contact@safescol.fr
            <br />
            Tu peux aussi déposer une plainte auprès de la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3563E9] underline"
            >
              cnil.fr
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
