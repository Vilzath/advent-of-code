const fs = require('fs');

class RangeTriplet {
    constructor(min, max, base) {
        this.min = min
        this.max = max
        this.range = base
    }
}

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })
    //console.log(calibration);

//process the fields to have the data

let file = realFile
let dataMat = []
let transfoMat = []
let result = Number.MAX_SAFE_INTEGER;

let splited1 = file.split("humidity-to-location map:\r\n")
let humidity2locationData = splited1[1]

let splited2 = splited1[0].split("temperature-to-humidity map:\r\n")
let temperature2humidityData = splited2[1]

let splited3 = splited2[0].split("light-to-temperature map:\r\n")
let light2temperatureData = splited3[1]

let splited4 = splited3[0].split("water-to-light map:\r\n")
let water2lightData = splited4[1]

let splited5 = splited4[0].split("fertilizer-to-water map:\r\n")
let fertilizer2waterData = splited5[1]

let splited6 = splited5[0].split("soil-to-fertilizer map:\r\n")
let soil2fertilizerData = splited6[1]

let splited7 = splited6[0].split("seed-to-soil map:\r\n")
let seed2soilData = splited7[1]
let seedsData = splited7[0].replace("seeds: ", "")

dataMat.push(seed2soilData);
dataMat.push(soil2fertilizerData)
dataMat.push(fertilizer2waterData)
dataMat.push(water2lightData)
dataMat.push(light2temperatureData)
dataMat.push(temperature2humidityData)
dataMat.push(humidity2locationData)

dataMat.forEach(step => {
    let rulesSet = []
    step.split("\r\n").filter(value => value != "").forEach(rules => {
        let ruleSep = rules.split(" ")

        rulesSet.push(new RangeTriplet(Number(ruleSep[1]), Number(ruleSep[1]) + Number(ruleSep[2]) - 1, Number(ruleSep[0])))
    })
    transfoMat.push(rulesSet);
})

seedsData.split(" ").filter(value => value != "").forEach(seed => {

        let location = proceedSeed(Number(seed));
        //console.log(seed + " --> " + location)
        result = Math.min(result, location)
    })
    //console.log(transfoMat)
console.log(result)

function proceedSeed(seed) {
    let input = seed;
    let inputPath = seed + "|"
    transfoMat.forEach(transfoRules => {
            let done = false
            transfoRules.forEach(rule => {

                if (input <= rule.max && input >= rule.min && !done) {
                    done = true
                    input = rule.range + (input - rule.min)
                    return;
                }
            })
            inputPath = inputPath + "-->" + input
        })
        //console.log(inputPath)
    return input
}