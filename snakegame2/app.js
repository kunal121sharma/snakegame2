const canvas=document.getElementById("canvas");
const pen=canvas.getContext("2d");
pen.fillStyle="yellow";
const cs=67;
const H=600;
const W=1000;
let food=null;

class Snake
{
    constructor()
    {
        this.init_len=5;
        this.direction="right";
        this.cells=[]


    }

    createsnake()
    {
         for(let i=0;i<this.init_len;i++ )
        {
            this.cells.push({
                x:i,
                y:0
            });



        }




    }
    drawsnake()
    {
// for(let cell of this.cells)
for(let i=0;i<this.cells.length;i++)
{
    const cell=this.cells[i];
    if(i===this.cells.length-1)
    {
        pen.fillStyle="red";
    }
    else{
        pen.fillStyle="yellow";
    }

pen.fillRect(cell.x *cs,cell.y *cs,cs-2,cs-2);

}

}
updatesnake()
{
    const headX=this.cells[this.cells.length-1].x;
    const headY=this.cells[this.cells.length-1].y;
let nextX;
let nextY;
if(headX===food.x && headY===food.y)
{
    food=generate();

}
else{

this.cells.shift();


}
if(this.direction==="left")
{
    nextX=headX-1;
    nextY=headY;
    if (nextX * cs < 0) {
        gameOver();
    }


}
else if(this.direction==="right")
{
    nextX=headX+1;
    nextY=headY;
    if (nextX * cs >W-cs) {
        gameOver();
    }


}
else if(this.direction==="up")
{
    nextX=headX;
    nextY=headY-1;
    if (nextY* cs < 0) {
        gameOver();
    }


}
else if(this.direction==="down")
{
    nextX=headX;
    nextY=headY+1;
    if (nextY * cs > H-cs) {
        gameOver();
    }


}
this.cells.push({
    x:nextX,
    y:nextY

});




}


changedirection(d)
{

this.direction=d;



}


  








}
const snake=new Snake();
function init()
{
    snake.createsnake();
    snake.drawsnake();
    food=generate();
    function keypressed(e)
    {
        if(e.key==="ArrowUp")
        {

            snake.changedirection("up");
        }
       else if(e.key==="ArrowDown")
        {

            snake.changedirection("down");
        }
       else if(e.key==="ArrowLeft")
        {

            snake.changedirection("left");
        }
        if(e.key==="ArrowRight")
        {

            snake.changedirection("right");
        }






    }
    document.addEventListener('keydown',keypressed);
}
function draw()
{pen.clearRect(0, 0, W, H);
    pen.fillStyle = 'red';
    // pen.font = '40px serif';
    // pen.fillText(`Score : ${score}`, 50, 50);
    pen.fillRect(food.x *cs, food.y*cs, cs, cs);
    pen.fillStyle = 'yellow'

    snake.drawsnake();
}


function update()
{

    snake.updatesnake();

}
function gameLoop()
{
    update();
    draw();
}
function generate()
{
const foodX=Math.floor(Math.random()*(W-cs)/cs);
const foodY=Math.floor(Math.random()*(H-cs)/cs);
const food={

    x:foodX,
    y:foodY
}
return food;



}
init();
const id=setInterval(gameLoop,500);
function gameOver()
{

    clearInterval(id);
}