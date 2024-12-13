const fs = require('fs');
const { validateHeaderName } = require('http');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 6
const dirArr = [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }]

let calibrationRez = launch(calibration)
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}


console.timeEnd('solve-calibration');
console.timeEnd('solve-input');

//Proposed: 1884 low | 1904 High | 1886 | 1885 | 1894 | 1891 | 1896 | 1888
function launch(file) {
    let result = 0
    let start;

    const input = file.split("\r\n").map(line => line.split(""));

    for (let i = 0; i < input.length; i++) {
        if (input[i].indexOf("^") != -1) {
            start = { x: i, y: input[i].indexOf("^") }
        }
    }
    let x = start.x
    let y = start.y

    let indexDir = 0;
    while (input[x][y] != undefined) {
        let dir = dirArr[indexDir];

        if (input[x][y] != "X") {
            input[x][y] = "X";
        }
        if (input[x + dir.x] == undefined || input[x + dir.x][y + dir.y] == undefined) {
            break
        }
        if (input[x + dir.x][y + dir.y] == "#") {
            indexDir++;
            if (indexDir == 4) indexDir = 0
        } else {
            x += dir.x
            y += dir.y
        }
    }

    validatedPosition = []
    let changedPath = input.slice();
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] != "#") {

                if (i == start.x && j == start.y) continue;

                changedPath[i][j] = "#";
                if (i == 9 && j == 7) {
                    for (let i = 0; i < changedPath.length; i++) {
                        console.log(changedPath[i].toString())
                    }
                }
                if (evaluateIsLoopPath(changedPath, start)) {
                    result++;
                    validatedPosition.push({ x: i, y: j, path: changedPath })
                }
                changedPath[i][j] = "-"
            }
        }
    }

    validatedPosition.forEach(valid => {
        console.log(valid.x + " " + valid.y)
        for (let i = 0; i < valid.path.length; i++) {
            //console.log(valid.path[i].toString())
        }
    })
    return Number(result)
}

function evaluateIsLoopPath(input, start) {
    let x = start.x
    let y = start.y
    let indexDir = 0;
    let mvtList = []

    while (input[x][y] != undefined) {
        let dir = dirArr[indexDir];

        if (input[x + dir.x] == undefined || input[x + dir.x][y + dir.y] == undefined) {
            return false;
        }
        if (mvtList[x] == undefined) mvtList[x] = []
        let mvt = mvtList[x][y]
        if (mvt != undefined) {
            for (let w = 0; w < mvt.length; w++) {
                if (dir.x == mvt[w].x && dir.y == mvt[w].y) {
                    return true
                }
            }
        } else {
            mvtList[x][y] = []
            mvtList[x][y].push(dir);
        }

        if (input[x + dir.x][y + dir.y] == "#") {
            indexDir++;
            if (indexDir == 4) indexDir = 0
        } else {
            x += dir.x
            y += dir.y
        }
    }

    return false;
}