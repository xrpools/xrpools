"use client";
import xrpl from "xrpl";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import sdk from "@crossmarkio/sdk";
import { PoolModel } from "./models/pool";
import { Input } from "./ui/input";

const invoices = [
  {
    poolAddress: "rL3fuHGsJGwHx55uyociJ8fK5rRKAtyfSs",
    poolName: "XRP reserve locked fund #3",
    asset: "XRP",
    description: "4,384,948",
    interestOffered: "4.2%",
    lengthOfDeposit: "5 years (fixed)",
  },
  {
    poolAddress: "rHCde2G2447A9cTvNLLXtTxdG9GQ3qZAy1",
    poolName: "FirstRand South Africa bond 2025",
    asset: "USDT",
    description: "847,119",
    interestOffered: "7.3%",
    lengthOfDeposit: "1 year (fixed)",
  },
  {
    poolAddress: "rDmUtoNpmQmkpM6nqsDNoeAhwMR4U2jwMN",
    poolName: "Bitcoin infrastructure mining Chile",
    asset: "WBTC",
    description: "150",
    interestOffered: "7.3%",
    lengthOfDeposit: "9 years (fixed)",
  },
  {
    poolAddress:
      "rxRpSNb1VktvzBz8JF2oJC6qaww6RZ7LwrL3fuHGsJGwHx55uyociJ8fK5rRKAtyfSs",
    poolName: "iShares $ Treasury Bond 1-3yr UCITS ETF",
    asset: "USDC",
    description: "open end",
    interestOffered: "4.7%",
    lengthOfDeposit: "flexible",
  },
];

export const Pool = ({
  _address,
  setHoldingPool,
}: {
  _address: string;
  setHoldingPool: (_holdingPool: PoolModel) => void;
}) => {
  const [haveEnrolled, setHaveEnrolled] = useState(true);
  const [amount, setAmount] = useState(0);

  const payment = async () => {
    const rippleOffset = 946684800; //ripple initial epoch

    const release_date_unix = Math.floor(
      new Date("2024-12-31T00:00:00Z").getTime() / 1000
    );
    const release_date_ripple = release_date_unix - rippleOffset;
    if (amount < 10) return;
    const tx = await sdk.methods.signAndSubmitAndWait({
      TransactionType: "EscrowCreate",
      Account: _address,
      Destination: "rL3fuHGsJGwHx55uyociJ8fK5rRKAtyfSs",
      Amount: `${amount*10**6}`,
      CancelAfter: release_date_ripple,
      Condition:
        "A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100",
    });
    const depositedPool = invoices.find(
      ({ poolAddress }) =>
        poolAddress === tx.response.data.resp.result.Destination
    );
    console.log(+tx.response.data.resp.result.Amount / 10 ** 6);

    if (depositedPool) {
      const mappedPool = {
        ...depositedPool,
        amount: +tx.response.data.resp.result.Amount / 10 ** 6,
        tx: tx.response.data.resp.result.hash,
      };
      setHoldingPool(mappedPool);
    }
  };

  return (
    <div>
      <h2>Available Pools</h2>
      <div className="bg-gray-500 h-0.5"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fund name</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>APY</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.poolAddress}>
              <TableCell className="font-medium">{invoice.poolName}</TableCell>
              <TableCell>{invoice.asset}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.interestOffered}</TableCell>
              <TableCell>{invoice.lengthOfDeposit}</TableCell>
              <TableCell className="flex">
                <Input
                disabled={!sdk.sync.isConnected()}
                  className="max-w-32 mx-auto"
                  max={invoice.description}
                  onChange={(e) => {setAmount(+e.target.value)}}
                />
                {haveEnrolled ? (
                  <>
                    <Button
                      disabled={!sdk.sync.isConnected() || amount < 10}
                      onClick={() => payment()}
                    >
                      Deposit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setHaveEnrolled(true)}>
                      Enroll
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
