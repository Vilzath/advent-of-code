const fs = require('fs');

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

var splt = realFile.split("\n")
var total = 0;

var targetvalue = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
var refTarget = []

for (let i = 1; i < targetvalue.length + 1; i++) {
    refTarget[targetvalue[i - 1]] = i;
}

console.log("nb ligne -> " + splt.length)
splt.forEach(str => {

    var valueOne = 0
    var valueTwo = 0

    str = str.replace(/one/, "o1e")
    str = str.replace(/two/, "t2o")
    str = str.replace(/three/, "t3e")
    str = str.replace(/four/, "f4r")
    str = str.replace(/five/, "f5e")
    str = str.replace(/six/, "s6x")
    str = str.replace(/seven/, "s7n")
    str = str.replace(/eight/, "e8t")
    str = str.replace(/nine/, "n9e")

    str = str.replace(/one/, "o1e")
    str = str.replace(/two/, "t2o")
    str = str.replace(/three/, "t3e")
    str = str.replace(/four/, "f4r")
    str = str.replace(/five/, "f5e")
    str = str.replace(/six/, "s6x")
    str = str.replace(/seven/, "s7n")
    str = str.replace(/eight/, "e8t")
    str = str.replace(/nine/, "n9e")

    str = str.replace(/one/, "o1e")
    str = str.replace(/two/, "t2o")
    str = str.replace(/three/, "t3e")
    str = str.replace(/four/, "f4r")
    str = str.replace(/five/, "f5e")
    str = str.replace(/six/, "s6x")
    str = str.replace(/seven/, "s7n")
    str = str.replace(/eight/, "e8t")
    str = str.replace(/nine/, "n9e")

    console.log(str)
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str.charAt(i))) {
            valueOne = Number(str.charAt(i))
            break;
        }
    }


    for (let i = str.length - 1; i > -1; i--) {
        if (!isNaN(str.charAt(i))) {
            valueTwo = Number(str.charAt(i))
            break;
        }
    }
    total = total + 10 * valueOne + valueTwo
})
console.log(total);

/**
 *  var ascentMode = targetvalue
    ascentMode = ascentMode.filter(value => str.indexOf(value) > -1)
    ascentMode = ascentMode.sort((a, b) => str.indexOf(a) - str.indexOf(b))

    var ascentString = str
    for (let i = 0; i < ascentMode.length; i++) {
        let regexBuilder = ascentMode[i];
        let regex = new RegExp(regexBuilder, 'i');
        ascentString = ascentString.replace(regex, refTarget[ascentMode[i]])
    }

    var descentMode = targetvalue
    descentMode = descentMode.filter(value => str.indexOf(value) > -1)
    descentMode = descentMode.sort((a, b) => str.indexOf(b) - str.indexOf(a))

    var descentString = str
    for (let i = 0; i < descentMode.length; i++) {
        let regexBuilder = descentMode[i];
        let regex = new RegExp(regexBuilder, 'i');
        descentString = descentString.replace(regex, refTarget[descentMode[i]])
    }

 */