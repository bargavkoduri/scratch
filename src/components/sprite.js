import React from "react";
import { useSelector } from "react-redux";
import CatSprite from "./CatSprite";
import Draggable from 'react-draggable';
import { useDispatch } from "react-redux";
import { actions } from "../store";
import { animationHelper,greetingHelper } from "../helper";

export default function Sprite ({id}) {
    let currSpriteIndex = Number(id[id.length - 1])
    let {x,y,angle,index} =  useSelector(state => state.data.sprites)[currSpriteIndex]
    let spriteAnimations = useSelector(state => state.data.actionMap)[id]
    const dispatch = useDispatch()

    let displayHello = greetingHelper(index,spriteAnimations)

    const handleStop = (e,data) => {
        let{x,y} = data
        dispatch(actions.setPosition({x,y,index: currSpriteIndex}))
    }

    let div = document.getElementById(id)
    if(div) {
        let transform = animationHelper(x,y,angle,index,spriteAnimations)
        div.style.transform = transform
    }

    return (
        <Draggable 
            axis="both"
            allowAnyClick={true}
            onStop={handleStop}
        >
            <div id={id} style={{width: 'fit-content'}}>
                <div className="relative">
                    <CatSprite id={id}/>
                    {
                        displayHello ? 
                        <div className="absolute top-0 left-20 bg-blue-400 text-white font-bold rounded-full p-1">
                            Hello
                        </div> : <></>
                    }
                </div>
                <h2>{`Cat-${currSpriteIndex}`}</h2>
            </div>
        </Draggable>
    )
}