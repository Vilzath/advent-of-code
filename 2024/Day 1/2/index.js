const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 31

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
    arr2Occurences = []
    for (let i = 0; i < arr2.length; i++) {
        let val = arr2[i]

        if (arr2Occurences[val] == undefined) {
            arr2Occurences[val] = 1
        } else {
            arr2Occurences[val] += 1
        }
    }

    for (let i = 0; i < arr1.length; i++) {
        let curr = arr1[i];

        if (arr2Occurences[curr] != undefined) {
            result += arr2Occurences[curr] * curr
        }
    }

    return Number(result)
}