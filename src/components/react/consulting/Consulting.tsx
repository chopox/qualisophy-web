import { Button } from "@/components/react/shared/Button";

interface Intro {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface SectionOne {
  title: string;
  description: string;
  imageUrl: string;
}

interface SectionTwo {
  features: string[];
  title: string;
  description: string;
}

interface ConsultingProps {
  intro: Intro;
  sectionOne: SectionOne;
  sectionTwo: SectionTwo;
}

export const Consulting = ({
  intro,
  sectionOne,
  sectionTwo,
}: ConsultingProps) => {
  return (
    <div className="bg-white min-h-screen">
      {/* === Intro === */}
      <section className="text-center py-20 px-6 ">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            {intro.title}
          </h1>
          <p className="text-slate-600 text-lg mb-8">{intro.description}</p>
          <Button
            size="lg"
            onClick={() => (window.location.href = intro.buttonLink)}
          >
            {intro.buttonText}
          </Button>
        </div>
      </section>

      {/* === Section 2: Left Text + Right Image === */}
      <section className="flex flex-col md:flex-row items-center gap-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            {sectionOne.title}
          </h2>
          <p className="text-slate-600 text-base">{sectionOne.description}</p>
        </div>
        <div className="md:w-1/2">
          <img
            src={sectionOne.imageUrl}
            alt={sectionOne.title}
            className="rounded-xl shadow-md object-cover w-full h-[300px]"
          />
        </div>
      </section>

      {/* === Section 3: Left Icons + Right Text === */}
      <section className="flex flex-col md:flex-row items-center gap-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="md:w-1/2 grid grid-cols-1 gap-4">
          {sectionTwo.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-teal-600 text-xl">✔️</span>
              <p className="text-slate-700">{feature}</p>
            </div>
          ))}
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            {sectionTwo.title}
          </h2>
          <p className="text-slate-600 text-base">{sectionTwo.description}</p>
        </div>
      </section>
    </div>
  );
};
