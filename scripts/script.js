// Spielfeld-Array
let fields = [null, null, null, null, null, null, null, null, null];

// Aktueller Spieler
let currentPlayer = "X";

// Spiel noch aktiv?
let gameActive = true;

// Referenzen
const statusText = document.getElementById("status");
const winLineDiv = document.getElementById("winLine");

// Mögliche Gewinnkombinationen
const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function init() {
  render();
}

/** Spielfeld aktualisieren */
function render() {
  for (let i = 0; i < fields.length; i++) {
    const cell = document.querySelector(`.cell[data-index="${i}"]`);
    const markSpan = cell.querySelector(".mark");

    let mark = fields[i] === null ? "" : fields[i];
    markSpan.textContent = mark;

    // Animation-Klassen anpassen
    markSpan.classList.remove("x", "o");
    if (mark === "X") {
      markSpan.classList.add("x");
    } else if (mark === "O") {
      markSpan.classList.add("o");
    }
  }
}

/** Klick in eine Zelle */
function handleCellClick(index) {
  if (!gameActive || fields[index] !== null) return;

  fields[index] = currentPlayer;
  render();
  checkGameStatus();

  if (gameActive) {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Spieler ${currentPlayer} ist am Zug`;
  }
}

/** Sieg oder Unentschieden prüfen */
function checkGameStatus() {
  let roundWon = false;
  let winningCombo = null; // Merken, welche Combo gewinnt

  for (let combo of winningConditions) {
    const [a, b, c] = combo;
    if (
      fields[a] !== null &&
      fields[a] === fields[b] &&
      fields[b] === fields[c]
    ) {
      roundWon = true;
      winningCombo = combo; // Speichere die Kombination
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Spieler ${currentPlayer} hat gewonnen!`;
    gameActive = false;

    // Zeige die Gewinnlinie
    showWinLine(winningCombo);

    return;
  }

  // Unentschieden
  if (!fields.includes(null)) {
    statusText.textContent = "Unentschieden!";
    gameActive = false;
  }
}

function showWinLine(combo) {
    // Linie sichtbar machen
    winLineDiv.style.display = "block";
  
    // Standardwert: Linie in der Mitte
    let transformValue = "translate(-50%, -50%) rotate(0deg)";
  
    switch (combo.toString()) {
      // Obere Reihe [0,1,2] -> Linie weiter nach oben schieben
      case "0,1,2":
        transformValue = "translate(-50%, -1950%) rotate(0deg)"; // Angepasst für obere Reihe
        break;
  
      // Mittlere Reihe [3,4,5] -> bleibt zentriert
      case "3,4,5":
        transformValue = "translate(-50%, -50%) rotate(0deg)";
        break;
  
      // Untere Reihe [6,7,8] -> Linie weiter nach unten schieben
      case "6,7,8":
        transformValue = "translate(-50%, 1850%) rotate(0deg)"; // Angepasst für untere Reihe
        break;
  
      // Linke Spalte [0,3,6]
      case "0,3,6":
        transformValue = "translate(-83%, -50%) rotate(90deg)";
        break;
  
      // Mittlere Spalte [1,4,7]
      case "1,4,7":
        transformValue = "translate(-50%, -50%) rotate(90deg)";
        break;
  
      // Rechte Spalte [2,5,8]
      case "2,5,8":
        transformValue = "translate(-17%, -50%) rotate(90deg)";
        break;
  
      // Diagonale [0,4,8]
      case "0,4,8":
        transformValue = "translate(-50%, -50%) rotate(45deg)";
        break;
  
      // Diagonale [2,4,6]
      case "2,4,6":
        transformValue = "translate(-50%, -50%) rotate(-45deg)";
        break;
    }
  
    // Transformationswert anwenden
    winLineDiv.style.transform = transformValue;
  }
  

/** Spiel zurücksetzen */
function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Spieler ${currentPlayer} ist am Zug`;

  // Gewinnlinie ausblenden
  winLineDiv.style.display = "none";

  render();
}
