const fs = require('fs');
console.time('solve');

class Coord {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

const MAX_DUPLI = 1000000
let file = realFile
let mapRowExpanded = []
let realMap = []
let galaxyCoords = []
let customIndex = 0
let result = 0

let rowExpand = []
let colExpand = []

file.split("\r\n").forEach((line) => {
    mapRowExpanded[customIndex] = []
    let isEmpty = true
    realMap[customIndex] = []
    for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) == "#") {
            isEmpty = false
        }
        mapRowExpanded[customIndex][i] = line.charAt(i)
    }
    if (isEmpty) {
        rowExpand.push(customIndex)
    }
    customIndex = customIndex + 1
})


let customColumn = 0
for (let j = 0; j < mapRowExpanded[0].length; j++) {
    let hasGalaxy = false;
    for (let i = 0; i < mapRowExpanded.length; i++) {
        if (mapRowExpanded[i][j] == "#") {
            hasGalaxy = true
        }
        realMap[i][customColumn] = mapRowExpanded[i][j]
    }
    if (!hasGalaxy) {
        colExpand.push(customColumn)
    }
    customColumn++
}
for (let i = 0; i < realMap.length; i++) {
    for (let j = 0; j < realMap[0].length; j++) {
        if (realMap[i][j] == "#") {
            galaxyCoords.push(new Coord(i, j))
        }
    }
}

console.log(rowExpand)
console.log(colExpand)

galaxyCoords.forEach(coord => {
    let countHitrow = 0
    let countHitCol = 0
    rowExpand.forEach(row => {
        if (coord.x > row) {
            countHitrow++
        }
    })

    colExpand.forEach(col => {
        if (coord.y > col) {
            countHitCol++
        }
    })

    coord.x = coord.x + (MAX_DUPLI - 1) * countHitrow
    coord.y = coord.y + (MAX_DUPLI - 1) * countHitCol
})


for (let i = 0; i < galaxyCoords.length; i++) {
    for (let j = 0; j < galaxyCoords.length; j++) {
        if (i == j) break;
        result = result + manhathanDistance(galaxyCoords[i].x, galaxyCoords[i].y, galaxyCoords[j].x, galaxyCoords[j].y)
    }
}

console.log(result)
console.timeEnd('solve');

function manhathanDistance(x1, y1, x2, y2) {

    return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}