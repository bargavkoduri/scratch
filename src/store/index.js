import { configureStore, createSlice } from "@reduxjs/toolkit";
import { collisionHelper, isOverlapping } from "../helper";

const slice = createSlice({
    name: "data",
    initialState: {
        actionMap: {
            'sprite0': []
        },
        selectedSprite: 'sprite0',
        sprites: [{ id: 'sprite0',index: -1,x : 0,y: 0,angle: 0}],
        inProgress: false
    },
    reducers: {
        addActionItem(state, action) {
            let actionList = state.actionMap[state.selectedSprite]
            state.actionMap[state.selectedSprite] = [...actionList, action.payload]
        },

        deleteActionItem(state, action) {
            let actionList = state.actionMap[state.selectedSprite]
            actionList.splice(action.payload, 1)
            state.actionMap[state.selectedSprite] = [...actionList]
            console.log(state.actionMap[state.selectedSprite])
        },

        addSprite(state) {
            let sprites = state.sprites
            state.sprites = [...sprites, { id: `sprite${state.sprites.length}`,index: -1,x: 0,y: 0,angle: 0}]
            state.actionMap = { ...state.actionMap, [`sprite${state.sprites.length - 1}`]: [] }
        },

        setSelectedSprite(state, action) {
            state.selectedSprite = `sprite${action.payload}`
        },

        reset(state) {
            state.actionMap = {
                'sprite0': []
            }
            state.selectedSprite = 'sprite0'
            state.sprites = [{ id: 'sprite0',index: -1,x: 0,y: 0,angle: 0}]
            state.inProgress = false
        },

        startAnimation(state) {
            state.inProgress = true
        },

        setPosition(state,action) {
            let {x,y,index} = action.payload
            state.sprites[index] = {...state.sprites[index],x,y}
        },

        nextFrame(state) {
            if(isOverlapping(state.sprites.length)){
               let arr = collisionHelper(state.actionMap,state.sprites)
               state.actionMap = arr[0]
               state.sprites = arr[1]
            }
            let {actionMap,sprites} = state
            let count = 0
            for(let i = 0;i < sprites.length;i++){
                let {id,index,x,y,angle} = sprites[i]
                let actionList = actionMap[id]
                if(index != -1 && index < actionList.length) {
                    let action = actionList[index]
                    if(action === 'Move_X_25') 
                        x += 25
                    else if(action === 'Move_Y_25') 
                        y += 25
                    else if(action === 'Move_X_25_Y_25') {
                        x += 25
                        y += 25
                    }
                    else if(action === 'Turn_left_45') 
                        angle -= 45
                    else if(action === 'Turn_right_45') 
                        angle += 45
                    else if(action === 'Flip') 
                        angle += 180
                }
                index += 1
                if (index < actionList.length && actionList[index] === 'Repeat')
                    index = 0
                if(index >= actionList.length)
                    count += 1
                sprites[i] = {id,index,x,y,angle}
            }
            if(count === sprites.length){
                state.inProgress = false
                for(let i = 0;i < sprites.length;i++)
                    sprites[i].index = -1
                state.sprites = [...sprites]
            }
            else {
                state.sprites = [...sprites]
            }
            
        },

        stopAnimation(state) {
            state.inProgress = false
            let sprites = state.sprites
            for(let i = 0;i < sprites.length;i++)
                sprites[i].index = -1
            state.sprites = [...sprites]
        }
    },
})

const store = configureStore({
    reducer: {
        data: slice.reducer
    },
});

export default store;
export const actions = slice.actions;