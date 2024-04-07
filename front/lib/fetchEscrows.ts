"use client";

import { Client } from "xrpl";

export default async function useFetchEscrow(
  rpcUrl: string,
  address: string,
  as_sender: boolean
) {
  const client = new Client(rpcUrl);
  await client.connect();
  const response = await client.request({
    command: "account_objects",
    type: "escrow",
    account: address,
    ledger_index: "validated",
  });

  return response.result.account_objects.filter((escrow: any) =>
    as_sender ? escrow.Account == address : escrow.Destination == address
  );
}
