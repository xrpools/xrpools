import React from "react";
import { Pool } from "./Pool";
import { Deposits } from "./Holdings";
import { PoolModel } from "./models/pool";

export const Dashboard = ({_address}:{_address:string}) => {
  const [holdingPools, setHoldingPools] = React.useState(
    [] as PoolModel[]
  );
  return (
    <div className="w-4/5 h-4/5 mx-auto mt-16 flex flex-col">
      <div className="flex flex-1">
        <div className="flex-1 p-6 m-1 rounded shadow">
          <Pool _address={_address} addHoldingPool={ (_holdingPool:PoolModel)=>setHoldingPools([...holdingPools, _holdingPool]) }/>
        </div>
      </div>
      <div className="flex-2 p-4 pb-32 m-1 rounded shadow">
        <div>
          <h2>My deposits</h2>
          <div className="bg-gray-500 h-0.5"></div>
          <Deposits _holdingPools={holdingPools} />
        </div>
      </div>
    </div>
  );
};
