import React from "react";
import { Summary } from "./Summary";
import { Pool } from "./Pool";
import { Holdings } from "./Holdings";

export const Dashboard = () => {
  return (
    <div className="w-4/5 h-4/5 mx-auto mt-16 flex flex-col">
      <div className="flex flex-1">
        <div className="flex-1 p-6 m-1 rounded shadow">
          <Pool />
        </div>
      </div>
      <div className="flex-2 p-4 pb-32 m-1 rounded shadow">
        <Holdings />
      </div>
    </div>
  );
};
