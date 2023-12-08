const fs = require('fs');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration2.txt", { encoding: 'utf8' })

let splt = realFile.split("\r\n")
console.log(splt.length)
    //tab transform for positions manipulation
let i = 0;
var toTab = []
splt.forEach(str => {
    toTab[i] = []
    for (let j = 0; j < str.length; j++) {
        toTab[i][j] = str.charAt(j)
    }
    i = i + 1
});
//console.log(toTab)

lineSize = toTab[0].length
columnSize = toTab.length

let result = 0;

for (let i = 0; i < columnSize; i++) {
    let lastCounted = 0;
    let lasti = i;
    for (let j = 0; j < lineSize; j++) {
        console.log(i + " - " + j)
        if (!isNaN(toTab[i][j])) {

            if (checkSidesForSpecials(toTab, i, j)) {
                let counted = findCompleteNumber(toTab, i, j);
                console.log("in -->" + lastCounted)
                if (lastCounted != counted || lasti != i) {
                    console.log(counted);
                    result = result + counted
                    lastCounted = counted
                    lasti = i
                }
            }

        } else {
            lastCounted = 0
            lasti = 0
        }
    }
}
console.log(result)


function checkSidesForSpecials(toTab, i, j) {

    if (i > 0) {
        if (j > 0) {
            if (toTab[i - 1][j - 1] != "." && isNaN(toTab[i - 1][j - 1])) {
                return true;
            }
        }

        if (toTab[i - 1][j] != "." && isNaN(toTab[i - 1][j])) {
            return true;
        }

        if (j < lineSize - 1) {
            if (toTab[i - 1][j + 1] != "." && isNaN(toTab[i - 1][j + 1])) {
                return true;
            }
        }
    }


    if (j > 0) {
        if (toTab[i][j - 1] != "." && isNaN(toTab[i][j - 1])) {
            return true;
        }
    }

    if (toTab[i][j] != "." && isNaN(toTab[i][j])) {
        return true;
    }

    if (j < lineSize - 1) {
        if (toTab[i][j + 1] != "." && isNaN(toTab[i][j + 1])) {
            return true;
        }
    }

    if (i < columnSize - 1) {
        if (j > 0) {
            if (toTab[i + 1][j - 1] != "." && isNaN(toTab[i + 1][j - 1])) {
                return true;
            }
        }

        if (toTab[i + 1][j] != "." && isNaN(toTab[i + 1][j])) {
            return true;
        }

        if (j < lineSize - 1) {
            if (toTab[i + 1][j + 1] != "." && isNaN(toTab[i + 1][j + 1])) {
                return true;
            }
        }
    }


    return false;
}

function findCompleteNumber(toTab, i, j) {

    let complete = toTab[i][j];
    //check left
    if (j > 0) {
        let tmp = j - 1
        while (!isNaN(toTab[i][tmp]) && tmp >= 0) {
            complete = toTab[i][tmp] + complete
            tmp = tmp - 1
        }
    }

    //check right
    if (j < lineSize - 1) {
        let tmp = j + 1
        while (!isNaN(toTab[i][tmp]) && tmp <= lineSize - 1) {
            complete = complete + toTab[i][tmp]
            tmp = tmp + 1
        }
    }

    return Number(complete);
}