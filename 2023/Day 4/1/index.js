const fs = require('fs');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

var splt = realFile.split("\r\n")
let result = 0;
splt.forEach(str => {

    str = str.replaceAll("  ", " ");
    let payload = str.split(":")[1];

    let isCustomerNumber = false;
    let winningNumber = []
    let points = 0


    payload.split(" ").forEach(card => {

        if (card == "|") {
            isCustomerNumber = true;
        }

        if (!isCustomerNumber) {
            winningNumber.push(card);
        }

        if (isCustomerNumber) {

            if (winningNumber.includes(card)) {
                if (points == 0) {
                    points = 1;
                } else {
                    points = points * 2
                }
            }
        }
    })
    result = result + points
})
console.log(result)