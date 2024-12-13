const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = -1
const DEBUG = false

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
    analysis = []
    accepted = []

    file.split("\r\n").forEach((line, index) => {

        if (index != 12 && DEBUG) return; // 23

        let chars = line.split(" ")
        let isInvalid = false;
        let isUnstable = false;
        let trend = checkTendency(chars)
        let isRaising = trend > 0;
        if (trend == 0) {
            analysis.push(chars)
            return
        }
        for (let i = 1; i < chars.length - 1; i++) {

            let left = chars[i - 1]
            let middle = chars[i]
            let right = chars[i + 1]


            if (left == middle && right == middle) {
                isInvalid = true
                break;
            } else if ((left > middle && middle < right) ||
                (left < middle && middle > right)) {
                //Saddle 
                console.log("Saddle")
                if (isUnstable) {
                    isInvalid = true
                    break;
                }
                isUnstable = true;
                let distA = Math.abs(right - left)
                let distB = Math.abs(right - middle)
                console.log("Distance " + distA + " -- " + distB)

                let keepLeft;
                let equality = false;
                if (right == left) { // 3 4 3  ou  3 2 3 
                    equality = true
                } else if (distA == distB) {
                    if (isRaising) {
                        if (left > middle) keepLeft = false
                        else keepLeft = true
                    } else {
                        if (left < middle) keepLeft = false
                        else keepLeft = true
                    }
                } else {
                    keepLeft = distA < distB
                }
                console.log("keep : " + keepLeft)
                if (equality) {
                    if (isRaising) {
                        chars[i + 1] = undefined
                    } else {
                        chars[i + 1] = undefined
                    }
                } else if (keepLeft) {
                    chars[i] = undefined
                } else {
                    chars[i - 1] = undefined
                }
                i = 0
            } else if (left == middle || middle == right) {

                if (isUnstable) {
                    isInvalid = true
                    break;
                }
                isUnstable = true;
                chars[i] = undefined
                i = 0
            }
        }
        let newChars = chars.filter(a => a != undefined)
        for (let i = 1; i < newChars.length; i++) {
            if (newChars[i] == undefined) {
                if (Math.abs(Number(newChars[i - 1]) - Number(newChars[i + 1])) > 3) {
                    if (isUnstable) {
                        isInvalid = true
                        break;
                    }
                }
            } else {
                if (Math.abs(Number(newChars[i - 1]) - Number(newChars[i])) > 3) {
                    if (isUnstable) {
                        isInvalid = true
                        break;
                    }
                    isUnstable = true;
                    let distA = Math.abs(newChars[i - 1] - newChars[i + 1])
                    let distB = Math.abs(newChars[i] - newChars[i + 1])

                    if (distA > distB) newChars[i - 1] = undefined
                    else newChars[i] = undefined
                    i = 0
                }
            }

        }


        if (!isInvalid) {
            result++
            accepted.push(chars)
        } else {
            // console.log("error cases :")
            analysis.push(chars)
        }
    })
    console.log(accepted)
    console.log(analysis)
    return Number(result)
}


function checkTendency(chars) {
    let tend = 0
    for (let i = 0; i < chars.length - 1; i++) {
        if (chars[i] > chars[i + 1]) tend--;
        else if (chars[i] < chars[i + 1]) tend++;
    }
    return tend
}