const exp = require('constants');
const fs = require('fs');
console.time('solve');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

let file = realFile
let result = 0

let buildSoluceTest = ""

let cache = []

file.split("\r\n").forEach((line, index) => {
    //line = line.replaceAll("....", ".");
    //line = line.replaceAll("...", ".");
    //line = line.replaceAll("..", ".");
    //line = line.replaceAll(". ", " ");




    let splt = line.split(" ")

    let combinaison = splt[1] + "," + splt[1] + "," + splt[1] + "," + splt[1] + "," + splt[1]
    let range = splt[0] + "?" + splt[0] + "?" + splt[0] + "?" + splt[0] + "?" + splt[0]
    combinaison = combinaison.split(",")

    if (range.startsWith(".")) {
        range = range.substring(1)
    }

    if (true || index == 1) {

        let countIndiv = evaluateRecursively(range, combinaison, 0);
        result += countIndiv

        //buildSoluceTest += countIndiv + " -> " + line + "\n"
    }
    //console.log(index)
})



function evaluateRecursively(target, expected, level) {

    if (target == "" || target.length == 0) { // Cas ou il reste rien
        if (expected.length == 0) { //Si on a toutes les combi, on compte +1
            //console.log("Vide +1")
            return 1
        } else {
            return 0 // S'il reste des combinaison, c'est pas bon.
        }
    }

    if (expected.length == 0) { // Si on attend plus de numéro
        if (target.includes("#")) { // mais qu'il y a encore des broken, c'est invalide
            return 0
        } else {
            //console.log("comb +1")
            return 1 // Si le reste est vide, on colle a la combinaison.
        }
    }
    if (cache[target] == undefined) {
        cache[target] = []
    }
    if (cache[target][expected.toString()] != undefined) {
        return cache[target][expected.toString()];
    }



    let count = 0
    let charChecked = target.charAt(0)
    let patternChecked = Number(expected[0])

    if (charChecked == "." || charChecked == "?") { // les points nous interessent pas & les ? considéré comme .
        //console.log(". sent " + target.substring(1) + " avec " + expected)
        count += evaluateRecursively(target.substring(1), expected, level + 1)
    }

    if (charChecked == "#" || charChecked == "?") { // Par contre les Sources et les ? devenu # on en veut bien
        //console.log("---------------------")
        //console.log(patternChecked + 1 + " <= " + target.length)
        if (patternChecked <= target.length) { // Il faut qu'on ait encore assez de caractre pour completer
            //console.log("check : " + target.substring(0, patternChecked - 1))
            if (!target.substring(0, patternChecked).includes(".")) { // Si ya des points, pas de continuité
                //console.log(patternChecked + " == " + target.length)
                //console.log(target.charAt(patternChecked) + " != #")
                if (patternChecked == target.length || target.charAt(patternChecked) != "#") { // Et ça doit bien se terminer soit par la EoS ou un "."
                    let exp = patternChecked + 1
                        //console.log(exp)
                        //console.log("# sent " + target.substring(exp) + " avec " + expected.slice(1))
                    count += evaluateRecursively(target.substring(exp), expected.slice(1), level + 1)
                }
            }
        }
    }
    cache[target][expected.toString()] = count
    return count
}
console.log("resultat : " + result)
console.timeEnd('solve');