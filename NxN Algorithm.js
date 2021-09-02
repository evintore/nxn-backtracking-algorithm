const targetNumber = parseInt(window.prompt('Enter Target Number : '))
let rightPoints = []
let counter = 1

function moveLeft(x, y, moveCount){
  if(y - moveCount >= 0){
    y -= moveCount;
    return {x, y}
  }
  else
    return false
}

function moveUp(x, y, moveCount){
  if(x - moveCount >= 0){
    x -= moveCount;
    return {x, y}
  }
  else
    return false
}

function moveUpToLeftRightPoint(startX, startY, distanceTraveled){
	if(distanceTraveled === 0)
    rightPoints.push({
      [counter++] : [[startX,0], [startX,startY]]
    })
  
  for(let i=0; i < targetNumber; i++){
  
    let moveResult = moveUp(startX - i, startY, 1)
    
    let moveUpLocation = moveResult
       
    let roadLength = i + 1 + distanceTraveled
    
    for(let j=0; j < targetNumber; j++){
    
    	if(roadLength === targetNumber && (moveResult.x !== moveUpLocation.x || moveResult.y !== moveUpLocation.y) && distanceTraveled === 0)
      	rightPoints.push({
        	[[counter++]] : [[moveResult.x, moveResult.y], [moveUpLocation.x, moveUpLocation.y], [targetNumber, targetNumber]]
        })
      else if(roadLength === targetNumber && (moveResult.x === moveUpLocation.x || moveResult.y === moveUpLocation.y) && distanceTraveled === 0)
      	rightPoints.push({
        	[[counter++]] : [[moveResult.x, moveResult.y], [targetNumber, targetNumber]]
        })
      else if(roadLength === targetNumber && (moveResult.x === moveUpLocation.x || moveResult.y === moveUpLocation.y) && distanceTraveled !== 0 && (moveResult.x !== moveUpLocation.x || moveResult.y !== moveUpLocation.y))
      	rightPoints.push({
        	[[counter++]] : [[moveResult.x, moveResult.y], [moveUpLocation.x, moveUpLocation.y], [startX, startY], [targetNumber, targetNumber]]
        })
      else if(roadLength === targetNumber && (moveResult.x === moveUpLocation.x || moveResult.y === moveUpLocation.y) && distanceTraveled !== 0 && (moveResult.x === moveUpLocation.x || moveResult.y === moveUpLocation.y))
      	rightPoints.push({
        	[[counter++]] : [[moveUpLocation.x, moveUpLocation.y], [startX, startY], [targetNumber, targetNumber]]
        })
        
      moveResult = moveLeft(moveResult.x, moveResult.y, 1)
      
      if(moveResult.x + moveResult.y < targetNumber)
      	break
      
     	if(moveResult != false)
      	roadLength++
    }
  }
  
  if(startY >= 0)
  	return moveUpToLeftRightPoint(startX, --startY, ++distanceTraveled)
}

moveUpToLeftRightPoint(targetNumber, targetNumber, 0)
console.log('Right Points :', rightPoints)
console.log('Number of Road Found :', rightPoints.length)