const fs = require('fs');
console.time('solve-calibration');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
const EXPECTED = 4174379265

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
        
        let cutted = line.split(",").forEach(cut =>{
            let inp = cut.split("-")
            let start = Number(inp[0])
            let end = Number(inp[1])
            //console.log(start + "->"+end)
            for(let i =start;i<=end;i++){
                
                let charred = String(i)
                if(charred.length%2 !=0) continue;

                let middly = (charred.length)/2
                //console.log(middly)
                let left = charred.slice(0,middly)
                let right = charred.slice(middly)
                //console.log(left + " vs " + right)
                if(left == right){
                    result+= i
                }
            }

            for(let i =start;i<=end;i++){

                let charred = String(i)
                

            }
        })
       
       
    })

    return Number(result)
}