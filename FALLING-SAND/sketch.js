function make2DArray(cols, rows)
{
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++)
    {
        arr[i]  = new Array(rows);
        for(let j = 0; j < arr[i].length; j++)
        {
            arr[i][j] = 0;
        }
    }
    return arr;
}

let grid;
let w = 10;
let cols, rows;
let hueValue = 200;
function setup()
{
    createCanvas(1500, 670);
    colorMode(HSB, 360, 255, 255);
    cols = width/w;
    rows = height / w;
    grid = make2DArray(cols, rows);
    // for(let i = 0;i < cols; i++)
    // {
    //     for(let j =0; j < rows; j++)
    //     {
    //         grid[i][j] = 0;
    //     }
    // }
}
function mouseDragged()
{
    let col = floor(mouseX / w);
    let row = floor(mouseY / w);
    if(col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1)
    grid[col][row] = hueValue;
    hueValue+=1;
    if(hueValue > 360)
    {
        hueValue=1;
    }

}
function draw(){
    background(0);
    for(let i = 0;i < cols; i++)
    {
        for(let j =0; j < rows; j++)
        {
            noStroke();
            if(grid[i][j] > 0)
            {
            fill( grid[i][j], 255, 255 );
            let x = i * w;
            let y = j * w;
            square(x,y,w);
            }
        }
    }
    let nextGrid = make2DArray(cols, rows);
    for(let i = 0;i < cols; i++)
    {
        for(let j =0; j < rows; j++) {
                let state = grid[i][j];
                if(state > 0){
                    let below = grid[i][j+1];
                    let dir = 1;
                    if(random(1) < 0.5)
                    {
                        dir *= -1 ;
                    }
                    let belowB = -1, belowA = -1;
                    if(i > 0 && i < cols -1 )
                    {
                    belowB = grid[i - dir][j + 1];
                    belowA = grid[i+dir][j+1];
                    }
                    if(below == 0  ){

                        nextGrid[i][j] = 0;
                        nextGrid[i][j+1] = state;
                    }
                    else if(belowA == 0){
                        nextGrid[i+dir][j+1] = state;
                    }
                    else if(belowB == 0){
                        nextGrid[i-dir][j+1] = state;
                    }
                    else{
                        nextGrid[i][j] = state;
                    }
                }
        }
    }
    grid = nextGrid;
}