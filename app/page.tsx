import ShortenerForm from "./components/shortener-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl">Short your link</h2>
      <ShortenerForm />
    </div>
  )
}
