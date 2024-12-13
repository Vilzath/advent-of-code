const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 143

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
    let invalidInput = [];
    let ruleSet = [];

    isRule = true;
    file.split("\r\n").forEach((line, index) => {
        if (line == "--") {
            isRule = false;
            return;
        }
        if (isRule) {
            let val = line.split("|");
            let bef = val[0];
            let aft = val[1];

            if (ruleSet[bef] == undefined) ruleSet[bef] = { current: bef, prev: [], next: [] };
            if (ruleSet[aft] == undefined) ruleSet[aft] = { current: aft, prev: [], next: [] };

            ruleSet[bef].next.push(aft);
            ruleSet[aft].prev.push(bef);
            return
        }

        let entry = line.split(",")
        let isValidLine = true;

        for (let i = 0; i < entry.length; i++) {
            let char = String(entry[i])
            let precedent = ruleSet[char].prev
            let apres = ruleSet[char].next

            for (let pre = 0; pre < precedent.length; pre++) {
                if (entry.indexOf(String(precedent[pre])) == -1) continue;

                if (entry.indexOf(String(precedent[pre])) > i) {
                    isValidLine = false
                    break;
                }
            }
            if (isValidLine) {
                for (let apr = 0; apr < apres.length; apr++) {
                    if (entry.indexOf(String(apres[apr])) == -1) continue;

                    if (entry.indexOf(String(apres[apr])) < i) {
                        isValidLine = false
                        break;
                    }
                }
            }
            if (!isValidLine) break;
        }

        if (isValidLine) {
            let thirdValue = entry.length / 2 - 0.5
            result += Number(entry[thirdValue])
        } else {
            invalidInput.push(entry)
        }

    })

    return Number(result)
}