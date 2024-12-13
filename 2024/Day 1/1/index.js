const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 11

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
    let arr1 = []
    let arr2 = []
    file.split("\r\n").forEach(line => {
        let splt = line.split("   ")
        arr1.push(splt[0])
        arr2.push(splt[1])
    })

    arr1 = arr1.sort()
    arr2 = arr2.sort()

    for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
        result += Math.abs(arr2[i] - arr1[i]);
    }

    return Number(result)
}