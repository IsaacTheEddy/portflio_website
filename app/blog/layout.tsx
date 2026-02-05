import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <header className="flex w-full h-full items-center justify-center">
        <Link href={"/"} className="text-black  ">
          Home
        </Link>
      </header>
      {children}
      <div></div>
    </section>
  );
}
