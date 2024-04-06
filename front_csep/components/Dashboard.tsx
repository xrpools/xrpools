import React from "react";
import { Pool } from "./Pool";
import { Deposits } from "./Holdings";
import { PoolModel } from "./models/pool";

export const Dashboard = ({_address}:{_address:string}) => {
  const [holdingPool, setHoldingPool] = React.useState(
    {} as PoolModel);
  return (
    <div className="w-4/5 h-4/5 mx-auto mt-16 flex flex-col">
      <div className="flex flex-1">
        <div className="flex-1 p-6 m-1 rounded shadow">
          <Pool _address={_address} setHoldingPool={(_holdingPool:PoolModel)=>setHoldingPool(_holdingPool)}/>
        </div>
      </div>
      <div className="flex-2 p-4 pb-32 m-1 rounded shadow">
        <Deposits _holdingPool={holdingPool} />
      </div>
    </div>
  );
};
