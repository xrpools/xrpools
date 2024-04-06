"use client";

import { BankDashboard } from "@/components/BankDashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";


export default function BankHome() {
  const [address,setAddress] = useState("");
  const [wss, setWss] = useState(null);
  return (
    <div className="flex flex-col h-screen">
      <Header setAddress={ setAddress } setWss={ setWss } />
      <div className="flex-1 flex items-center justify-center">
        <BankDashboard _address={ address } wss={ wss }/>
      </div>
      <Footer />
    </div>
  );
}
