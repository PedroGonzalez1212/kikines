import foto from '../assets/fotos/kik-ascenso-a.webp'

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Texto */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Etiqueta superior */}
          <span className="text-violet-500 text-sm font-semibold tracking-widest uppercase">
            Quiénes somos?
          </span>

          {/* Título */}
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Más que un equipo.<br />
          </h2>

          {/* Párrafos */}
          <div className="flex flex-col gap-4 text-gray-400 text-base leading-relaxed">
            <p>
              Kikines es un equipo formado por un grupo de amigos que se conoce desde los 6 años.
              Empezamos a jugar juntos en el Club Social y Deportivo Lasallano, y desde 2015
              compartimos torneos amateurs como una misma banda: adentro y afuera de la cancha.
            </p>
            <p>
              Hace 3 años nos sumamos a Campa y el camino fue creciendo torneo a torneo: salimos
              campeones de la Serie E y logramos 4 ascensos en 5 torneos. Hoy nuestro próximo
              objetivo está claro: ser campeones de la Serie A.
            </p>
            <p>
              Pero si hay algo que define a Kikines no son solo los resultados: es el grupo, la
              unión, y las familias que nos acompañan, bancan y hacen que cada partido se sienta
              como una fiesta.
            </p>
          </div>

        </div>

        {/* Foto */}
        <div className="flex-1 w-full">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Borde violeta decorativo */}
            <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 to-violet-900 rounded-2xl -z-10" />
            <img
              src={foto}
              alt="Kikines - ascenso"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  )
}