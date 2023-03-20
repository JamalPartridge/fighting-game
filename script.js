//PROJECT SET-UP
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

/*
Using OOP to make sprites interact with one another with independent properties.  
*/

const gravity = 0.2
//Giving a form of gravity 

class Sprite {
    constructor({position, velocity}){
        //The argument position within the constructor is to control the position of individual characters and not alter the whole page. 
        this.position = position
        this.velocity = velocity
        this.height = 150
        //Wrapped these in an object to hold shape of object
    }
    draw(){
        contxt.fillStyle = 'red'
        //defining what a character looks like
        contxt.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update(){
        //updating properties to move across the screen
        this.draw()
        //calling draw to be updated as needed
        
        this.position.y += this.velocity.y
        //using this to add px over time for each frame using OOP 
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
        //The argument is managing the players to fit to the height of the canvas and when that event is met it ensures that they do not go off screen. 
    }
}

/*CREATE A PLAYER
using OOP to grab a new player using the Sprite class
*/

const player = new Sprite({
    //Creating an instance of the sprite calls AKA making a new player. 
    position: {
        //this object is the position
    x:0,
    y:0
    //object is taking position argument for the start point of our player
    },
    velocity: {
        x:0,
        y:0
    }
    //Keeps player from moving by default. 
})
//CREATE AN OP


const op = new Sprite({
//Having op on other side of screen
   position: {
    x:975,
    y:0,
   },

   velocity: {
    x:0,
    y:0,
   }
   //Velocity at 0 as a starting point
})

console.log(player)

//CREATE ANIMATION FILE

function animate(){
    window.requestAnimationFrame(animate)
    //Creating an infinite loop to show objects frame by frame to appear as if moving. Until told to stop.
   contxt.fillStyle = 'black'
   //this will change the background color to differ from the player molds
   contxt.fillRect(0, 0, canvas.width, canvas.height)
   //opposite of fillrec
   player.update()
   op.update()
}

animate()