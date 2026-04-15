import heroBg from '../assets/hero/hero-kik.webp'

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Imagen de fondo */}
      <img
        src={heroBg}
        alt="Club Kikines"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

    </section>
  )
}