const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 55312

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
    const input = file.split(" "); //.map(line => line.split(""));

    // 0 become 1
    //Even number size, split in 2
    // No applied rules *2024
    let count = 1
    console.log(input)
    let tab = input.slice()
    while (count <= 25) {

        for (let i = 0; i < tab.length; i++) {
            if (tab[i].startsWith("0")) {
                tab[i] = String(Number(tab[i]))
            }

            if (tab[i] == "0") {
                tab[i] = "1"
            } else if (tab[i].length % 2 == 0) {
                let tmp = []
                let mid = tab[i].length / 2

                tmp.push(tab[i].substring(0, mid))
                tmp.push(tab[i].substring(mid))
                tab[i] = tmp
            } else {
                tab[i] = String(Number(tab[i]) * 2024)
            }
        }
        count++
        tab = tab.flat(Infinity);
        console.log(tab)
    }

    result = tab.length
    return Number(result)
}