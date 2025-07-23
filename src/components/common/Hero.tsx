interface HeroProps {
  imageUrl?: string,
  title?: string,
  subtitle?: string
}
export default function Hero({ imageUrl = './default-hero.jpg', title = '', subtitle = ''}: HeroProps) {
  return (
    <section
      aria-label="Event hero image"
      className={`relative w-full h-1/2 md:h-96 lg:h-[50vh] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden`}
      style={{ backgroundImage: `url(${imageUrl})`}}
    >
      <div className="bg-black opacity-50 absolute inset-0" aria-hidden="true">
        <div className="text-white absolute left-5 bottom-20 justify-left p-5">
          <p className="text-lg md:text-xl font-semibold mb-2">{subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        </div>
      </div>
    </section>
  )
}