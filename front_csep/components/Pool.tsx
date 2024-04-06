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
    poolName: "Paid",
    description: "$250.00",
    interestOffered: "Credit Card",
    lengthOfDeposit: [15,45,90],
  },
  {
    image: "INV002",
    poolName: "Pending",
    description: "$150.00",
    interestOffered: "PayPal",
    lengthOfDeposit: [15,45,90],
  },
  {
    image: "INV003",
    poolName: "Unpaid",
    description: "$350.00",
    interestOffered: "Bank Transfer",
    lengthOfDeposit: [15,45,90],
  },
  {
    image: "INV004",
    poolName: "Paid",
    description: "$450.00",
    interestOffered: "Credit Card",
    lengthOfDeposit: [15,45,90],
  },
  {
    image: "INV005",
    poolName: "Paid",
    description: "$550.00",
    interestOffered: "PayPal",
    lengthOfDeposit: [15,45,90],
  },
  {
    image: "INV006",
    poolName: "Pending",
    description: "$200.00",
    interestOffered: "Bank Transfer",
    lengthOfDeposit: [15,45,90],
  },
  {
    image: "INV007",
    poolName: "Unpaid",
    description: "$300.00",
    interestOffered: "Credit Card",
    lengthOfDeposit: [15,45,90],
  },
];

export const Pool = () => {
  const [haveEnrolled, setHaveEnrolled] = useState(false);
  return (
    <div>
      <h2>Pools</h2>
      <div className="bg-gray-500 h-0.5"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Pool name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">length</TableHead>
            <TableHead  className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.image}>
              <TableCell className="font-medium">{invoice.poolName}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.interestOffered}</TableCell>
              <TableCell className=" flex">
                {invoice.lengthOfDeposit.length && haveEnrolled
                  ? invoice.lengthOfDeposit.map((length) => (
                      <button key={length} className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-1">
                        {length}
                      </button>
                    ))
                  : null}
              </TableCell>
              <TableCell  className="text-right">
                {haveEnrolled ? (
                  <>
                    <Button>Deposit</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={()=>setHaveEnrolled(true)}>Enroll</Button>
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
