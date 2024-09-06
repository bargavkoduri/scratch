function animationHelper(x,y,angle,index,animations) {
    if(index < 0 || index >= animations.length || animations[index] === "Greet" ) {
        return `translate(${x}px, ${y}px) rotate(${angle}deg)`
    }
    if(animations[index] === "Move_X_25") {
        return `translate(${x+25}px, ${y}px) rotate(${angle}deg)`
    }
    if(animations[index] === "Move_Y_25") {
        return `translate(${x}px, ${y+25}px) rotate(${angle}deg)`
    }
    if(animations[index] === "Move_X_25_Y_25") {
        return `translate(${x+25}px, ${y+25}px) rotate(${angle}deg)`
    }
    if(animations[index] === "Turn_left_45") {
        return `translate(${x}px, ${y}px) rotate(${angle-45}deg)`
    }
    if(animations[index] === "Turn_right_45") {
        return `translate(${x}px, ${y}px) rotate(${angle+45}deg)`
    }
    if(animations[index] === "Flip") {
        return `translate(${x}px, ${y}px) rotate(${angle+180}deg)`
    }
}

function greetingHelper(index,animations) {
    if(index >= animations.length)
        return false
    return animations[index] === "Greet"
}

function isOverlapping(num) {
    if(num === 1)
        return false
    let boundary = document.getElementById('sprite0').getBoundingClientRect()
    let boundary1 =document.getElementById('sprite1').getBoundingClientRect()

    return !(boundary.right < boundary1.left || boundary.left > boundary1.right || boundary.bottom < boundary1.top || boundary.top > boundary1.bottom)
}

function collisionHelper(actionMap,sprites) {
    let temp = actionMap['sprite0']
    actionMap['sprite0'] = actionMap['sprite1']
    actionMap['sprite1'] = temp
    for(let i = 0;i < sprites.length;i++)
            sprites[i].index = -1
    return [actionMap,sprites]
}

export {animationHelper,greetingHelper,isOverlapping,collisionHelper}