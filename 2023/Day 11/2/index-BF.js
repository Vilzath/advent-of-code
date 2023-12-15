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

const MAX_DUPLI = 2000
let file = realFile
let mapRowExpanded = []
let realMap = []
let galaxyCoords = []
let customIndex = 0
let result = 0

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
        let maxCount = 0
        do {
            let count = mapRowExpanded[customIndex].length
            customIndex = customIndex + 1
            realMap[customIndex] = []
            mapRowExpanded[customIndex] = []
            for (let k = 0; k < count; k++) {
                mapRowExpanded[customIndex][k] = "."
            }
            maxCount++
        } while (maxCount < MAX_DUPLI - 1)
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
        let count = 0
        do {
            customColumn++
            for (let i = 0; i < mapRowExpanded.length; i++) {
                realMap[i][customColumn] = "."
            }
            count++
        } while (count < MAX_DUPLI - 1)

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