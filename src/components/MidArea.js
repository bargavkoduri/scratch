import React from "react";
import {actions} from "../store"
import { useSelector,useDispatch } from "react-redux";
import generateActionComponent from "./actionsComponent";

export default function MidArea() {
  const sprites = useSelector(state => state.data.sprites)
  const selectedSprite = useSelector(state => state.data.selectedSprite)
  const actionsList = useSelector(state => state.data.actionMap)[selectedSprite]
  const inProgress = useSelector(state => state.data.inProgress)

  const dispatch = useDispatch()

  const handleOnDrop = (e) => {
    if(inProgress) {
      alert("Animation in Progress")
      return;
    }
    let actionItem = e.dataTransfer.getData("action_item")
    if(actionsList.length === 0 || actionsList[actionsList.length-1] !== 'Repeat')
      dispatch(actions.addActionItem(actionItem))
    else
      alert("Can't Add Action after Repeat")
  }

  const handleOnDragOver = (e) => {
    e.preventDefault()
  }

  const handleDelete = (index) => {
    if (inProgress) {
      alert("Animation in Progress")
      return;
    }
    dispatch(actions.deleteActionItem(index))
  }

  const handleSpriteChange = (e) => {
    dispatch(actions.setSelectedSprite(e.target.value))
  }

  return ( 
    <div className="flex-1 h-full overflow-auto p-2" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
      <div className="flex justify-between items-center border-b p-2">
        <h2 className="font-bold px-2">
          Actions Area
        </h2>
        <div>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSpriteChange}
          > 
            {
              sprites.map((sprite, i) => <option key={i} value={i}>{sprite.id}</option>)
            }
          </select>
        </div>
      </div>

      <div className="h-full w-full">
      {
        actionsList.length > 0 ? 
        <>
        {
          actionsList.map((actionItem,index) => {
            return (
              <div key={index} className="flex">
                <div className="w-5/6">
                  {
                    generateActionComponent(actionItem,`action_${index}`,false)
                  }
                </div>
                <div className="w-1/6 flex items-center justify-center rounded ml-1 mt-3 top-0 right-0 bg-red-400 text-white cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                    Remove
                </div>
              </div>
            ) 
          })
        }
        </> 
        : 
        <div className="h-full flex items-center justify-center text-gray-400 text-3xl font-bold"> Drag over here </div>

      }
      </div>
    </div>
  )
}
