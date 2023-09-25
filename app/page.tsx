import Slider from "@components/homepage/Slider";

export default async function Home() {
  return (
    <main>
      <div>
        <Slider banersNumber={3} />
      </div>
      <button>Add to session storage</button>
    </main>
  );
}
