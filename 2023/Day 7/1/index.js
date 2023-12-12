const fs = require('fs');

class Hand {
    constructor(hand, bid) {
        this.points = -1
        this.initHand = hand
        this.sortedHand = hand
        this.bid = Number(bid)
    }
}

const CARD_FORCE = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration.txt", { encoding: 'utf8' })

let file = realFile
let handProcessed = []
let result = 0;

file.split("\r\n").forEach(hand => {
    let pa = hand.split(" ")
    handProcessed.push(new Hand(pa[0], pa[1]))
})

handProcessed.forEach(hand => {
    let ineficientSort = []
    for (let i = 0; i < hand.sortedHand.length; i++) {
        ineficientSort.push(hand.sortedHand.charAt(i))
    }
    ineficientSort.sort((a, b) => {
        return CARD_FORCE.indexOf(a) - CARD_FORCE.indexOf(b)
    })
    hand.sortedHand = ineficientSort.toString().replaceAll(",", "")
})

handProcessed.forEach(hand => {
    let maxHit = -1
    let minHit = 10
    let hitPair = false;
    let hitDouble = false;

    CARD_FORCE.forEach((force) => {

        let count = hand.sortedHand.split(force).length - 1

        if (count > 0) console.log(force + " -> " + count)

        maxHit = Math.max(maxHit, count)
        if (count > 0) minHit = Math.min(minHit, count)

        if (count == 2) {
            if (!hitPair) {
                hitPair = true
            } else {
                console.log("hit both !")
                hitDouble = true
            }
        }
    })

    if (maxHit == 3 & minHit == 2) {
        maxHit = maxHit + 0.3
    }

    if (hitDouble) {
        maxHit = maxHit + 0.3
    }

    hand.points = Math.round(Math.pow(10, Number(maxHit)))

    for (let i = 0; i < 5; i++) {
        let value = CARD_FORCE.length - CARD_FORCE.indexOf(hand.initHand.charAt(i))
        hand.points = hand.points + value / Math.pow(10, i * 2)
    }

})

handProcessed.sort((hand1, hand2) => hand1.points - hand2.points)

handProcessed.forEach((hand, index) => {
    result = result + (index + 1) * hand.bid
})
console.log(result)