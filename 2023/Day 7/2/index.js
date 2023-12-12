const fs = require('fs');

class Hand {
    constructor(hand, bid) {
        this.points = -1
        this.initHand = hand
        this.sortedHand = hand
        this.label = ""
        this.bid = Number(bid)
    }
}

const CARD_FORCE = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

var realFile = fs.readFileSync("input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("calibration3.txt", { encoding: 'utf8' })

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
    let maxHit = 0
    let minHit = 10
    let hitPair = false;
    let hitDouble = false;

    CARD_FORCE.forEach((force) => {

        let count = hand.initHand.split(force).length - 1

        if (force != "J") {
            maxHit = Math.max(maxHit, count)
            if (count > 0) minHit = Math.min(minHit, count)

            if (count == 2) {
                if (!hitPair) {
                    hitPair = true
                } else {
                    //console.log("hit both !")
                    hitDouble = true
                }
            }
        } else if (count > 0) {
            if (hitDouble) hitDouble = false; // Avoid strange behavior on a 2 pair changed in full house
            maxHit = maxHit + count
        }
    })
    let doItMyself = 0
    if (maxHit == 5) {
        doItMyself = 1000000000
        hand.label = maxHit + " of a kind"
    } else if (maxHit == 4) {
        doItMyself = 10000000
        hand.label = maxHit + " of a kind"
    } else if (maxHit == 3 & minHit == 2) {
        doItMyself = 100000
        maxHit = maxHit + 0.9
        hand.label = "Full House"
    } else if (maxHit == 3) {
        doItMyself = 1000
        hand.label = maxHit + " of a kind"
    } else if (maxHit == 2) {
        console.log(hand.initHand + " isDoublePair :" + hitDouble)
        if (hitDouble) {
            doItMyself = 100
            hand.label = "Double pair"
        } else {
            doItMyself = 10
            hand.label = "Simple pair"
        }
    } else if (maxHit == 1) {
        doItMyself = 1
        hand.label = "High Card"
    }

    hand.points = doItMyself
})

//handProcessed.sort((hand1, hand2) => hand1.points - hand2.points)
handProcessed.sort((hand1, hand2) => {

    if (hand1.points != hand2.points) {
        return hand1.points - hand2.points
    }

    for (let i = 0; i < 5; i++) {
        if (hand1.initHand.charAt(i) != hand2.initHand.charAt(i)) {
            return CARD_FORCE.indexOf(hand2.initHand.charAt(i)) - CARD_FORCE.indexOf(hand1.initHand.charAt(i))
        }
    }
})


let outputSorted = "\n"
handProcessed.forEach((hand, index) => {
    console.log(index + "--" + hand.initHand + " : " + hand.label)
    result = result + (index + 1) * hand.bid
})

console.log(result)