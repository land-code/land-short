import ShortLinks from "./components/short-links";
import ShortenerForm from "./components/shortener-form";


export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <section className="flex flex-col items-center max-w-full">
        <h2 className="text-3xl">Save your link</h2>
        <ShortenerForm />
      </section>
      <section className="flex flex-col items-center max-w-full">
        <h2 className="text-3xl">Saved links</h2>
        <ShortLinks />
      </section>
    </div>
  )
}
