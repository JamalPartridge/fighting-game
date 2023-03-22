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

const gravity = 0.7
//Giving a form of gravity handles JUMP

class Sprite {
    constructor({position, velocity, color = '#4343Ea', offset}){
        //The argument position within the constructor is to control the position of individual characters and not alter the whole page. 
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100, 
            height: 50,
        }
        //Wrapped these in an object to hold shape of object
        this.color = color
        this.isAttacking
    }
    draw(){
        // CHANGES THE CHARACTERS COLOR
        contxt.fillStyle = this.color
    
        //defining what a character looks like
        contxt.fillRect(this.position.x, this.position.y, this.width, this.height)

        // this is where the attack box is drawn
        if(this.isAttacking){
        contxt.fillStyle = "red"
        contxt.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height)
        }
    }

    update(){
        //updating properties to move across the screen
        this.draw()
        //calling draw to be updated as needed
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        //defining how player moves on x axis 
        this.position.y += this.velocity.y
        //using this to add px over time for each frame using OOP 
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
        //The argument is managing the players to fit to the height of the canvas and when that event is met it ensures that they do not go off screen.  
    }
    attack(){
       this.isAttacking = true
       setTimeout(() => {
        this.isAttacking = false
       }, 100)
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
    },
    offset: {
        x: 0,
        y: 0
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
   },
   color: 'yellow',
   offset: {
    x: -50,
    y: 0
   }
   //Velocity at 0 as a starting point
})

console.log(player)

//CREATE ANIMATION FILE

const keys = {
    //creating keys that control the objects within the game
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed:false
    }, 
    ArrowLeft:{
        pressed:false
    }

}

function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}


function animate(){
    window.requestAnimationFrame(animate)
    //Creating an infinite loop to show objects frame by frame to appear as if moving. Until told to stop.
   contxt.fillStyle = 'black'
   //this will change the background color to differ from the player molds
   contxt.fillRect(0, 0, canvas.width, canvas.height)
   //opposite of fillrec
   player.update()
   op.update()

   player.velocity.x = 0
   op.velocity.x = 0
   //controlling the direction pad 
   if(keys.a.pressed && player.lastKey === 'a'){
    player.velocity.x = -5
    //Changing speed to px per frame 
   } else if (keys.d.pressed && player.lastKey === 'd'){
    player.velocity.x = 5
   }

   //Enemy movement 
   if(keys.ArrowLeft.pressed && op.lastKey === 'ArrowLeft'){
    op.velocity.x = -5
   } else if (keys.ArrowRight.pressed && op.lastKey === 'ArrowRight'){
    op.velocity.x = 5
   }
//    detect collision
   if (
    rectangularCollision({
        rectangle1: player,
        rectangle2: op
    })
    && player.isAttacking
    ){
    player.isAttacking = false
    document.querySelector('#enemyHealth').style.width = '20%'
   }

   if (
    rectangularCollision({
        rectangle1: op,
        rectangle2: player
    })
    && op.isAttacking
    ){
    op.isAttacking = false
    console.log('eneny attack successful')
   }
}

animate()

//PLAYER MOVEMENT

window.addEventListener('keydown', (event) => {
//PLAYER ONE
    console.log(event.key)
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            //changed to handle how high we jump
            break
        case ' ':
            player.attack()
            break
    
//PLAYER TWO 
   
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            op.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            op.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            op.velocity.y = -20
            break
        case 'ArrowDown': 
            op.isAttacking = true
            break   
    }
   
//This is creating an event listener for when pressing down on a key.
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    //Op keys
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
//This changes if the key is up refactor to be one switch case if possible. 
})