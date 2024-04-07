"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="mx-auto px-4 py-1 justify-between text-center">
        <Button>
          <Link href="/institutional" className="">
            Institutional access
          </Link>
        </Button>
      </div>
    </footer>
  );
};
