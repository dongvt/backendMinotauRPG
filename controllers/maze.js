//Source: https://integral-domain.org/lwilliams/Applets/algorithms/kruskalmaze.php
//Code: https://integral-domain.org/lwilliams/Applets/scripts/kruskal.js

var cells = {};
var walls = {};
var backup;

// var msize; //the length of one side of the square maze
var mrows, mcolumns;
var rwall, cwtag;
var nwalls = 0;
var potentialWalls = [];

function newmaze() {
    //msize = 10; //How big is the grid? Currently Square
    mrows = 10;
    mcolumns = 10;
    cells = {};
    walls = {};
    potentialWalls = [];

    //build cell objects
    for (var r = 0; r < mrows; r++) {
        for (var c = 0; c < mcolumns; c++) {
            var ct = ""+ (r*mrows+c);

            cells[ct] = { row: r, col: c, visited: false, setindex: Number(ct) }

            //wall above
            if (r > 0) {
                nwalls++;
                var ntag = (r-1) * mrows + c;
                walltag = ntag + ',' + (r*mrows+c);
                potentialWalls.push(walltag);
                walls[walltag] = [ true, 'h'];
            }
            if (c > 0) {
                nwalls++;
                var ntag = r*mrows + c-1;
                walltag = ntag + ',' + (r*mrows+c);
                potentialWalls.push(walltag);
                walls[walltag] = [ true, 'v'];
            }
        }        
    }
    rwall = potentialWalls[ Math.floor( potentialWalls.length * Math.random() ) ]; //Random starting wall
}

function generate() {
    var finish = true;

    for (var r = 0; r < mrows; r++) {
        for (var c = 0; c < mcolumns; c++) {
            if (cells['' + (r*mrows+c)].visited == false ) {
                finish = false;
                break;
            }
        }
    }
    if (!finish) {
        next();
        generate(); //recursive
    }
}

function next() {
    var rwn1 = ''+rwall.split(',')[0]; //first neighbor
    var rwn2 = ''+rwall.split(',')[1]; //second neighbor (to the right or below)

    cells[rwn1].visited = true;
    cells[rwn2].visited = true;

    if( cells[rwn1].setindex != cells[rwn2].setindex ) {
        //not in same set, remove wall
        walls[rwall][0] = false;
        potentialWalls.splice(potentialWalls.indexOf(rwall),1);

        //add all cells in second set to first set
        var secondSetIndex = cells[rwn2].setindex;
        var newSetIndex = cells[rwn1].setindex;
        const keys = Object.keys(cells) //no semicolon in original doc
        for (const key of keys) {
            if (cells[key].setindex == secondSetIndex ) {
                cells[key].setindex = newSetIndex;
            }
        }
    }

    var pwn = potentialWalls.length;

    for (var i = pwn-1; i >= 0; i--) {
        var rwn1 = '' + potentialWalls[i].split(',')[0]; //first neighbor
        var rwn2 = '' + potentialWalls[i].split(',')[1]; //second neighbor (to the right or below)
        if (cells[rwn1].setindex == cells[rwn2].setindex) {
            potentialWalls.splice(i,1);
        }
    }

    rwall = potentialWalls[ Math.floor( potentialWalls.length * Math.random() ) ];
}

function convert() {
    newmaze();
    generate();
    var maze = new Array();
    for (const wall in walls) {
        const index = parseInt(wall.split(',')[0], 10);
        if (walls[wall][1] == "v") {
            if (maze[index] == undefined) {
                maze[index] = { vertical: walls[wall][0] };
            }
            else { //maze[index] is already defined
                maze[index] = {
                    vertical: walls[wall][0],
                    horizontal: maze[index].horizontal,
                };
            }
        }
        else if (walls[wall][1] == 'h') {
            if (maze[index] != undefined ) { //this will happen more often
                maze[index] = {
                    vertical: maze[index].vertical,
                    horizontal: walls[wall][0],
                };
            }
            else { //maze[index] is not already defined (edge is on the very right)
                maze[index] = { horizontal: walls[wall][0] };
            }
        }
    }
    // console.log(maze.length);
    // console.log(maze);
    // console.log(maze[16]);
}

exports.getConvert = convert;

// newmaze();
// generate();
// console.log(walls);
convert();