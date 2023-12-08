const fs = require('fs');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

var splt = realFile.split("\r\n")

let result = 0;
let totalScratch = []

console.log("Base tickets : " + splt.length)
for (let i = 0; i < splt.length; i++) {
    totalScratch[i + 1] = 1;
}

splt.forEach(str => {

    str = str.replaceAll("  ", " ");

    let ticketNumber = str.split(":")[0]
    ticketNumber = ticketNumber.replaceAll("Card ", "")
    ticketNumber = Number(ticketNumber)

    let payload = str.split(":")[1];

    let isCustomerNumber = false;
    let winningNumber = []
    let points = 0

    // Check win condition
    payload.split(" ").forEach(card => {

        if (card == "|") {
            isCustomerNumber = true;
        }

        if (!isCustomerNumber) {
            winningNumber.push(card);
        }

        if (isCustomerNumber) {
            if (winningNumber.includes(card)) {
                points = points + 1;
            }
        }
    })

    //Add multiple ticket
    console.log("Print new tickets : " + points)
    let FIRST_PRINT = ticketNumber + 1
    let MAX_TICKET = ticketNumber + points + 1

    for (let i = FIRST_PRINT; i < MAX_TICKET; i++) {
        console.log(i)
        totalScratch[i] = totalScratch[i] + totalScratch[ticketNumber]
    }
})
console.log(totalScratch)
for (let i = 0; i < totalScratch.length - 1; i++) {
    result = result + totalScratch[i + 1]
}
console.log(result)