const fs = require('fs');
console.time('solve');

class Road {
    constructor(index, left, right) {
        this.index = index
        this.left = left
        this.right = right
    }
}
const alphabet = [...
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
];
var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration2.txt", { encoding: 'utf8' })
let result = 0;


let file = realFile
let direction = []
let roads = []
file.split("\r\n").forEach((line, index) => {
        if (index == 0) {
            for (let i = 0; i < line.length; i++) {
                direction.push(line.charAt(i))
            }

        } else {
            let sp = line.split(",")
            roads.push(new Road(sp[0], sp[1], sp[2]))
        }
    })
    //console.log(direction)

roads = roads.sort((r1, r2) => {

    for (let i = 0; i < 3; i++) {
        if (r1.index.charAt(i) != r2.index.charAt(i)) {
            return alphabet.indexOf(r1.index.charAt(i)) - alphabet.indexOf(r2.index.charAt(i))
        }
    }
})

//console.log(roads)
currentRoad = roads[0] /// AAA is there as it is sorted
let indexWork = 0
let path = currentRoad.index + "--"
while (currentRoad.index != "ZZZ") {

    let dirIndex = indexWork % (direction.length)
    let currDir = direction[dirIndex]
    let indexSearched
    if (currDir == "R") {
        indexSearched = currentRoad.right
    } else if (currDir == "L") {
        indexSearched = currentRoad.left
    }

    currentRoad = roads.find(r => {
        return indexSearched == r.index
    })

    path = path + currentRoad.index + "--"
    indexWork = indexWork + 1
    result = result + 1 //one step further
}
console.log(result)
console.timeEnd('solve');