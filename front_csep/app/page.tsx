"use client";

import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";


export default function ProviderHome() {
  const [address,setAddress]=useState("");
  const updateAddress = (_address:string)=>setAddress(_address)
  return (
    <div className="flex flex-col h-screen">
      <Header setAddress={updateAddress} />
      <div className="flex-1 flex items-center justify-center">
        <Dashboard _address={address}/>
      </div>
      <Footer />

    </div>
  );
}
