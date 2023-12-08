const fs = require('fs');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

const RED = 12
const GREEN = 13
const BLUE = 14

let result = 0

let splt = realFile.split("\n")

splt.forEach(str => {

    const idAndNot = str.split(":")
    let isValidHand = true;

    let gameId = Number(idAndNot[0].replaceAll(":", "").replaceAll("Game ", ""));
    let completeTirage = idAndNot[1].replaceAll(" ", "").replaceAll(",", " ");
    let hands = completeTirage.split(";")

    let minR = 0
    let minG = 0
    let minB = 0

    hands.forEach(hand => {
        if (!isValidHand) return;

        const indexB = hand.indexOf("blue")
        const indexG = hand.indexOf("green")
        const indexR = hand.indexOf("red")

        let countR = 0
        let countG = 0
        let countB = 0

        if (indexB != -1) {
            let tmp = ""
            let i = 1
            while (hand.charAt(indexB - i) != " ") {
                if (indexB - i > -1) {
                    tmp = hand.charAt(indexB - i) + tmp

                } else {
                    break
                }
                i = i + 1
            }
            countB = Number(tmp)
        }
        if (indexR != -1) {
            let tmp = ""
            let i = 1
            while (hand.charAt(indexR - i) != " ") {
                if (indexR - i > -1) {
                    tmp = hand.charAt(indexR - i) + tmp

                } else {
                    break
                }
                i = i + 1
            }
            countR = Number(tmp)
        }
        if (indexG != -1) {
            let tmp = ""
            let i = 1
            while (hand.charAt(indexG - i) != " ") {
                if (indexG - i > -1) {
                    tmp = hand.charAt(indexG - i) + tmp

                } else {
                    break
                }
                i = i + 1
            }
            countG = Number(tmp)
        }

        minB = Math.max(countB, minB)
        minR = Math.max(countR, minR)
        minG = Math.max(countG, minG)
    })

    if (isValidHand) {
        result = result + minB * minG * minR
    }
})

console.log(result)