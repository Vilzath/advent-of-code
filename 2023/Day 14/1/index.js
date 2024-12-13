const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 136

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
    let grid = []
    let reverseGrid = []

    let splt = file.split("\r\n")
    let heightLength = splt.length
    let lineLength = splt[0].length

    for (let i = 0; i < heightLength; i++) {
        grid[i] = []
        if (lineLength == heightLength) {
            reverseGrid[i] = []
        }
    }
    if (lineLength != heightLength) {
        for (let j = 0; j < lineLength; j++) {
            reverseGrid[j] = []
        }
    }

    splt.forEach((line, index) => {
        for (let j = 0; j < line.length; j++) {
            grid[index][j] = line.charAt(j)
            reverseGrid[j][index] = line.charAt(j);
        }
    })


    for (let j = 0; j < lineLength; j++) {
        let isFinished = true
        for (let i = 0; i < heightLength - 1; i++) {

            let currentChar = reverseGrid[j][i]
            let nextChar = reverseGrid[j][i + 1]

            if (currentChar == "." && nextChar == "O") {
                isFinished = false;
                reverseGrid[j][i] = nextChar;
                reverseGrid[j][i + 1] = currentChar;
            }
            if (!isFinished) {
                isFinished = true;
                i = -1;
            }
        }
        for (let i = 0; i < heightLength; i++) {
            let currentChar = reverseGrid[j][i]
            if (currentChar == "O") {
                result += heightLength - i
            }
        }
    }

    return Number(result)
}