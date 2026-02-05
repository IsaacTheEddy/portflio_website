import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";

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
    </section>
  );
}
