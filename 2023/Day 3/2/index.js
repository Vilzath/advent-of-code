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
    for (let j = 0; j < lineSize; j++) {

        if (toTab[i][j] == "*") {

            let answer = checkSidesNumbersStars(toTab, i, j)
            console.log(answer)
            if (answer.length == 2) {
                result = result + answer[0] * answer[1]
            }

        }
    }
}
console.log(result)


function checkSidesNumbersStars(toTab, i, j) {

    let numberAnswer = [];

    if (i > 0) {
        let answer1 = -1
        let answer2 = -2
        let answer3 = -3
        if (j > 0) {
            if (!isNaN(toTab[i - 1][j - 1])) {
                answer1 = findCompleteNumber(toTab, i - 1, j - 1);
            }
        }

        if (!isNaN(toTab[i - 1][j])) {
            answer2 = findCompleteNumber(toTab, i - 1, j);
        }

        if (j < lineSize - 1) {
            if (!isNaN(toTab[i - 1][j + 1])) {
                answer3 = findCompleteNumber(toTab, i - 1, j + 1);
            }
        }

        if (answer1 == answer2 && answer2 == answer3) {
            numberAnswer.push(answer1)
        } else if (answer1 == answer2) {
            numberAnswer.push(answer1)
        } else if (answer2 == answer3) {
            numberAnswer.push(answer2)
        } else {
            if (answer1 != -1) numberAnswer.push(answer1)
            if (answer2 != -2) numberAnswer.push(answer2)
            if (answer3 != -3) numberAnswer.push(answer3)
        }
    }

    if (true) {
        let answer1 = -1
        let answer2 = -2

        if (j > 0) {
            if (!isNaN(toTab[i][j - 1])) {
                answer1 = findCompleteNumber(toTab, i, j - 1);
            }
        }

        if (j < lineSize - 1) {
            if (!isNaN(toTab[i][j + 1])) {
                answer2 = findCompleteNumber(toTab, i, j + 1);
            }
        }

        if (answer1 != -1) numberAnswer.push(answer1)
        if (answer2 != -2) numberAnswer.push(answer2)
    }


    if (i < columnSize - 1) {
        let answer1 = -1
        let answer2 = -2
        let answer3 = -3
        if (j > 0) {
            if (!isNaN(toTab[i + 1][j - 1])) {
                answer1 = (findCompleteNumber(toTab, i + 1, j - 1));
            }
        }

        if (!isNaN(toTab[i + 1][j])) {
            answer2 = (findCompleteNumber(toTab, i + 1, j));
        }

        if (j < lineSize - 1) {
            if (!isNaN(toTab[i + 1][j + 1])) {
                answer3 = (findCompleteNumber(toTab, i + 1, j + 1));
            }
        }

        if (answer1 == answer2 && answer2 == answer3) {
            numberAnswer.push(answer1)
        } else if (answer1 == answer2) {
            numberAnswer.push(answer1)
        } else if (answer2 == answer3) {
            numberAnswer.push(answer2)
        } else {
            if (answer1 != -1) numberAnswer.push(answer1)
            if (answer2 != -2) numberAnswer.push(answer2)
            if (answer3 != -3) numberAnswer.push(answer3)
        }
    }

    //remove duplicates is dumb.
    //numberAnswer = numberAnswer.filter((value, pos) => numberAnswer.indexOf(value) == pos)

    return numberAnswer;
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