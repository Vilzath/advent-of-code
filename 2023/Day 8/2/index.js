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
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
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
    if (r1.index.charAt(2) != r2.index.charAt(2)) {
        return alphabet.indexOf(r1.index.charAt(2)) - alphabet.indexOf(r2.index.charAt(2))
    }
})

let rangeRoad = []
roads.forEach(r => {
    if (r.index.endsWith("A")) {
        rangeRoad.push(r);
    }
})

let cycleOfEach = []
rangeRoad.forEach(roadToAnalyze => {
    let tmpResult = 0
    let currentRoad = roadToAnalyze /// AAA is there as it is sorted
    let indexWork = 0
    let path = currentRoad.index + "--"
    while (!currentRoad.index.endsWith("Z")) {

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
        tmpResult = tmpResult + 1 //one step further
    }
    cycleOfEach.push(tmpResult)
})
console.log(cycleOfEach)

console.log(PPCMMultiple(cycleOfEach))
    //console.log(result)
console.timeEnd('solve');


function PGCD(a, b) {
    // Utilisation de l'algorithme d'Euclide
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    // Le PGCD est le dernier reste non nul
    return a;
}

function PPCM(a, b) {
    return (a * b) / PGCD(a, b);
}

function ppcmRecursif(arr) {
    if (arr.length === 2) {
        return PPCM(arr[0], arr[1]);
    } else {
        const premierDeux = arr.slice(0, 2);
        const reste = arr.slice(2);
        const ppcmPremierDeux = PPCM(premierDeux[0], premierDeux[1]);
        return ppcmRecursif([ppcmPremierDeux, ...reste]);
    }
}

function PPCMMultiple(array) {
    // Vérification pour s'assurer qu'il y a au moins deux nombres à comparer
    if (array.length < 2) {
        throw new Error('Au moins deux nombres sont nécessaires pour calculer le PPCM.');
    }

    // Appel de la fonction récursive
    return ppcmRecursif(array);
}