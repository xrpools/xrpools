"use client";

import React, { useState } from "react";
import sdk from "@crossmarkio/sdk";
export const Header = () => {
  const [walletPayload, setWalletPayload] = useState(
    {} as { request: any; response: any; createdAt: any; resolvedAt: any }
  );

  const connectWallet = async () => {
    console.log("Connecting wallet");
    
    const { request, response, createdAt, resolvedAt } =
      await sdk.methods.signInAndWait();
    setWalletPayload({ request, response, createdAt, resolvedAt });
    console.log(walletPayload.response.data.address);
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="mx-auto px-4 py-2 flex justify-between items-center">
        <div className="logo">
          <img src="logo.png" alt="Logo" className="h-8 w-auto" />
        </div>

        <div className="login">
          <button
            onClick={() => connectWallet()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect
          </button>
        </div>
      </div>
    </header>
  );
};
