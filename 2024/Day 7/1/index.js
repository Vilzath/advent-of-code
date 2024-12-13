const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 3749 + 1 + 4 + 36 + 100

let calibrationRez = launch(calibration)
console.log("Calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');

// 7579994664925 | 7579994664369 | 7579840175842 | 7579994664753
// 7574130788982?|
// 7574285278065 low
function launch(file) {
    let result = 0

    file.split("\r\n").forEach((line, index) => {

        let totalExpected = Number(line.split(": ")[0])
        let numbers = line.split(": ")[1].split(" ")

        let quickCheck = 0
        let quickCheck2 = 1
        for (let i = 0; i < numbers.length; i++) {
            quickCheck += Number(numbers[i])
            quickCheck2 *= Number(numbers[i])
            numbers[i] = Number(numbers[i])
        }
        //*if (quickCheck == totalExpected || quickCheck2 == totalExpected) {
        //result += totalExpected
        //return;
        //} //else if (quickCheck2 < totalExpected) {
        //console.log(quickCheck2 + " < " + totalExpected)
        //strange.push(totalExpected)
        //return;
        //}
        if (isWorkingCalibration2(numbers, totalExpected, 0)) {
            result += totalExpected
        }

    })
    return Number(result)
}

function isWorkingCalibration(number, total, current) {

    if (number.length == 0) return false;

    let newTotalAdd = current + Number(number[0])
    if (current == 0) newTotalAdd += Number(number[1])
    if (newTotalAdd == total) return true
    else if (newTotalAdd > total) return false;

    let newValueAdd = number.slice()
    if (current == 0) newValueAdd.shift()
    newValueAdd.shift()
    if (isWorkingCalibration(newValueAdd, total, newTotalAdd)) {
        return true;
    }

    let newTotalMult
    if (current == 0) newTotalMult = Number(number[0]) * Number(number[1])
    else newTotalMult = current * Number(number[0])

    if (newTotalMult == total) return true
    else if (newTotalMult > total) return false;

    let newValueMult = number.slice()
    if (current == 0) newValueMult.shift()
    newValueMult.shift()
    if (isWorkingCalibration(newValueMult, total, newTotalMult)) {
        return true;
    };

    return false;
}

function isWorkingCalibration2(number, total, current) {

    if (number.length == 0) return false;
    ////////////////
    //Addition
    ////////////////
    let newValueAdd = number.slice()

    let newTotalAdd = current + newValueAdd.shift() // Number(number[0])
    if (newTotalAdd == total && newValueAdd.length == 0) return true
        //else if (newTotalAdd > total) return false;

    if (isWorkingCalibration2(newValueAdd, total, newTotalAdd)) {
        return true;
    }
    ////////////////
    //Multiplication
    ////////////////

    let newValueMult = number.slice()

    if (current == 0) current = 1;
    let newTotalMult = current * newValueMult.shift()
        //console.log("Multi curr : " + current)
        //console.log("new total : " + newTotalMult)
        //console.log(total)
    if (newTotalMult == total && newValueMult.length == 0) return true
        //else if (newTotalMult > total) return false;

    if (isWorkingCalibration2(newValueMult, total, newTotalMult)) {
        return true;
    };
}