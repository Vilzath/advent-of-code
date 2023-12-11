const fs = require('fs');

class RaceDuet {
    constructor(maxTime, cValue) {
        this.maxTime = Number(maxTime)
        this.cValue = Number(cValue) * -1
    }
}

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
console.log(calibration);

let result = 1

let file = realFile
file = file.replaceAll("Time: ", "")
file = file.replaceAll("Distance: ", "")
file = file.replaceAll("\r\n", " ")
let splt = file.split(" ")

let toBeSolved = []

for (let i = 1; i <= (splt.length) / 2; i++) {

    let mirror = i - 1 + (splt.length) / 2
    toBeSolved.push(new RaceDuet(splt[i - 1], splt[mirror]))
}

//console.log(toBeSolved)

toBeSolved.forEach(duet => {
    console.log("-1X^2 + " + duet.maxTime + "X " +
        duet.cValue);
    let x1, x2;
    let discr = (duet.maxTime * duet.maxTime) - 4 * duet.cValue * -1 //b^2 -4ac
    x1 = (-1 * duet.maxTime + Math.sqrt(discr)) / -2
    x2 = (-1 * duet.maxTime - Math.sqrt(discr)) / -2

    if (x1 % 1 == 0) {
        x1 = x1 + 1
    }
    if (x2 % 1 == 0) {
        x2 = x2 - 1
    }

    x1 = Math.ceil(x1)
    x2 = Math.floor(x2)

    result = result * (x2 - x1 + 1)
})

console.log(result)