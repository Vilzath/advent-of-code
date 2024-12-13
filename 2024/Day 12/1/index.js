const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 1930

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
    const uniquePlants = [...new Set(file)].filter(la => {
        return la != "#" && la != "\n" && la != "." && la != "\r"
    });
    const input = file.split("\r\n").map(line => line.split(""));
    let gardens = []

    let aeraFinal = 0
    let perimeter = 0

    for (let w = 0; w < uniquePlants.length; w++) {
        let currentChar = uniquePlants[w]
        let tmp = input.map(function(arr) {
            return arr.slice();
        });
        for (let i = 0; i < tmp.length; i++) {
            for (let j = 0; j < tmp[0].length; j++) {
                if (tmp[i][j] == currentChar) {

                    let aera = recurAera(tmp, currentChar, i, j)
                    aeraFinal += aera
                    gardens.push({ char: currentChar, coord: { x: i, y: j }, surface: aera })

                    let perimeter = recurPerimeter(tmp, ".", i, j)
                    console.log(currentChar + " -> aera: " + aera + " Perimeter : " + perimeter + " ==> " + (aera * perimeter))
                    result += aera * perimeter
                }
            }
        }
    }
    return Number(result)
}

function recurAera(tab, value, i, j) {
    let result = 1
    tab[i][j] = "."
    if (tab[i + 1] != undefined) {
        if (tab[i + 1][j] == value) {
            result += recurAera(tab, value, i + 1, j)
        }
    }
    if (tab[i - 1] != undefined) {
        if (tab[i - 1][j] == value) {

            result += recurAera(tab, value, i - 1, j)
        }
    }

    if (tab[i][j + 1] == value) {

        result += recurAera(tab, value, i, j + 1)
    }
    if (tab[i][j - 1] == value) {

        result += recurAera(tab, value, i, j - 1)
    }

    return result;
}

function recurPerimeter(tab, value, i, j) {
    let result = 4
    tab[i][j] = "/"

    if (tab[i + 1] != undefined) {
        if (tab[i + 1][j] == value) {
            result += recurPerimeter(tab, value, i + 1, j)
            result--
        } else if (tab[i + 1][j] == "/") result--;
    }
    if (tab[i - 1] != undefined) {
        if (tab[i - 1][j] == value) {
            result += recurPerimeter(tab, value, i - 1, j)
            result--
        } else if (tab[i - 1][j] == "/") result--;
    }

    if (tab[i][j + 1] == value) {
        result += recurPerimeter(tab, value, i, j + 1)
        result--
    } else if (tab[i][j + 1] == "/") result--;

    if (tab[i][j - 1] == value) {
        result += recurPerimeter(tab, value, i, j - 1)
        result--
    } else if (tab[i][j - 1] == "/") result--;

    return result;
}