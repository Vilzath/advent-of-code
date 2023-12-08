const fs = require('fs');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

var splt = realFile.split("\r\n")
var total = 0;
splt.forEach(str => {

    var valueOne = 0
    var valueTwo = 0

    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str.charAt(i))) {
            console.log(str.charAt(i))
            valueOne = Number(str.charAt(i))
            break;
        }
    }
    for (let i = str.length - 1; i > -1; i--) {
        if (!isNaN(str.charAt(i))) {
            console.log(str.charAt(i))
            valueTwo = Number(str.charAt(i))
            break;
        }
    }
    total = total + 10 * valueOne + valueTwo

})
console.log(total);