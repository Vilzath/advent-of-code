const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 48
const DIFF_STRING = "USED-Really-A-lot"
let calibrationRez = launch(calibration)
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');

//submitted : 92244304 | 79699600 | 56275602
function launch(file) {
    let result = 0
    let data = DIFF_STRING + file.replaceAll("don't()", "--\n\n\n--UNUSED")
    data = data.replaceAll("do()", "--\n\n\n--" + DIFF_STRING)
    fs.writeFileSync('inputModified.txt', data)
    data.split("--\n\n\n--").forEach((line) => {
        if (line.startsWith(DIFF_STRING)) {
            let extract = line.match(/mul\(\d+,\d+\)/g)

            for (let i = 0; i < extract.length; i++) {
                extract[i] = extract[i].replaceAll("mul(", "").replaceAll(")", "")

                let ext = extract[i].split(",")
                result += Number(ext[0]) * Number(ext[1])
            }

        }
    });
    return Number(result)
}