const STEPS = [
  {
    week: "Semaine 1",
    title: "My Reviews",
    description: "Mise en place du système d'avis : noter, commenter et retrouver ses expériences passées.",
  },
  {
    week: "Semaine 2",
    title: "My Taste Profile",
    description: "Construction du profil gustatif qui apprend de chaque avis pour affiner les recommandations.",
  },
  {
    week: "Semaine 3",
    title: "Ask Izy",
    description: "Développement de l'assistant IA capable de répondre aux questions et de guider les choix.",
  },
  {
    week: "Semaine 4",
    title: "Community",
    description: "Ouverture de l'espace communautaire pour échanger et suivre les recommandations des autres membres.",
  },
  {
    week: "Semaine 5",
    title: "Premium Access",
    description: "Intégration des fonctionnalités et avantages réservés aux membres premium.",
  },
  {
    week: "Semaine 6",
    title: "Final Testing & Launch",
    description: "Tests finaux, corrections et mise en ligne officielle de la plateforme IZY.",
  },
];

export default function Roadmap() {
  return (
    <section className="bg-ink px-6 py-20 text-cream">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-3xl font-bold sm:text-4xl">
          Ce qui arrive bientôt
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-cream/70 sm:text-base">
          Six semaines de construction, une étape par semaine, pour donner vie à IZY.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title} className="border-t border-bordeaux pt-5">
              <span className="font-serif text-sm text-bordeaux">
                {step.week}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
