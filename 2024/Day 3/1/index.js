const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 161

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
    let extract = file.match(/mul\(\d+,\d+\)/g)

    for (let i = 0; i < extract.length; i++) {
        extract[i] = extract[i].replaceAll("mul(", "").replaceAll(")", "")

        let ext = extract[i].split(",")
        console.log(extract)
        result += Number(ext[0]) * Number(ext[1])
    }
    return Number(result)
}