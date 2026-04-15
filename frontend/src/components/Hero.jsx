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

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenido centrado */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-6 pb-26">


        {/* Nombre del club */}
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-lg">
          KIKINES
        </h1>

        {/* Subtítulo */}
        <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-widest uppercase">
          Club de Amigos
        </p>

        {/* Línea decorativa violeta */}
        <div className="mt-6 h-1 w-24 bg-violet-500 rounded-full" />

      </div>

    </section>
  )
}