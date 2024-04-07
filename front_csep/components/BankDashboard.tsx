"use client";

import sdk from "@crossmarkio/sdk";
import { useEffect, useState } from "react";
import fetchEscrows from "../lib/fetchEscrows"
import type { PoolModel } from "./models/pool";

import { Deposits } from "./Holdings";

export const BankDashboard = ({_address, wss}:{_address:string, wss: string|null}) => {
  
  //const publishPool = async (formData) => {
  //  console.log(formData);
  //    
  //  const duration = formData.duration * formData.duration_unit
  //  
  //  const tx = await sdk.methods.signAndSubmitAndWait({
  //    TransactionType: 'DIDSet',
  //    Account: _address,
  //    DIDDocument: { type: "Reserve Pool offer", name: formData.name, asset: formData.asset, apy: formData.apy, duration }
  //  });
  //  console.log(tx.response);
  //};
  
  const [pools, setPools] = useState([] as PoolModel[]); 
  
  const fetchAndSet = (data) => {
    if (wss == null) {
      return;
    }
    
    fetchEscrows(wss, _address, false)
      .then((poolsData) => {
        setPools(poolsData.map((data) => ({
          poolAddress: data.Destination,
          poolName: 'unknow',
          asset: 'XRP',
          description: 'unknown',
          interestOffered: 'unknown',
          lengthOfDeposit: 'until ' + new Date(data.CancelAfter * 1000),
          amount: data.Amount / 10 ** 6,
          tx : data.PreviousTxnID,
        })))
      });
  }
  
  useEffect(() => {
      fetchAndSet();
  }, [wss])
  
  return (
    <div className="w-4/5 h-4/5 mx-auto mt-16 flex flex-col">
      <b>Institutional</b>
      <div className="flex-2 p-4 pb-32 m-1 rounded shadow">
        <div>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow float-right"
            onClick={ fetchAndSet }
          >
            Refresh
          </button>
          <h2>Deposits</h2>
          <div className="bg-gray-500 h-0.5"></div>
          <Deposits _holdingPools={ pools } />
        </div>
      </div>
    </div>
  );
  
};
