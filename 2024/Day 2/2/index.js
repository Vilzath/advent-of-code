const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 25
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
    atLeastUnstable = []
    invalidLine = []
    trendFault = []
    rejected = []

    let totalNumber = file.split("\r\n").length
        //First step, we remove ~200 entries that are correct anyway. 
    file.split("\r\n").forEach((line, index) => {

        let chars = line.split(" ")
        let isInvalid = false;

        let trend = checkTendency(chars)
        let isRaising = trend > 0
        if (trend == 0) {
            trendFault.push(chars)
            isInvalid = true;
            return
        }
        //console.log("-------Brick Begin------")
        for (let i = 0; i < chars.length; i++) {

            let tmpChar = chars.slice()
            tmpChar[i] = undefined
                //console.log(tmpChar)
                // if we got at least 1 ok, by removing one means its ok
            if (checkLine(tmpChar.filter(ob => ob != undefined), isRaising)) {
                isInvalid = false
                break
            }
            isInvalid = true
        }
        //console.log("-------Brick End------")
        if (!isInvalid) {
            result++;
        } else {
            rejected.push(chars)
        }
    })

    return Number(result);
}

function isMultipleSafe(chars) {

    let counter = {};
    for (element of chars.flat()) {
        if (counter[element]) {
            counter[element] += 1;
        } else {
            counter[element] = 1;
        }
    };
    let counter2 = Object.keys(counter).map((key) => [key, counter[key]])
    let isRisky = false;
    for (i = 0; i < counter2.length; i++) {
        if (counter2[i][1] >= 3) {
            return false
        } else if (counter2[i][1] == 2) {
            if (isRisky) return false
            else isRisky = true
        }
    }
    return true;
}

function checkTendency(chars) {
    let tend = 0
    for (let i = 0; i < chars.length - 1; i++) {
        if (chars[i] > chars[i + 1]) tend--;
        else if (chars[i] < chars[i + 1]) tend++;
    }
    return tend
}

function checkLine(chars, isRaising) {

    //console.log(chars)
    for (let i = 0; i < chars.length; i++) {
        if (Number(chars[i]) <= Number(chars[i + 1]) && !isRaising ||
            Number(chars[i]) >= Number(chars[i + 1]) && isRaising ||
            Math.abs(chars[i] - Number(chars[i + 1])) > 3) {
            return false;
        }
    }
    return true
}