import { createFileRoute } from "@tanstack/react-router";


import galleryHero from "@/assets/gallery/gallery-hero.png";
import gallery01 from "@/assets/gallery/gallery-01.jpg";
import gallery02 from "@/assets/gallery/gallery-02.jpg";
import gallery03 from "@/assets/gallery/gallery-03.jpg";
import gallery04 from "@/assets/gallery/gallery-04.jpg";
import gallery05 from "@/assets/gallery/gallery-05.jpg";
import gallery06 from "@/assets/gallery/gallery-06.jpg";
import gallery07 from "@/assets/gallery/gallery-07.jpg";
import gallery08 from "@/assets/gallery/gallery-08.jpg";
import gallery09 from "@/assets/gallery/gallery-09.jpg";
import gallery10 from "@/assets/gallery/gallery-10.jpg";
import gallery11 from "@/assets/gallery/gallery-11.jpg";
import gallery12 from "@/assets/gallery/gallery-12.jpg";
import gallery13 from "@/assets/gallery/gallery-13.jpg";
import gallery14 from "@/assets/gallery/gallery-14.jpg";
import gallery15 from "@/assets/gallery/gallery-15.jpg";
import gallery16 from "@/assets/gallery/gallery-16.jpg";
import gallery17 from "@/assets/gallery/gallery-17.jpg";
import gallery18 from "@/assets/gallery/gallery-18.jpg";
import gallery19 from "@/assets/gallery/gallery-19.jpg";
import gallery20 from "@/assets/gallery/gallery-20.jpg";
import gallery21 from "@/assets/gallery/gallery-21.jpg";
import gallery22 from "@/assets/gallery/gallery-22.jpg";
import gallery23 from "@/assets/gallery/gallery-23.jpg";
import gallery24 from "@/assets/gallery/gallery-24.jpg";
import gallery25 from "@/assets/gallery/gallery-25.jpg";
import gallery26 from "@/assets/gallery/gallery-26.jpg";
import gallery27 from "@/assets/gallery/gallery-27.jpg";

const GALLERY_IMAGES = [
  gallery01,
  gallery02,
  gallery03,
  gallery04,
  gallery05,
  gallery06,
  gallery07,
  gallery08,
  gallery09,
  gallery10,
  gallery11,
  gallery12,
  gallery13,
  gallery14,
  gallery15,
  gallery16,
  gallery17,
  gallery18,
  gallery19,
  gallery20,
  gallery21,
  gallery22,
  gallery23,
  gallery24,
  gallery25,
  gallery26,
  gallery27,
];

const galleryRows = [
  GALLERY_IMAGES.slice(0, 2),
  GALLERY_IMAGES.slice(2, 5),

  GALLERY_IMAGES.slice(5, 7),
  GALLERY_IMAGES.slice(7, 10),

  GALLERY_IMAGES.slice(10, 12),
  GALLERY_IMAGES.slice(12, 15),

  GALLERY_IMAGES.slice(15, 17),
  GALLERY_IMAGES.slice(17, 20),

  GALLERY_IMAGES.slice(20, 22),
  GALLERY_IMAGES.slice(22, 25),

  GALLERY_IMAGES.slice(25, 27),
];

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <Header />

      <main className="bg-charcoal-deep pt-24">

        <section className="relative h-[90vh] overflow-hidden">

          <img
            src={galleryHero}
            alt="Gallery Hero"
            className="absolute inset-0 h-full w-full object-cover"
          />

      </section>

        <section className="bg-charcoal-deep pt-28 pb-20">

  <div className="mx-auto max-w-7xl px-5 lg:px-10">

    {galleryRows.map((row, rowIndex) => (
  <div
    key={rowIndex}
    className={`grid ${
      row.length === 2 ? "grid-cols-2" : "grid-cols-3"
    } gap-5 mb-5`}
  >
    {row.map((img, index) => (
      <div
        key={index}
        className={`group overflow-hidden rounded-[22px] border border-gold/20 hover:border-gold transition-all duration-500 hover:shadow-[0_0_25px_8px_rgba(212,175,55,0.22)] ${
          row.length === 2
  ? "aspect-[5/4]"
  : "aspect-[3/4]"
        }`}
      >
        <img
          src={img}
          alt={`Gallery ${rowIndex + 1}-${index + 1}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    ))}
  </div>
))}

  </div>

</section>

      </main>

      <Footer />

    </>
  );
}