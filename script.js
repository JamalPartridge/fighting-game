const canvas = document.querySelector('canvas')
//Importing Canvas from index.html
const contxt = canvas.getContext('2d')
//pulling in context within the canvas (sprits ect)
canvas.width = 1024
canvas.height = 576

contxt.fillRect(0, 0, canvas.width, canvas.height)
/*
Fills in the screen to be a specific color so that we are sure how much space is being used

First Position is X 
Second Position is Y
Third Position is width of screen
Fourth Position is height of screen
*/

