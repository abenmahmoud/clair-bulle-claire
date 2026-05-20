export const metadata = {
  title: "Éthique — Clair",
  description: "Charte éthique du projet Clair.",
};

const ETHICAL_RULES = [
  "Ne jamais affirmer ce qu'une autre personne pense, ressent ou veut vraiment. Utiliser systématiquement des formules prudentes (« une possibilité est que… », « cela peut signifier que… »).",
  "Toujours séparer explicitement ce qui est observable et sûr, ce qui reste incertain, et les hypothèses.",
  "Ne jamais utiliser de vocabulaire qui aggrave la souffrance (« il te rejette », « elle ne t'aime pas », « il veut te manipuler »).",
  "Rappeler régulièrement que Clair ne se substitue pas à un suivi professionnel (psychologue, psychiatre, orthophoniste, éducateur spécialisé).",
  "Ne jamais poser de diagnostic médical ou psychologique.",
  "Orienter vers les numéros d'urgence si la situation décrite l'exige (suicide, maltraitance, violences).",
  "Préserver la confidentialité des utilisateurs : pas de tracking, pas de revente, pas de partage des données.",
];

export default function EthicsPage() {
  return (
    <main className="mx-auto max-w-[430px] min-h-screen pb-24 px-4">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#1E293B]">Notre éthique</h1>
        <p className="text-sm text-[#475569] mt-1">
          Les engagements qui guident chaque réponse de Clair.
        </p>
      </header>

      <section className="space-y-3 mt-4">
        {ETHICAL_RULES.map((rule, i) => (
          <div key={rule} className="bg-white rounded-2xl p-4 border border-[#E2E0D9]">
            <div className="flex items-start gap-3">
              <span className="bg-[#3563E9] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-[#1E293B] text-sm leading-relaxed">{rule}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 bg-[#EDF4FF] rounded-2xl p-4 border border-[#3563E9]/20">
        <h2 className="font-semibold text-[#1E293B] mb-2">
          Comité éthique consultatif
        </h2>
        <p className="text-sm text-[#475569]">
          Notre comité éthique est en cours de constitution. Il réunira un psychologue
          spécialisé TSA, un orthophoniste pratiquant la CAA, et un professionnel de
          l&apos;Éducation nationale (CPE ou AESH-référent).
        </p>
        <p className="text-sm text-[#475569] mt-2">
          Leur mission : relire les prompts utilisés par l&apos;IA au moins une fois par
          an, et garantir que les règles éthiques ci-dessus sont respectées en pratique.
        </p>
        <p className="text-sm text-[#475569] mt-2 italic">
          Tu es un professionnel intéressé pour rejoindre ce comité ? Contacte-nous :
          contact@safescol.fr
        </p>
      </section>

      <p className="text-xs text-[#64748B] mt-6 text-center">
        Charte vivante, mise à jour au fur et à mesure du retour des utilisateurs et du
        comité.
      </p>
    </main>
  );
}
