"use client";

import { Client } from "xrpl";

export default async function useFetchEscrow(wss: string|null, address: sring, as_sender: bool) {
  const client = new Client(wss);
  await client.connect();
  const response = await client.request({
    command: "account_objects",
    type: "escrow",
    account: address,
    ledger_index: "validated",
  });
  
  return response.result.account_objects.filter((escrow) => {
    return as_sender 
      ? escrow.Account == address
      : escrow.Destination == address
  });
};