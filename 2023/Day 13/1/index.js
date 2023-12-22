const { Console } = require('console');
const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration2.txt", { encoding: 'utf8' })
const EXPECTED = 709

let calibrationRez = launch(calibration)

console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');



function launch(file) {
    let result = 0
    let listOfTabs = []
    let listOfReverseTabs = []
    let indexTab = 0

    file.split("\r\n\r\n").forEach(tab => {
        listOfTabs[indexTab] = []
        listOfReverseTabs[indexTab] = []
        tab.split("\r\n").forEach((line, index) => {
            listOfTabs[indexTab][index] = []
            for (let j = 0; j < line.length; j++) {
                listOfTabs[indexTab][index][j] = line.charAt(j);

            }
        })
        for (let j = 0; j < listOfTabs[indexTab][0].length; j++) {
            listOfReverseTabs[indexTab][j] = []
        }
        tab.split("\r\n").forEach((line, index) => {
            for (let j = 0; j < line.length; j++) {
                listOfReverseTabs[indexTab][j][index] = line.charAt(j);
            }
        })

        indexTab++
    })

    let indexLine = []
    let indexColumn = []
    let indexValidated = []
    listOfTabs.forEach((tab, index) => {
        let isSymetrical = true;
        for (let i = 0; i < tab.length - 1; i++) {
            for (let delta = 1; delta < tab.length; delta++) {
                if (i - delta + 1 < 0 || i + delta > tab.length - 1) {
                    indexLine.push(i + 1)
                    isSymetrical = true;
                    indexValidated.push(index)
                    break
                }
                let compare1 = tab[i - delta + 1].toString()
                let compare2 = tab[i + delta].toString()

                if (compare1.toString() != compare2.toString()) {

                    isSymetrical = false;
                    break;
                }
            }
            if (isSymetrical) break
        }
    })
    listOfReverseTabs.forEach((tab, index) => {

        if (indexValidated.filter(ind => index == ind))
            for (let i = 0; i < tab.length - 1; i++) {
                for (let delta = 0; delta < tab.length; delta++) {
                    if (i - delta + 1 < 0 || i + delta > tab.length - 1) {
                        indexColumn.push(i + 1)
                        isSymetrical = true;
                        indexValidated.push(index)
                        break
                    }
                    let compare1 = tab[i - delta + 1]
                    let compare2 = tab[i + delta]
                    if (index == 5) console.log(i + " & " + delta + " -> " + compare1 + " vs " + compare2)
                    if (compare1.toString() != compare2.toString()) {
                        //console.log("Break !")
                        isSymetrical = false;
                        break;
                    }
                }
                if (isSymetrical) break
            }
    })
    console.log(indexValidated)
    console.log(indexColumn.length + indexLine.length)

    indexColumn.forEach(ind => result += ind)
    indexLine.forEach(ind => result += ind * 100)
    return Number(result)
}


function printAll(listOfTabs) {
    let linePrint = ""
    for (let i = 0; i < listOfTabs.length; i++) {
        for (let j = 0; j < listOfTabs[0].length; j++) {
            for (let k = 0; k < listOfTabs[0][0].length; k++) {
                linePrint += listOfTabs[i][j][k] + " "
            }
            console.log(linePrint)
            linePrint = ""
        }
        console.log("\n")
    }
}