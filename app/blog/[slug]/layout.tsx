import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default async function Article({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <section className="h-auto min-h-screen mx-auto w-10/12 md:w-11/12 mt-20 flex flex-col gap-5 
    text-accent-neo font-inter prose prose-md lg:prose-xl lg:prose-">
      <div className="flex justify-between items-center" id="top">
        <Link href={"/blog"} className="flex gap-3">
          <ArrowLeftIcon className="back-arrow h-6 w-6 my-auto " />
          <p className="md:text-2xl">Back Home</p>
        </Link>
      </div>
      <div className="">{children}</div>
    </section>
     <div>
        <nav className="fixed  md:left-3/4 md:top-[90%] md:pt-5 top-[5%] w-fit p-2.5 rounded-2xl right-0 mr-auto text-center md:text-left md:w-fit md:rounded-full  md:-translate-x-1/2 md:p-4 opacity-80 bg-gray-800  shadow-2xl z-50 md:block">
          <div className="flex space-x-4 font-inter">
            <Link href={"#top"}  className="text-accent-neo hover:text-accent-hard-neo text-lg">
              Back to Top
            </Link>
          </div>
        </nav>
      </div>
      </>
  );
}
