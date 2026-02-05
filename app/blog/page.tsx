import { getCatagorizedArticles } from "@/lib/articles";

export default function Page() {
  const articles = getCatagorizedArticles();
  console.log(articles);

  return (
    <section className=" font-cormorantGarmond mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20 ">
      <div></div>
      <header className="">
        <h1 className="font-light text-6xl text-neutral-900 text center">
          {" "}
          minimal blog
        </h1>
        <section className="md:grid md:grid-cols-2 flex flex-col gap-10"></section>
      </header>
    </section>
  );
}
