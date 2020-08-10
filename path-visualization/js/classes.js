var CELL_WIDTH = 30

const colors = {
    0: "black", // Unactive
    1: "blue", // Active
    2: "red",    // Collision
    3: "white"

}

class Cell{
    constructor(id, x, y, status = 0, score=0){
        this.id = id
        this.x = x
        this.y = y
        this.status = status
        this.score = score
        this.edges = []
    }

    draw(context){
        context.fillStyle = colors[this.status]
        context.fillRect(this.x * CELL_WIDTH, this.y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH)
    }

    fillEdges(grid){
        let x = this.x
        let y = this.y
        if( exist(x, y-1, grid) )
            this.edges.push(grid[x][y-1])
        if( exist(x+1, y, grid) )
            this.edges.push(grid[x+1][y])
        if( exist(x, y+1, grid) )
            this.edges.push(grid[x][y+1])
        if( exist(x-1, y,grid) )
            this.edges.push(grid[x-1][y])
    }
}

function exist(x, y, grid){
    try{
        if(grid[x][y])
            return true
    }
    catch{
        return false
    }
}