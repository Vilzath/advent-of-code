const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 14

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
    let antennasType = []

    const s2 = [...new Set(file)].filter(la => {
        return la != "#" && la != "\n" && la != "." && la != "\r"
    });

    const input = file.split("\r\n").map(line => line.split(""));
    const height = input.length
    const width = input[0].length

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            for (k = 0; k < s2.length; k++) {
                if (input[i][j] == s2[k]) {
                    if (antennasType[s2[k] + "-"] == undefined) antennasType[s2[k] + "-"] = []
                    antennasType[s2[k] + "-"].push({ x: i, y: j })
                }
            }

        }
    }
    console.log(antennasType)
    Object.entries(antennasType).forEach(([k, antenna]) => {

        for (let i = 0; i < antenna.length; i++) {

            let currentPoint = antenna[i]

            for (let j = 0; j < antenna.length; j++) {
                if (i == j) continue;
                let comparePoint = antenna[j];

                let deltaX = currentPoint.x + (currentPoint.x - comparePoint.x)
                let deltaY = currentPoint.y + (currentPoint.y - comparePoint.y)
                    //console.log("{ x: " + currentPoint.x + " , y: " + currentPoint.y + " }" + " - " + "{ x: " + comparePoint.x + " , y: " + comparePoint.y + " }" + " === { x: " + deltaX + " , y: " + deltaY + " }")
                if (input[deltaX] != undefined && input[deltaX][deltaY] != undefined) {
                    if (input[deltaX][deltaY] != "@") result++;
                    input[deltaX][deltaY] = "@"
                }
            }
        }
    });
    for (let i = 0; i < input.length; i++) {
        console.log(input[i].toString())
    }
    return Number(result)
}