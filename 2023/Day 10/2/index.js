const fs = require('fs');
const { start } = require('repl');
console.time('solve');

class Coord {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

let file = realFile
let map = []
let allPipePath = [];
let startx, starty
let result = 0

file.split("\r\n").forEach((line, index) => {

    map[index] = []
    for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) == "S") {
            startx = index
            starty = i
            map[index][i] = "L"
        } else {
            map[index][i] = line.charAt(i)
        }

    }
})


let currentPositionX = startx
let currentPositionY = starty

let oldPositionX = startx
let oldPositionY = starty

let isStart = false
let area = 0
while (!isStart) {

    move(oldPositionX, oldPositionY, currentPositionX, currentPositionY)

    //Shoelace
    area = area + oldPositionX * currentPositionY - (oldPositionY * currentPositionX)
    if (currentPositionX == startx && currentPositionY == starty)[
        isStart = true
    ]
}

console.log(area)
console.log(allPipePath.length)

result = -1 * (-1 * Math.abs(area) / 2 + allPipePath.length / 2 - 1)

console.log(result)

console.timeEnd('solve');

function move(lasti, lastj, i, j) {
    //console.log(i, j)
    if (map[i][j] == "|") {
        if (lasti == i + 1) {
            currentPositionX = i - 1
        } else {
            currentPositionX = i + 1
        }
    } else if (map[i][j] == "-") {

        if (lastj == j + 1) {
            currentPositionY = j - 1
        } else {
            currentPositionY = j + 1
        }
    } else if (map[i][j] == "L") {
        if (lasti == i) {
            currentPositionX = i - 1
        } else {
            currentPositionY = j + 1
        }
    } else if (map[i][j] == "J") {
        if (lasti == i) {
            currentPositionX = i - 1
        } else {
            currentPositionY = j - 1
        }
    } else if (map[i][j] == "7") {
        if (lasti == i) {
            currentPositionX = i + 1
        } else {
            currentPositionY = j - 1
        }
    } else if (map[i][j] == "F") {
        if (lasti == i) {
            currentPositionX = i + 1
        } else {
            currentPositionY = j + 1
        }
    }
    oldPositionX = i
    oldPositionY = j

    allPipePath.push(new Coord(i, j))
}

function checkOnPath(i, j) {
    let count = allPipePath.filter(path => {
        return (path.x == i && path.y == j)
    }).length

    if (count == 0) {
        return false;
    }

    return true;
}