
const TAIL = 0;
const HEAD = 1;
const BATTING = 0;

const playerBattMessage = 'What you want to hit ? ';
const playerBowlMessage = 'You want to bowl for ?';
const playerScoreMessage = 'Your score is - ';

const computerBattMessage = 'Computer hit - ';
const computerBowlMessage = 'Computer bowl for - ';
const computerScoreMessage = 'Computer score is - ';

const tossBatMessage = 'Computer want bat first';
const tossBowlMessage = 'Computer want bowl first';

function speakMessage(message) {
  exec('say ' + message);
}

function formatMessage(message) {
  // speakMessage(message);
  const border = '====================================';

  return '\n' + border + '\n' + message + '\n' + border + '\n';
}

function generateRandomInRange(startRange, endRange, needFloor) {
  const randomNumber = Math.random() * (endRange - startRange) + startRange;

  return needFloor ? Math.floor(randomNumber) : randomNumber;
}

function isPlayerWonToss() {
  const generateToss = generateRandomInRange(0, 2, true);
  const doesPlayerChooseHead = confirm('Do you want head ?');

  if (doesPlayerChooseHead && generateToss === HEAD) {
    console.log(formatMessage('You won the toss'));
    return true;
  }

  console.log(formatMessage('Computer won the toss'));
  return false;
}

function isPlayerWantBattingFirst() {
  return confirm('Do you want to bat first ?');
}

function isComputerWantBattingFirst() {
  return generateRandomInRange(0, 2, true) === BATTING;
}

function startInning(isBatting, score, isPlayerPlaying, shouldContinue) {
  if (!shouldContinue) {
    return score;
  }

  const isPlayerBatting = isPlayerPlaying && isBatting || !isPlayerPlaying && !isBatting;
  const playerChoice = +prompt(isPlayerBatting ? playerBattMessage : playerBowlMessage);

  const computerChoice = generateRandomInRange(0, 7, true);
  const message = !isPlayerBatting ? computerBattMessage : computerBowlMessage;
  console.log(message, computerChoice);

  if (computerChoice === playerChoice) {
    const scoreMessage = isPlayerBatting ? playerScoreMessage : computerScoreMessage;
    console.log(formatMessage(scoreMessage + score));

    return startInning(isBatting, score, isPlayerPlaying, false);
  }

  score += isPlayerBatting ? playerChoice : computerChoice;
  console.log(isPlayerBatting ? playerScoreMessage : computerScoreMessage, score);
  console.log("\n");

  return startInning(isBatting, score, isPlayerPlaying, shouldContinue);
}

function startMatch() {
  console.log(formatMessage('🏆 Welcome to Thoughtworks Premiere League 🏆'));
  const doesPlayerWonToss = isPlayerWonToss();
  let isPlayerWantBatting = null;

  let firstInningScore = 0;

  if (doesPlayerWonToss) {
    isPlayerWantBatting = isPlayerWantBattingFirst();
    firstInningScore = startInning(isPlayerWantBatting, 0, true, true);
  } else {
    const isComputerWantBatting = isComputerWantBattingFirst();
    const tossMessage = isComputerWantBattingFirst ? tossBatMessage : tossBowlMessage;
    console.log(formatMessage(tossMessage));

    firstInningScore = startInning(isComputerWantBatting, 0, false, true);
  }

  const isPlayerPlayingFirst = doesPlayerWonToss && isPlayerWantBatting
    || !doesPlayerWonToss && !isComputerWantBattingFirst;

  console.log(formatMessage('First Inning Score is :- ' + firstInningScore));
}

startMatch();
