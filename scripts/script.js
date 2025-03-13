// Array mit 9 Einträgen für die Felder (X, O oder null)
let fields = [null, null, null, null, null, null, null, null, null];

// Aktueller Spieler: X oder O
let currentPlayer = "X";

// Zeigt an, ob das Spiel noch läuft
let gameActive = true;

// HTML-Elemente referenzieren
const statusText = document.getElementById("status");

// Mögliche Gewinnkombinationen
const winningConditions = [
    [0, 1, 2], // Erste Reihe
    [3, 4, 5], // Zweite Reihe
    [6, 7, 8], // Dritte Reihe
    [0, 3, 6], // Erste Spalte
    [1, 4, 7], // Zweite Spalte
    [2, 5, 8], // Dritte Spalte
    [0, 4, 8], // Diagonale (links oben -> rechts unten)
    [2, 4, 6]  // Diagonale (rechts oben -> links unten)
];

function init() {
    render();
}

/**
 * Rendert das komplette Spielfeld basierend auf dem Array "fields".
 * Jeder Eintrag des Arrays wird in das entsprechende .cell geschrieben.
 */
function render() {
    for (let i = 0; i < fields.length; i++) {
      const cell = document.querySelector(`.cell[data-index="${i}"]`);
  
      // Textinhalt setzen (X, O oder leer)
      cell.textContent = fields[i] === null ? "" : fields[i];
  
      // Zuvor zugewiesene Klassen entfernen, damit sich nichts überlappt:
      cell.classList.remove("x-cell", "o-cell");
  
      // Wenn das Feld ein X oder O enthält, fügen wir die passende Klasse hinzu:
      if (fields[i] === "X") {
        cell.classList.add("x-cell");
      } else if (fields[i] === "O") {
        cell.classList.add("o-cell");
      }
    }
  }
  

/**
 * Wird aufgerufen, wenn eine Zelle angeklickt wird (durch onclick im HTML).
 * index: Index der angeklickten Zelle (0 bis 8).
 */
function handleCellClick(index) {
    // Wenn das Feld schon belegt ist oder das Spiel beendet, nichts tun
    if (fields[index] !== null || !gameActive) {
        return;
    }

    // Feld mit dem Zeichen des aktuellen Spielers füllen
    fields[index] = currentPlayer;
    // Spielfeld neu rendern
    render();
    // Prüfen, ob das Spiel gewonnen wurde oder ein Unentschieden vorliegt
    checkGameStatus();

    // Spieler wechseln, wenn das Spiel weitergeht
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Spieler ${currentPlayer} ist am Zug`;
    }
}

/**
 * Prüft, ob jemand gewonnen hat oder ob es unentschieden ist.
 */
function checkGameStatus() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const valA = fields[a];
        const valB = fields[b];
        const valC = fields[c];

        // Wenn eines der Felder leer ist, kann diese Kombination kein Sieg sein
        if (valA === null || valB === null || valC === null) {
            continue;
        }

        // Wenn alle drei gleich sind, ist das Spiel gewonnen
        if (valA === valB && valB === valC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Spieler ${currentPlayer} hat gewonnen!`;
        gameActive = false;
        return;
    }

    // Falls alle Felder belegt sind und kein Gewinner, dann Unentschieden
    if (!fields.includes(null)) {
        statusText.textContent = "Unentschieden!";
        gameActive = false;
    }
}

/**
 * Setzt das Spiel zurück, wenn der "Neues Spiel"-Button geklickt wird.
 */
function resetGame() {
    fields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = `Spieler ${currentPlayer} ist am Zug`;
    render();
}

// Beim Laden der Seite einmalig rendern, damit alle Felder leer sind
render();
