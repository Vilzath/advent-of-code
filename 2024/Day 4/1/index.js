const fs = require('fs');
console.time('solve-calibration');
console.log("-----------------------------------------------")

var realFile = fs.readFileSync("./input.txt", { encoding: 'utf8' })
var calibration = fs.readFileSync("./newEntry.txt", { encoding: 'utf8' })
const EXPECTED = 8
const SETUP = false
let calibrationRez = launch(calibration)
console.log("calibration : " + calibrationRez)
if (calibrationRez == EXPECTED) {
    console.time('solve-input');
    console.log("Solution : " + launch(realFile))
}

console.timeEnd('solve-calibration');
console.timeEnd('solve-input');

//tried 2353 | 
function launch(file) {
    let result = 0
    if (SETUP) {
        file = setupFiles(file);
        file = setupFiles(file);
        file = setupFiles(file);
    }

    const input = file.split("\r\n").map(line => line.split(""));
    let coupleM = []
    let startX = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] != "X") continue;

            for (let stepX = -1; stepX < 2; stepX++) {
                for (let stepY = -1; stepY < 2; stepY++) {
                    if (stepX == 0 && stepY == 0) continue;
                    if (input[i + stepX] != undefined) {
                        if (input[i + stepX][j + stepY] == "M") {
                            stop = false;
                            coupleM.push({
                                x: i + stepX,
                                y: j + stepY,
                                dirX: stepX,
                                dirY: stepY
                            })
                        }
                    }
                }
            }
        }
    }
    //console.log(coupleM)
    let coupleA = []
    coupleM.forEach(duo => {
        if (input[duo.x + duo.dirX] == undefined) return;
        if (input[duo.x + duo.dirX][duo.y + duo.dirY] == "A") {
            coupleA.push({
                x: duo.x + duo.dirX,
                y: duo.y + duo.dirY,
                dirX: duo.dirX,
                dirY: duo.dirY
            })
        }
    });
    //console.log(coupleA)
    coupleA.forEach(duo => {
        if (input[duo.x + duo.dirX] == undefined) return;
        if (input[duo.x + duo.dirX][duo.y + duo.dirY] == "S") {
            result++;
            startX.push({ x: duo.x - duo.dirX * 3, y: duo.y - 3 * duo.dirY })
        }
    });

    //console.log(startX)
    return Number(result)
}

function setupFiles(data) {

    // Découper le fichier en lignes
    const lignes = data.split('\r\n');
    const largeur = lignes[0].length || 0;

    // Ajouter "0" au début et à la fin de chaque ligne
    const lignesModifiees = lignes.map(ligne => `0${ligne}0`);

    // Créer une ligne de zéros de la bonne longueur
    const ligneDeZeros = '0'.repeat(largeur + 2);

    // Ajouter la ligne de zéros au début et à la fin
    lignesModifiees.unshift(ligneDeZeros);
    lignesModifiees.push(ligneDeZeros);

    // Joindre les lignes modifiées en une seule chaîne
    const contenuModifie = lignesModifiees.join('\r\n');

    // Écrire le contenu modifié dans un nouveau fichier
    return contenuModifie
}