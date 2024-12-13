const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")

var realFile = fs.readFileSync("./input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("./calibration.txt", { encoding: 'utf8' })
const EXPECTED = 9
const SETUP = false
let calibrationRez = launch(calibration)
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');

//tried 2353 | 
function launch(file) {
    let result = 0
    const input = file.split("\r\n").map(line => line.split(""));

    for (let i = 1; i < input.length - 1; i++) {
        for (let j = 1; j < input[0].length - 1; j++) {
            if (input[i][j] != "A") continue;

            let leftDiag = input[i - 1][j - 1] + input[i + 1][j + 1];
            let rightDiag = input[i - 1][j + 1] + input[i + 1][j - 1];

            let isLeftOk = leftDiag == "SM" || leftDiag == "MS"
            let isRightOk = rightDiag == "SM" || rightDiag == "MS"

            if (isLeftOk && isRightOk) result++
        }
    }

    return Number(result)
}