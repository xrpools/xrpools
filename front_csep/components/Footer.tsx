"use client";

import React, { useState } from "react";
import sdk from "@crossmarkio/sdk";
export const Footer = () => {
  const [walletPayload, setWalletPayload] = useState(
    {} as { request: any; response: any; createdAt: any; resolvedAt: any }
  );

  return (
    <footer className="top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="mx-auto px-4 py-2 flex justify-between items-center">
        Create pool
      </div>
    </footer>
  );
};
