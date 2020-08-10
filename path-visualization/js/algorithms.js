function BFS(Grid, root, goal){
    restart(Grid)
    let Q = []
    let visited = []
    Q.push(root)
    root.status = 2
    let aux = true
    while(Q.length > 0 && aux){
        let v = Q.shift()
        if(v == goal){
            break
        }
        v.edges.forEach(w => {
            if (visited.indexOf(w) == -1){
                visited.push(w)
                Q.push(w)
                if(w == goal){
                    aux =false
                }                
            }
        })
    }
    drawInOrder(visited, Grid, root, goal)
}

function DFS(Grid, root, goal){
    restart(Grid)
    let S = []
    let visited = []
    S.push(root)
    while(S.length > 0){
        v = S.pop()
        if(visited.indexOf(v) == -1){
            visited.push(v)
            if(v == goal){
                drawInOrder(visited, Grid, root, goal)
                return v
            }
            v.edges.forEach(w =>{
                S.push(w)
            })
        }
    }
    drawInOrder(visited, Grid, root)
}

function Astar(Grid, root, goal){
    restart(Grid)
    let width = canvas.width / CELL_WIDTH
    let frontier = []
    frontier.push(root)
    let came_from = {}
    came_from[root.id] = null

    while(frontier.length>0){
        let current = frontier.shift()
        current.edges.forEach(v =>{
            if(came_from[v.id] == undefined){
                frontier.push(v)
                came_from[v.id] = current
            }
        })
    }
    let current = goal
    let path = []
    while(current != root){
        path.push(current)
        current = came_from[current.id]
    }
    path.push(root)
    path.reverse()
    console.log(path)
    drawInOrder(path, Grid, root, goal)

}