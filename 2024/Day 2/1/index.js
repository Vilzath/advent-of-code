const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 4

let calibrationRez = launch(calibration)
console.timeEnd('solve-calibration');
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
    console.timeEnd('solve-input');
}





function launch(file) {
    let result = 0
    let decrBreak = []
    let incrBreak = []
    let equBreak = []
    let sizeBreak = []

    file.split("\r\n").forEach(line => {
        let chars = line.split(" ")
        let isRaising;
        let isInvalid = false;
        let isUnstable = false;
        for (let i = 0; i < chars.length - 1; i++) {
            if (i == 0) {
                if (Number(chars[i]) < Number(chars[i + 1])) {
                    isRaising = true
                } else if (Number(chars[i]) > Number(chars[i + 1])) {
                    isRaising = false
                } else {
                    isUnstable = true;
                    break;
                }
            }

            if (Number(chars[i]) <= Number(chars[i + 1]) && !isRaising ||
                Number(chars[i]) >= Number(chars[i + 1]) && isRaising ||
                Math.abs(chars[i] - Number(chars[i + 1])) > 3) {

                if (!isUnstable) {
                    isUnstable = true
                    chars.splice()
                    i--;
                    break;
                }
            }
        }
        for (let i = 0; i < chars.length - 1; i++) {
            if (i == 0) {
                if (Number(chars[i]) < Number(chars[i + 1])) {
                    isRaising = true
                } else if (Number(chars[i]) > Number(chars[i + 1])) {
                    isRaising = false
                } else {
                    isInvalid = true;
                    break;
                }
            }

            if (Number(chars[i]) <= Number(chars[i + 1]) && !isRaising ||
                Number(chars[i]) >= Number(chars[i + 1]) && isRaising ||
                Math.abs(chars[i] - Number(chars[i + 1])) > 3) {
                isInvalid = true
                break;
            }
        }
        if (!isInvalid) {
            result++
        } else {

            fs.writeFileSync("decr.txt", decrBreak.toString())
            fs.writeFileSync("incr.txt", incrBreak.toString())
            fs.writeFileSync("equ.txt", equBreak.toString())
            fs.writeFileSync("size.txt", sizeBreak.toString())
        }
    })

    return Number(result)
}