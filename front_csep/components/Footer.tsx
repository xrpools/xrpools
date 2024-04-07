"use client";

import React, { useState } from "react";
import sdk from "@crossmarkio/sdk";
import Link from "next/link";

export const Footer = () => {
  const [walletPayload, setWalletPayload] = useState(
    {} as { request: any; response: any; createdAt: any; resolvedAt: any }
  );

  return (
    <footer className="top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="mx-auto px-4 py-2 justify-between text-center">
        <Link href="/bank" className="text-black-600 visited:text-black">Institutional access</Link> - <Link href="#" className="text-black-600 visited:text-black">Create pool</Link>
      </div>
    </footer>
  );
};
