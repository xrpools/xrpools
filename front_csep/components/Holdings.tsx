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

export const Deposits = ({ _holdingPool }: { _holdingPool: PoolModel }) => {
  return (
    <div>
      <h2>My deposits</h2>
      <div className="bg-gray-500 h-0.5"></div>
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
          <TableRow key={_holdingPool.poolAddress}>
            <TableCell className="font-medium">
              {_holdingPool.poolName}
            </TableCell>
            <TableCell>{_holdingPool.asset}</TableCell>
            <TableCell>{_holdingPool.amount}</TableCell>
            <TableCell>{_holdingPool.interestOffered}</TableCell>
            <TableCell>{_holdingPool.lengthOfDeposit}</TableCell>
            <TableCell>
              <a href={`https://testnet.xrpl.org/transactions/${_holdingPool.tx}`} target="_blank">
                {_holdingPool.tx?_holdingPool.tx.slice(0, 3)+"..."+_holdingPool.tx.slice(_holdingPool.tx.length-3):""}
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
