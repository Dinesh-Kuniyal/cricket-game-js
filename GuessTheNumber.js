const CHANCES = 5;
let remainingChances = CHANCES;
const randomNumber = Math.ceil(Math.random() * 5);
let isWon = false;

while (remainingChances--) {
  const userGuessedNumber = +prompt("Guess a number 🫵 - ");

  if (randomNumber === userGuessedNumber) {
    isWon = true;
    console.log('saat crore.... 👏👏👏👏 🙌');
    remainingChances = 0;
  } else {
    console.log('Try again..');
  }
}

if (!isWon) {
  console.log('Your chances are over. Better luck next time.. 👎 👎');
}
