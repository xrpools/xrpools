"use client";

import React, { useState } from "react";
import sdk from "@crossmarkio/sdk";
import Link from "next/link";
export const Header = ({
  setAddress,
  setrpcUrl,
}: {
  setAddress: (_address: string) => void;
  setrpcUrl?: (rpcUrl: string) => void;
}) => {
  const [user, setUser] = useState({ address: "" } as {
    address: string;
  });

  const connectWallet = async () => {
    const { response } = await sdk.methods.signInAndWait();
    setUser({ address: response.data.address });
    setAddress(response.data.address);
    console.log(setrpcUrl);
    if (setrpcUrl!==undefined) setrpcUrl(response.data.network.wss);
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="mx-auto px-20 py-2 flex justify-between items-center">
        <div className="logo ml-4">
          <Link href="/" className="text-black-600 visited:text-black">
            <b>{`{XRPools}`}</b>
          </Link>
        </div>

        <div className="login px-20">
          {user.address ? (
            <div>
              <p className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded">
                {user.address.slice(0, 3) +
                  "..." +
                  user.address.slice(user.address.length - 3)}
              </p>
            </div>
          ) : (
            <>
              <button
                onClick={() => connectWallet()}
                className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded"
              >
                Connect
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
