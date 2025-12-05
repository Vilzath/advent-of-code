const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 3

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

    let count = 50
    file.split("\n").forEach(line => {
        
        let direction = line.slice(0,1)
        let val= Number(line.slice(1))
        

        if(direction =='R'){
            count += val
        }else if (direction=='L'){
            count -=val
        }
        if(Math.abs(count)%100 == 0) result++;
        //console.log(count)
    })

    return Number(result)
}