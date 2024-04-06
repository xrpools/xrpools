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

const invoices = [
  {
    image: "INV001",
    poolName: "XRP reserve locked fund #3",
    asset: "XRP",
    description: "4,384,948",
    interestOffered: "4.2%",
    lengthOfDeposit: "5 years (fixed)",
  },
  {
    image: "INV002",
    poolName: "FirstRand South Africa bond 2025",
    asset: "USDT",
    description: "847,119",
    interestOffered: "7.3%",
    lengthOfDeposit: "1 year (fixed)",
  },
  {
    image: "INV002",
    poolName: "Bitcoin infrastructure mining Chile",
    asset: "WBTC",
    description: "150",
    interestOffered: "7.3%",
    lengthOfDeposit: "9 years (fixed)",
  },
  {
    image: "INV003",
    poolName: "iShares $ Treasury Bond 1-3yr UCITS ETF",
    asset: "USDC",
    description: "open end",
    interestOffered: "4.7%",
    lengthOfDeposit: "flexible",
  },
];

export const Pool = ({ _address }: { _address: string }) => {
  const [haveEnrolled, setHaveEnrolled] = useState(true);

  const payment = async () => {

    const rippleOffset = 946684800 //ripple initial epoch

    const release_date_unix = Math.floor( new Date("2024-12-31T00:00:00Z").getTime()/1000 );
    const release_date_ripple = release_date_unix - rippleOffset;
    console.log(release_date_ripple);
    
    await sdk.methods.signAndSubmitAndWait({
      TransactionType: "EscrowCreate",
      Account: _address,
      Destination: "rL3fuHGsJGwHx55uyociJ8fK5rRKAtyfSs",
      Amount: "10"+"000000",
      CancelAfter: release_date_ripple,
      Condition:
        "A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100",
    });
  };

  return (
    <div>
      <h2>Available Pools</h2>
      <div className="bg-gray-500 h-0.5"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Fund name</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>APY</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.image}>
              <TableCell className="font-medium">{invoice.poolName}</TableCell>
              <TableCell>{invoice.asset}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.interestOffered}</TableCell>
              <TableCell>{invoice.lengthOfDeposit}</TableCell>
              <TableCell className="text-right">
                {haveEnrolled ? (
                  <>
                    <Button onClick={() => payment()}>Deposit</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setHaveEnrolled(true)}>
                      Enrolled
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
