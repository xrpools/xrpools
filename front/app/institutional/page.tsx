"use client";

import { BankDashboard } from "@/components/BankDashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function BankHome() {
  const [address, setAddress] = useState("");
  const [rpcUrl, setrpcUrl] = useState("");
  console.log(rpcUrl);

  return (
    <div className="flex flex-col h-screen">
      <Header setAddress={setAddress} setrpcUrl={setrpcUrl} />
      <div className="flex-1 flex items-center justify-center">
        <BankDashboard _address={address} rpcUrl={rpcUrl} />
      </div>
    </div>
  );
}
