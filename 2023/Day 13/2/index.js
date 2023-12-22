const fs = require('fs');
console.time('solve-calibration');

class Coord {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration2.txt", { encoding: 'utf8' })
const EXPECTED = 1411

let indexLine = []
let indexColumn = []
let indexValidated = []

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
    listOfTabs.forEach((tab, index) => {
        compareAndStore(tab, index, true)
    })
    listOfReverseTabs.forEach((tab, index) => {
        compareAndStore(tab, index, false)
    })



    //console.log(indexValidated)
    console.log("Line : " + indexLine)
    console.log("Col : " + indexColumn)
    console.log("Total Symetry found: " + (indexColumn.length + indexLine.length))

    indexColumn.forEach(ind => result += ind)
    indexLine.forEach(ind => result += ind * 100)
    return Number(result)
}

function compareAndStore(tab, index, isLine) {
    let isNearlySymetrical = false;
    if (indexValidated.filter(ind => ind == index).length > 0) return;
    for (let i = 0; i < tab.length - 1; i++) {
        let cmpCount = 0
        for (let delta = 0; delta < tab.length; delta++) {
            if (i - delta + 1 < 0 || i + delta > tab.length - 1) break

            let compare1 = tab[i - delta + 1]
            let compare2 = tab[i + delta]
            if (compare1.toString() != compare2.toString()) {
                compare1 = compare1.toString().replaceAll(",", "")
                compare2 = compare2.toString().replaceAll(",", "")

                for (let j = 0; j < compare1.length; j++) {
                    if (compare1.charAt(j) != compare2.charAt(j)) {
                        cmpCount++
                        if (cmpCount >= 2) break;
                    }
                }
                if (cmpCount == 1) {
                    if (isLine) {
                        indexLine.push(i + 1)
                    } else {
                        indexColumn.push(i + 1)
                    }
                    isNearlySymetrical = true
                    break
                }
            }

        }
        if (isNearlySymetrical) {
            indexValidated.push(index)
            break
        }
    }
}