"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

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
    asset: "WBTC",
    description: "150",
    interestOffered: "7.3%",
    lengthOfDeposit: "1 year (fixed)",
  },
  {
    image: "INV003",
    poolName: "iShares $ Treasury Bond 1-3yr UCITS ETF",
    asset: "USDC",
    description: "open end",
    interestOffered: "4.7%",
    lengthOfDeposit: "flexible",
  }
];

export const Pool = () => {
  const [haveEnrolled, setHaveEnrolled] = useState(false);
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
            <TableHead  className="text-center"></TableHead>
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
              <TableCell  className="text-right">
                {haveEnrolled ? (
                  <>
                    <Button>Deposit</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={()=>setHaveEnrolled(true)}>Deposit</Button>
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
