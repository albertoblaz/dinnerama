export default function EmptySlate() {
  return (
    <figure className="flex flex-col items-center justify-center">
      <img 
        src="/empty-slate.jpg" 
        alt="Illustration of a cake portion used as blank slate"
        className="scale-75"
      />
      <figcaption className="mt-2 text-2xl font-semibold">Tell us your ingredients at home. You'll get recipes to cook with them!</figcaption>
    </figure>
  );
}