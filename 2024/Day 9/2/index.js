const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")
var realFile = fs.readFileSync("../input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("../calibration.txt", { encoding: 'utf8' })
const EXPECTED = 2858

let calibrationRez = launch(calibration)
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');

//8592266602739 high
//6363268339304 good. 

function launch(file) {
    let result = 0
    let processedInput = []
    let fileRecap = []
    let holeRecap = []
    let ite = 0

    let currentNewPos = 0
    for (let i = 0; i < file.length; i++) {
        if (i % 2 == 0) {
            for (let w = 0; w < file[i]; w++) processedInput.push(String(ite));
            fileRecap.push({ id: ite, size: Number(file[i]), start: currentNewPos })
            ite++
        } else {
            for (let w = 0; w < file[i]; w++) processedInput.push(".");
            holeRecap.push({ size: Number(file[i]), start: currentNewPos })

        }
        currentNewPos += Number(file[i])
    }
    //console.log(fileRecap.reverse())
    //console.log(holeRecap)
    fileRecap = fileRecap.reverse()
    let arrangedInput = processedInput.slice();

    for (let w = 0; w < fileRecap.length; w++) {
        let currentFile = fileRecap[w];
        for (let k = 0; k < holeRecap.length; k++) {
            let currentHole = holeRecap[k]
            if (currentHole.start > currentFile.start) continue;

            if (currentFile.size <= currentHole.size) {

                //Placement de la valeur au bon endroit
                for (let h = currentHole.start; h < currentHole.start + currentFile.size; h++) {
                    arrangedInput[h] = String(currentFile.id)
                }
                //Suppression a son ancien start
                for (let h = currentFile.start; h < currentFile.start + currentFile.size; h++) {
                    arrangedInput[h] = "."
                }

                currentHole.size = currentHole.size - currentFile.size
                currentHole.start += currentFile.size
                break;
            }
        }
    }

    console.log(arrangedInput);
    for (let i = 0; i < arrangedInput.length; i++) {
        if (arrangedInput[i] != ".") {
            result += Number(arrangedInput[i]) * i
        }
    }

    return Number(result)
}