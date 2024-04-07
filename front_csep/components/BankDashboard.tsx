"use client";

import { useEffect, useState } from "react";
import fetchEscrows from "../lib/fetchEscrows";
import type { PoolModel } from "./models/pool";

import { Deposits } from "./Holdings";
import { rippleOffset } from "@/lib/utils";

export const BankDashboard = ({
  _address,
  rpcUrl: rpcUrl,
}: {
  _address: string;
  rpcUrl: string;
}) => {
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

  const fetchAndSet = () => {
    console.log(rpcUrl);

    if (!rpcUrl) {
      return;
    }

    fetchEscrows(rpcUrl, _address, false).then((poolsData) => {
      console.log(poolsData);
      setPools(
        poolsData.map((data: any) => {
          const apy = 4 + Math.floor(Math.random() * 200) / 100;

          return {
            poolAddress: data.Destination,
            poolName:
              data.Account.slice(0, 3) +
              "..." +
              data.Account.slice(data.Account.length - 3),
            asset: "XRP",
            description: `description`,
            interestOffered: `${`${apy}`.slice(0,4)}%`,
            lengthOfDeposit:
              "until " +
              new Date((data.CancelAfter + rippleOffset) * 1000).getDate() +
              "/" +
              (new Date((data.CancelAfter + rippleOffset) * 1000).getMonth() +
                1) +
              "/" +
              new Date((data.CancelAfter + rippleOffset) * 1000).getFullYear(),
            amount: data.Amount / 10 ** 6,
            tx: data.PreviousTxnID,
          };
        }).slice(0,6)
      );
    });
  };

  useEffect(() => {
    fetchAndSet();
  }, [rpcUrl]);

  return (
    <div className="w-4/5 h-4/5 mx-auto mt-16 flex flex-col">
      <b>Institutional</b>
      <div className="flex-2 p-4 pb-32 m-1 rounded shadow">
        <div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow float-right"
            onClick={fetchAndSet}
          >
            Refresh
          </button>
          <h2>Deposits</h2>
          <div className="bg-gray-500 h-0.5"></div>
          <Deposits _holdingPools={pools} />
        </div>
      </div>
    </div>
  );
};
