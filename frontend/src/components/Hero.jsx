import heroBg from '../assets/hero/hero-kik.webp'
import heroBgMobile from "../assets/hero/hero-kik-mobile.webp"

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Imagen desktop — se oculta en mobile */}
      <img
        src={heroBg}
        alt="Club Kikines"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
      />
      
      {/* Imagen mobile — se oculta en desktop */}
      <img
        src={heroBgMobile}
        alt="Club Kikines"
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-center"
      />

    </section>
  )
}