import React from "react";
import { actions } from "../store"
import { useSelector, useDispatch } from "react-redux";
import Sprite from "./sprite";

export default function PreviewArea() {
  const dispatch = useDispatch()
  const sprites = useSelector(state => state.data.sprites)
  const btnDisabled = useSelector(state => state.data.inProgress)

  console.log(btnDisabled)

  if(btnDisabled){
    setTimeout(() => {
      dispatch(actions.nextFrame())
    },600)
  }

  const handleAddSprite = () => {
    if(sprites.length < 2)
      dispatch(actions.addSprite());
    else
      alert('Max 2 sprites');
  }

  const handleReset = () => {
    dispatch(actions.reset());
  }

  const stopAnimation = () => {
    dispatch(actions.stopAnimation());
  }

  const startAnimation = () => {
    dispatch(actions.startAnimation());
  }

  return (
    <div className="flex-none h-full overflow-y-auto p-1 w-full">
      <div className="h-5/6 border-b">
      {
        sprites.map((sprite, index) => {
          return (
            <Sprite id={sprite.id} key={index} />
          )
        })
      }
      </div>
      <div className="h-1/6 mt-2 px-6">
          <h3 className="font-bold">Controls</h3>
          <div className="flex justify-around items-center">
            <button
              className="text-white rounded bg-green-500 p-3 mt-4"
              onClick={handleAddSprite}
              disabled={btnDisabled}
            >
              Add Sprite +
            </button>
            <button 
              className="text-white rounded bg-red-500 p-3 mt-4"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
            className="text-white rounded bg-blue-500 p-3 mt-4 disabled:bg-white"
              onClick={startAnimation}
              disabled={btnDisabled}
            >
              Run Animation
            </button>
            <button
              className="text-white rounded bg-red-500 p-3 mt-4"
              onClick={stopAnimation}
            >
              Stop Animation
            </button>
          </div>
      </div>
    </div>
  );
}
