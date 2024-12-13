const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 1928

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
    let processedInput = []
    let ite = 0
    for (let i = 0; i < file.length; i++) {
        if (i % 2 == 0) {
            for (let w = 0; w < file[i]; w++) processedInput.push(String(ite));
            ite++
        } else {
            for (let w = 0; w < file[i]; w++) processedInput.push(".");
        }
    }
    let arrangedInput = processedInput.slice();

    for (let i = 0; i < processedInput.length; i++) {

        if (arrangedInput[i] == ".") {
            let poped;
            do {
                poped = arrangedInput.pop()

            } while (poped == ".")
            arrangedInput[i] = poped;
        }
    }
    //console.log(arrangedInput)
    for (let i = 0; i < arrangedInput.length; i++) {
        result += arrangedInput[i] * i
    }

    return Number(result)
}