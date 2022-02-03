const BOUTONEXPRESSO = document.querySelector("#bouton-expresso");
const BOUTONALLONGEE = document.querySelector("#bouton-allongee");
const BOUTONCAPPUCCINO = document.querySelector("#bouton-cappuccino");
const BOUTONNOISETTE = document.querySelector("#bouton-noisette");
const BOUTONTHE = document.querySelector("#bouton-the");
const BOUTONPOTAGE = document.querySelector("#bouton-potage");
const ECRAN = document.querySelector("#ecran");
const PRIXCAFE = [1.1, 1.2, 1.4, 1.3, 1.2, 1];
const ALLCAFE = [
  BOUTONEXPRESSO,
  BOUTONALLONGEE,
  BOUTONCAPPUCCINO,
  BOUTONNOISETTE,
  BOUTONTHE,
  BOUTONPOTAGE,
];
const NOMCAFE = [
  "Expresso",
  "Allongée",
  "Cappucino",
  "Noisette",
  "Thé",
  "Potage",
];
const SONCLICBOUTON = new Audio("./son/clic_bouton.mp3");
SONCLICBOUTON.loop = false;
SONCLICBOUTON.playbackRate = 1;
const SONINSEREPIECE = new Audio("./son/insere_piece.mp3");
SONINSEREPIECE.loop = false;
SONINSEREPIECE.playbackRate = 1;
const SONCAFEENCOURS = new Audio("./son/cafe_en_cours.mp3");
SONCAFEENCOURS.loop = false;
SONCAFEENCOURS.playbackRate = 1;
const SONREMBOURSEMENT = new Audio("./son/remboursement_pieces.mp3");
SONREMBOURSEMENT.loop = false;
SONREMBOURSEMENT.playbackRate = 1;
const BOIRE = new Audio("./son/boire.wav");
BOIRE.loop = false;
BOIRE.playbackRate = 1;
const SONREMBOURSEMENTUNEPIECE = new Audio("./son/remboursement_une_piece.mp3");
SONREMBOURSEMENTUNEPIECE.loop = false;
SONREMBOURSEMENTUNEPIECE.playbackRate = 1;
let PRIXAPAYER = 0;
const DEUXEUROS = document.querySelector("#deux-euros");
const UNEURO = document.querySelector("#un-euro");
const CINQUANTECENTIMES = document.querySelector("#cinquante-centimes");
const VINGTSCENTIMES = document.querySelector("#vingts-centimes");
const DIXCENTIMES = document.querySelector("#dix-centimes");
const CINQUECENTIMES = document.querySelector("#cinque-centimes");
const DEUXCENTIMES = document.querySelector("#deux-centimes");
const UNCENTIME = document.querySelector("#un-centime");
const PIECES = [
  DEUXEUROS,
  UNEURO,
  CINQUANTECENTIMES,
  VINGTSCENTIMES,
  DIXCENTIMES,
  CINQUECENTIMES,
];
const VALEURSPIECES = [2, 1, 0.5, 0.2, 0.1, 0.05];
let PIECESINSERE;
const CAFE = document.querySelector("#cafe");
const CAFELIQUIDE = document.querySelector("#cafe-liquide");
let programmeChoisi = false;
const PIECESNOK = [DEUXCENTIMES, UNCENTIME];
const PIECEREMBOURSEMENT1 = document.querySelector("#piece-remboursement-1");
const PIECEREMBOURSEMENT2 = document.querySelector("#piece-remboursement-2");

PIECESNOK[0].addEventListener("click", () => {
  ECRAN.innerHTML = `
  <p>Pièce refusée</p>
`;
});
PIECESNOK[1].addEventListener("click", () => {
  ECRAN.innerHTML = `
  <p>Pièce refusée</p>
`;
});

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

for (let i = 0; i < ALLCAFE.length; i++) {
  ALLCAFE[i].addEventListener("click", () => {
    ECRAN.innerHTML = `
      <p>${NOMCAFE[i]}<br> Veuillez inséré ${PRIXCAFE[i]}€</p>
    `;
    programmeChoisi = true;
    PRIXAPAYER = PRIXCAFE[i];
    SONCLICBOUTON.play();

    if (programmeChoisi == true) {
      for (let i = 0; i < VALEURSPIECES.length; i++) {
        PIECES[i].addEventListener("click", () => {
          console.log(PIECESINSERE);
          PIECESINSERE = VALEURSPIECES[i];
          SONINSEREPIECE.play();
          PRIXAPAYER -= PIECESINSERE;
          ECRAN.innerHTML = `
            <p>Reste à payer ${round(PRIXAPAYER)}€</p>
          `;
          console.log(PRIXAPAYER);
          if (round(PRIXAPAYER) == 0 || PRIXAPAYER < 0) {
            cafeEnCours();
            const REMBOURSEMENT = setTimeout(remboursement, 4000);
            SONCAFEENCOURS.play();
            CAFELIQUIDE.classList.remove("none");
            CAFE.classList.remove("none");
          }
        });
      }
    }
  });
}

function cafeEnCours() {
  ECRAN.innerHTML = `
  <p>Boisson en cours</p>
`;
}
function buvez() {
  ECRAN.innerHTML = `
  <p>Buvez vôtre boisson</p>
`;
}
function remboursement() {
  let remboursementPieces = PRIXAPAYER - PRIXAPAYER - PRIXAPAYER;
  ECRAN.innerHTML = `
  <p>Remboursement de ${round(remboursementPieces)}€</p>
`;
  const BUVEZ = setTimeout(buvez, 4000);
  if (
    round(remboursementPieces) == 1 ||
    round(remboursementPieces) == 0.5 ||
    round(remboursementPieces) == 0.2 ||
    round(remboursementPieces) == 0.1
  ) {
    SONREMBOURSEMENTUNEPIECE.play();
    PIECEREMBOURSEMENT1.classList.remove("none");
  } else if (round(remboursementPieces) == 0) {
  } else {
    SONREMBOURSEMENT.play();
    PIECEREMBOURSEMENT1.classList.remove("none");
    PIECEREMBOURSEMENT2.classList.remove("none");
  }
}

CAFE.addEventListener("click", () => {
  const RECHARGEPAGE = setTimeout(rechargePage, 5000);
  function rechargePage() {
    location.reload();
  }
  BOIRE.play();
  CAFE.classList.add("none");
  CAFELIQUIDE.classList.add("none");
});
