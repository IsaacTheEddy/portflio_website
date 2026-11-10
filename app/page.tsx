"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ShimmerButton from "@/components/ShimmerButton";
import DualCirclesBG from "@/components/DualCirclesBG";
import GrafanaDashboard from "@/components/GrafanaDashboard";

// Grid Background Component


// Main App Component
export default function GridBackgroundView() {
  return (
    <div className="relative w-full min-h-screen bg-background-neo overflow-x-hidden">
      <DualCirclesBG />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-8xl font-playfairDisplay">
            Isaac Edwards
          </h1>
          <p className="mt-4 text-lg text-slate-300 md:text-xl font-inter">
            Software Developer x Data Analyst
          </p>
          <div className="flex flex-row w-full justify-center mt-10 gap-20 items-center font ">
            <Link href={"./portfolio"}>
              <ShimmerButton>Portfolio</ShimmerButton>
            </Link>
            <Link href={"./blog"}>
              <ShimmerButton>Blog</ShimmerButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Modular Live Metrics Section - can be moved to any page with <GrafanaDashboard /> */}
      <div className="relative z-10 pb-20">
        <GrafanaDashboard />
      </div>
    </div>
  );
}
