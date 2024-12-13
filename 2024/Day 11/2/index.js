const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 65601038650482

let calibrationRez = launch(calibration)
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');

// 65601038650482 calib oops
// 270673834779359 
function launch(file) {
    let result = 0
    const input = file.split(" "); //.map(line => line.split(""));

    // 0 become 1
    //Even number size, split in 2
    // No applied rules *2024
    let count = 1

    let tab = input.slice()
    let numerous = []
    let ite = 0
    tab.forEach(val => {
        if (numerous[ite] == undefined) numerous[ite] = {}
        numerous[ite] = { value: val, occ: 1 }
        ite++
    })

    //console.log(numerous)
    while (count <= 75) {
        let tmp = []
        for (let i = 0; i < numerous.length; i++) {
            let current = numerous[i]
                //console.log(current)
                //console.log(current.value)
                //console.log(current.value.length)
            if (current.occ > 0) {
                if (current.value == "0") {
                    incrOrCreate(tmp, current, "1");

                } else if (current.value.length % 2 == 0) {

                    let mid = current.value.length / 2
                    let valA = current.value.substring(0, mid)
                    let valB = current.value.substring(mid)

                    valA = String(Number(valA))
                    valB = String(Number(valB))
                        //console.log(current.value + " -> " + valA + " - " + valB)
                    incrOrCreate(tmp, current, valA);
                    incrOrCreate(tmp, current, valB);

                } else {
                    let newValue = String(Number(current.value) * 2024)
                    incrOrCreate(tmp, current, newValue);
                }
            }

        }

        numerous = tmp.slice()
            //console.log(numerous)
        count++
    }
    numerous.forEach(num => {
        result += num.occ
    })
    return Number(result)
}

function incrOrCreate(tab, current, val) {

    let pos = tab.map(e => e.value).indexOf(val);

    if (pos == -1) {
        tab.push({ value: val, occ: current.occ })
    } else {
        tab[pos].occ += current.occ
    }
}