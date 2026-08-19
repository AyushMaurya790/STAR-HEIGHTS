import logoAsset from "@/assets/logo.png";


export const SITE = {
  name: "Star Heights Constructions Co.",
  shortName: "Star Heights",
  established: 1991,
  tagline: "Building Tomorrow's Skyline",
  address: "D 500, West Vinod Nagar, I.P. Extension, Delhi – 110092",
  phones: ["+91 99108 07582", "+91 98100 52487"],
  email: "contact@starheights.co",
  region: "Delhi NCR · Noida · Greater Noida · Ghaziabad · Faridabad",
  logo: logoAsset,
};

export const NAV: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Why Us", to: "/why-us" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
