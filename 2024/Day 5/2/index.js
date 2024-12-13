const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 123

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
    file.split("\r\n").forEach((line) => {
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
        let updated = entry.slice()
        let isValidLine = true;
        for (let i = 0; i < updated.length; i++) {
            let char = String(updated[i])
            let precedent = ruleSet[char].prev
            let apres = ruleSet[char].next

            for (let pre = 0; pre < precedent.length; pre++) {
                let index = updated.indexOf(String(precedent[pre]))
                if (index == -1) continue;

                if (index > i) {
                    isValidLine = false;
                    let tmp = updated[i]
                    updated[i] = updated[index]
                    updated[index] = tmp
                    i = 0
                }
            }
            for (let apr = 0; apr < apres.length; apr++) {
                let index = updated.indexOf(String(apres[apr]))
                if (index == -1) continue;

                if (index < i) {
                    isValidLine = false;
                    let tmp = updated[i]
                    updated[i] = updated[index]
                    updated[index] = tmp
                    i = 0
                }
            }
        }

        if (!isValidLine) {
            let thirdValue = updated.length / 2 - 0.5
            result += Number(updated[thirdValue])
        }
    })

    return Number(result)
}