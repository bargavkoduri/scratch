import React from "react";
import {motionList, actionsList} from "../actionsList"
import generateActionComponent from "./actionsComponent";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-center p-2 border-r border-gray-200">
      <div className="font-bold"> Motion </div>
      {
        motionList.map((motion,index) => {
          return (
            generateActionComponent(motion,`motion_${index}`,true)
          )
        })
      }
      <div className="font-bold mt-6"> Actions </div>
      {
        actionsList.map((motion,index) => {
          return (
            generateActionComponent(motion,`action_${index}`,true)
          )
        })
      }
    </div>
  );
}
