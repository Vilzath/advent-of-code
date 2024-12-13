const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 41

let calibrationRez = launch(calibration)
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');


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
    let dirArr = [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }]
    let indexDir = 0;

    while (input[x][y] != undefined) {
        let dir = dirArr[indexDir];
        if (input[x + dir.x] == undefined || input[x + dir.x][y + dir.y] == undefined) {
            if (input[x][y] != "X") {
                result++;
                input[x][y] = "X";
            }
            break
        }
        if (input[x + dir.x][y + dir.y] == "#") {
            indexDir++;
            if (indexDir == 4) indexDir = 0
        }

        if (input[x][y] != "X") {
            result++;
            input[x][y] = "X";
        }
        dir = dirArr[indexDir];
        x += dir.x
        y += dir.y
    }
    for (let i = 0; i < input.length; i++) {
        //console.log(input[i].toString())
    }

    return Number(result)
}