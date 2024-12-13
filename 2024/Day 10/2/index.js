const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 81

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
    const input = file.split("\r\n").map(line => line.split(""));

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            input[i][j] = Number(input[i][j])
        }
    }
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] == 0) {

                result += recurput(input, 0, { x: i, y: j })

            }
        }
    }
    return Number(result)
}


function recurput(currentInput, currentValue, coord, count) {

    let result = 0;
    if (currentValue == undefined) return;
    if (currentValue == 9) {
        return 1;
    }

    if (currentInput[coord.x + 1] != undefined) {
        if (currentInput[coord.x + 1][coord.y] == currentValue + 1) {
            result += recurput(currentInput, currentValue + 1, { x: coord.x + 1, y: coord.y })
        }
    }
    if (currentInput[coord.x - 1] != undefined) {
        if (currentInput[coord.x - 1][coord.y] == currentValue + 1) {
            result += recurput(currentInput, currentValue + 1, { x: coord.x - 1, y: coord.y })
        }
    }

    if (currentInput[coord.x][coord.y + 1] == currentValue + 1) {
        result += recurput(currentInput, currentValue + 1, { x: coord.x, y: coord.y + 1 })
    }
    if (currentInput[coord.x][coord.y - 1] == currentValue + 1) {
        result += recurput(currentInput, currentValue + 1, { x: coord.x, y: coord.y - 1 })
    }
    return result
}