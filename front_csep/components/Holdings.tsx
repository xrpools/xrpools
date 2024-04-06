import React from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { PoolModel } from "./models/pool";

export const Deposits = ({ _holdingPools }: { _holdingPools: PoolModel[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fund name</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>APY</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Tx</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {_holdingPools.map((pool) => 
          <TableRow key={pool.poolAddress}>
            <TableCell className="font-medium">
              {pool.poolName}
            </TableCell>
            <TableCell>{pool.asset}</TableCell>
            <TableCell>{pool.amount}</TableCell>
            <TableCell>{pool.interestOffered}</TableCell>
            <TableCell>{pool.lengthOfDeposit}</TableCell>
            <TableCell>
              <a href={`https://testnet.xrpl.org/transactions/${pool.tx}`} target="_blank">
                {pool.tx?pool.tx.slice(0, 3)+"..."+pool.tx.slice(pool.tx.length-3):""}
              </a>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
