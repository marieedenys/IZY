import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-[80vh] min-h-[520px] items-center justify-center overflow-hidden bg-ink">
      <Image
        src="/images/hero-chef.jpg"
        alt=""
        fill
        priority
        className="object-cover grayscale"
      />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute translate-x-2 translate-y-2 select-none font-serif text-[20vw] leading-none font-normal tracking-tight text-cream/[0.18] italic sm:translate-x-4 sm:translate-y-4 sm:text-[12rem]"
        >
          izy
        </span>
        <h1 className="relative font-serif text-[20vw] leading-none font-black tracking-tight text-bordeaux sm:text-[12rem]">
          IZY
        </h1>
      </div>
    </section>
  );
}
