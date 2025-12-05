const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 6

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
    let oldcount = count
    file.split("\n").forEach(line => {
        
        let direction = line.slice(0,1)
        let val= Number(line.slice(1))
        
        let ratio = Math.floor(val/100)
        console.log(count)
        oldcount = count
        if(direction =='R'){
            count += val%100
        }else if (direction=='L'){
            count -= val%100
        }
        if(count == 0) result ++
        if(count <= -100) {count +=100;result++}
        if(count >= 100) {count -=100;result++;}
        if(count*oldcount<0) result++
        result += ratio
    })

    return Number(result)
}