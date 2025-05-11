import { Helmet } from 'react-helmet-async'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Communities | Inicio</title>
        <meta name="description" content="Explora negocios, eventos y servicios útiles para comunidades migrantes en tu ciudad." />
      </Helmet>

      <div className="p-4">
        <h2 className="text-2xl font-bold">Inicio</h2>
        <p>Bienvenido a Communities</p>
      </div>
    </>
  )
}
