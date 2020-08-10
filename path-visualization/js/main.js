const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 480
canvas.height = 480
document.getElementById("main").appendChild(canvas)

var root = null
var goal = null
var timeouts = []
var grid = []

function setup(){
    grid = null;
    grid = []
    let id = 0;
    for(let i=0; i< Math.floor(canvas.width / CELL_WIDTH); i++){
        let temp = []
        for(let j=0; j< Math.floor(canvas.height / CELL_WIDTH); j++){
            temp.push(new Cell(id,i,j))
            id++;
        }
        grid.push(temp)
    }
    for(let i=0; i< Math.floor(canvas.width / CELL_WIDTH); i++){
        for(let j=0; j< Math.floor(canvas.height / CELL_WIDTH); j++){
            grid[i][j].fillEdges(grid)
        }
    }
}

function draw(Grid){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "grey"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.strokeStyle = "white"
    Grid.forEach( row =>{
        row.forEach(cell => {
            ctx.fillStyle = colors[cell.status]
            ctx.fillRect(cell.x * CELL_WIDTH, cell.y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH)
            ctx.rect(cell.x * CELL_WIDTH, cell.y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH)
        })
    })
    ctx.stroke()
}

function drawInOrder(array, Grid, root, goal){
    for(let i=0; i<array.length; i++){
        timeouts.push(
            setTimeout( _ => {
                if(root)
                    Grid[root.x][root.y].status = 2
                Grid[array[i].x][array[i].y].status = 1
                if(goal)
                    Grid[goal.x][goal.y].status = 2
                draw(Grid)
            }, 100 * i)
        )
    }
}

function restart(Grid){
    timeouts.forEach(to =>{
        clearTimeout(to)
    })
    Grid.forEach( row =>{
        row.forEach(cell => {
            cell.status = 0
        })
    })
    root = null
    goal = null
    draw(Grid)
}

function changeSize(){
    const size = document.getElementById("cell_width").value
    CELL_WIDTH = size
    setup()
    restart(grid)
}

canvas.addEventListener("click", (e)=>{
    let rect = canvas.getBoundingClientRect()
    let x = Math.floor((e.x - rect.left) / CELL_WIDTH)
    let y = Math.floor((e.y - rect.top) / CELL_WIDTH)
    let status = 2
    if(!root && !goal){
        root = grid[x][y]
        root.status = status
    }
    else if(!goal){
        goal = grid[x][y]
        goal.status = status
    }
    draw(grid)

})

setup()
draw(grid)