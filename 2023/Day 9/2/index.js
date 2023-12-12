const fs = require('fs');
console.time('solve');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

let result = 0
let file = realFile
let pyramid = []

file.split("\r\n").forEach((line, index) => {
    pyramid[index] = []
    let tmp = line.split(" ");
    tmp.forEach((t, index) => {
        tmp[index] = Number(t);
    })
    pyramid[index][0] = tmp
})


pyramid.forEach(pyr => {

    let allZero = false
    let i = 0;
    while (!allZero) {
        allZero = true;
        let line = []
        let sizeTest = pyr[i].length

        for (let j = 0; j < sizeTest - 1; j++) {
            let valueCalc = Number(pyr[i][j + 1]) - Number(pyr[i][j])
            line.push(valueCalc);

            if (valueCalc != 0) {
                allZero = false
            }
        }
        pyr[i + 1] = line
        i = i + 1
    }

    let jesaispascombien = i

    for (i; i > -1; i--) {
        pyr[i][pyr[i].length] = 0
    }

    i = jesaispascombien - 1

    for (i; i > -1; i--) {
        let max = pyr[i].length
        if (pyr[i][max - 1] == 0) {
            pyr[i][max - 1] = pyr[i + 1][max - 2] + pyr[i][max - 2]
        }
    }
    i = jesaispascombien
    for (i; i > -1; i--) {
        pyr[i].splice(0, 0, 0)
    }

    i = jesaispascombien - 1
    for (i; i > -1; i--) {
        if (pyr[i][0] == 0) {
            pyr[i][0] = pyr[i][1] - pyr[i + 1][0]
        }
    }

    result = result + pyr[0][0]
})

console.log(pyramid)
console.log(result)
console.timeEnd('solve');