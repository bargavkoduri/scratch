import React from "react"
import Icon from "./Icon"

const generateActionComponent = (comp, key, draggable) => {
    const actionClass = 'flex items-center justify-center rounded text-white p-2 cursor-pointer bg-blue-400 w-full mt-3'
    const motionClass = 'flex items-center justify-center rounded text-white p-2 cursor-pointer bg-green-400 w-full mt-3'
    switch (comp) {
        case "Move_X_25":
            return (
                <div className={motionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Move X : 25
                </div>
            )

        case "Move_Y_25":
            return (
                <div className={motionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Move Y : 25
                </div>
            )

        case "Move_X_25_Y_25":
            return (
                <div className={motionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Move X : 25 & Y: 25
                </div>
            )

        case "Turn_left_45":
            return (
                <div className={motionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Turn
                    <Icon name="undo" size={15} className="text-white mx-2"></Icon>
                    45 degrees
                </div>
            )

        case "Turn_right_45":
            return (
                <div className={motionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Turn
                    <Icon name="redo" size={15} className="text-white mx-2"></Icon>
                    45 degrees
                </div>
            )

        case "Flip":
            return (
                <div className={motionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Flip
                </div>
            )

        case "Repeat":
            return (
                <div className={actionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Repeat
                </div>
            )

        case "Greet":
            return (
                <div className={actionClass} key={key} draggable={draggable} onDragStart={(e) => {
                    e.dataTransfer.setData("action_item", comp)
                }}>
                    Say Hello
                </div>
            )
    }
}

export default generateActionComponent