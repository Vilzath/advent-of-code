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
while (!isStart) {

    move(oldPositionX, oldPositionY, currentPositionX, currentPositionY)
    result = result + 1
    if (currentPositionX == startx && currentPositionY == starty)[
        isStart = true
    ]
}

console.log(Math.ceil(result / 2))



console.timeEnd('solve');

function move(lasti, lastj, i, j) {
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