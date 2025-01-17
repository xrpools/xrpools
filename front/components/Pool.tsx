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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { rippleOffset } from "@/lib/utils";

const invoices = [
  {
    poolAddress: "rHCde2G2447A9cTvNLLXtTxdG9GQ3qZAy1",
    poolName: "XRP reserve fund #3",
    asset: "XRP",
    description: "4,384,948",
    interestOffered: "4.2%",
    lengthOfDeposit: "5 years (fixed)",
  },
  {
    poolAddress: "rDNCYaJJKS7Nbtr1A9ReERL53NXrjsnaSY",
    poolName: "FirstRand South Africa bond 2025",
    asset: "USDT",
    description: "847,119",
    interestOffered: "7.3%",
    lengthOfDeposit: "1 year (fixed)",
  },
  {
    poolAddress: "rL3fuHGsJGwHx55uyociJ8fK5rRKAtyfSs",
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
  addHoldingPool,
}: {
  _address: string;
  addHoldingPool: (_holdingPool: PoolModel) => void;
}) => {
  const [haveEnrolled, setHaveEnrolled] = useState(false);
  const [amount, setAmount] = useState(
    {} as { poolAddress: string; amount: number }
  );

  const payment = async () => {

    const release_date_unix = Math.floor(
      new Date("2029-04-07T00:00:00Z").getTime() / 1000
    );
    const release_date_ripple = release_date_unix - rippleOffset;
    if (amount.amount < 10) return;
    const tx = await sdk.methods.signAndSubmitAndWait({
      TransactionType: "EscrowCreate",
      Account: _address,
      Destination: "rHCde2G2447A9cTvNLLXtTxdG9GQ3qZAy1",
      Amount: `${amount.amount * 10 ** 6}`,
      CancelAfter: release_date_ripple,
      Condition:
        "A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100",
    });
    const depositedPool = invoices.find(
      ({ poolAddress }) =>
        poolAddress === tx.response.data.resp.result.Destination
    );

    if (depositedPool) {
      const mappedPool = {
        ...depositedPool,
        amount: +tx.response.data.resp.result.Amount / 10 ** 6,
        tx: tx.response.data.resp.result.hash,
      };
      console.log(mappedPool)
      addHoldingPool(mappedPool);
    }
  };

  return (
    <div>
      <h2>Available Pools</h2>
      <div className="bg-gray-500 h-0.5"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>APY</TableHead>
            <TableHead>Duration</TableHead>
            { sdk.sync.isConnected() ? (<TableHead className="text-left">Amount</TableHead>) :null }

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
                {haveEnrolled ? (
                  <>
                    <Input
                      disabled={!sdk.sync.isConnected()}
                      className="max-w-32"
                      max={invoice.description}
                      onChange={(e) => {
                        setAmount({
                          amount: +e.target.value,
                          poolAddress: invoice.poolAddress,
                        });
                      }}
                    />

                    <Button className="mx-auto"
                      disabled={
                        !sdk.sync.isConnected() ||
                        amount.amount < 10 ||
                        amount.poolAddress !== invoice.poolAddress
                      }
                      onClick={() => payment()}
                    >
                      Deposit
                    </Button>
                  </>
                ) : (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button disabled={
                          !sdk.sync.isConnected()
                        } >
                          Invest
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>KYC verification</DialogTitle>
                          <DialogDescription>
                            The issuer requires KYC verification for compliance. Please provide information below for verification.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Firstname
                            </Label>
                            <Input
                              id="firstname"
                              value="Satoshi"
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Lastname
                            </Label>
                            <Input
                              id="lastname"
                              value="Nakamoto"
                              className="col-span-3"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Country  of residency
                            </Label>
                            <Input
                              id="residency"
                              value="France"
                              className="col-span-3"
                            />
                          </div>

                        </div>
                        <DialogFooter>
                          <DialogFooter>
                            <Button type="submit" onClick={() => setHaveEnrolled(true)}>Save</Button>
                          </DialogFooter>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
