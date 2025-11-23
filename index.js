const prompt = require("prompt-sync")({ sigint: true });

// #### Card Memory
/**
 * {
 *  cardName:str
 *  cardNumber: number
 * }[]
 */
const cardType = ["Clubs", "Hearts", "Spades", "Diamonds"];
let cardMemory = {};

function formatCardName(point, prefix) {
  let format = `${point}`;
  switch (point) {
    case 1:
      format = "Ace";
      break;
    case 11:
      format = "Jack";
      break;
    case 12:
      format = "Queen";
      break;
    case 13:
      format = "King";
      break;
  }
  return `${prefix}-${format}`;
}
function formatCardPoint(point) {
  let format = point;
  if (format >= 10 && format <= 13) {
    format = 0;
  }
  return format;
}
function randomCard() {
  const userCard = [];
  const botCard = [];

  while (userCard.length < 2) {
    const randCardType = cardType[Math.floor(Math.random() * 4)];
    const randCardNumber = Math.floor(Math.random() * 13 + 1);
    const resultCard = `${randCardType}-${randCardNumber}`;
    if (!cardMemory.hasOwnProperty()) {
      cardMemory[resultCard] = 1;
      userCard.push({
        cardName: formatCardName(randCardNumber, randCardType),
        point: formatCardPoint(randCardNumber),
      });
    }
  }

  while (botCard.length < 2) {
    const randCardType = cardType[Math.floor(Math.random() * 4)];
    const randCardNumber = Math.floor(Math.random() * 13 + 1);
    const resultCard = `${randCardType}-${randCardNumber}`;
    if (!cardMemory.hasOwnProperty()) {
      cardMemory[resultCard] = 1;
      botCard.push({
        cardName: formatCardName(randCardNumber, randCardType),
        point: formatCardPoint(randCardNumber),
      });
    }
  }
  cardMemory = {};
  return {
    userCard,
    botCard,
  };
}
function compareCard(card) {
  const userPoint = card?.userCard?.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.point,
    0
  );
  const botPoint = card?.botCard?.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.point,
    0
  );
  return {
    userPoint: userPoint % 10,
    botPoint: botPoint % 10,
  };
}

// #### User
let userMoney = 0;

/**
 * Stete
 * 1: asking for user bet
 * 2: Random Card and Display card
 */

let state = 0;
let bet = 0;
while (true) {
  if (state === 0) {
    bet = Number(prompt("Please put your bet : "));
    if (isNaN(bet)) {
      console.error("[X] Please input number only.");
      continue;
    }
    state = 1;
  } else if (state === 1) {
    const { userCard, botCard } = randomCard();
    console.log(`You got ${userCard[0].cardName}, ${userCard[1].cardName}`);
    console.log(
      `The dealer got ${botCard[0].cardName}, ${botCard[1].cardName}`
    );
    const { userPoint, botPoint } = compareCard({
      userCard,
      botCard,
    });
    if (userPoint > botPoint) {
      userMoney += bet;
      console.log(`You won!!!, received ${bet} chips`);
    } else if (userPoint < botPoint) {
      userMoney -= bet;
      console.log(`You Lose!!!, lose ${bet} chips`);
    } else {
      console.log(`Tie`);
    }
    state = 2;
  } else if (state === 2) {
    const condition = prompt(
      "Wanna play more (Yes/No)? : "
    ).toLocaleLowerCase();
    if (["yes", "y"].includes(condition)) {
      state = 0;
    } else if (["no", "n"].includes(condition)) {
      console.log(`You got total ${userMoney} chips`);
      break;
    } else {
      console.error("[X] Please input Yes/No or y/n");
    }
  }
}

// show money

// Feature 1: Random Card
// Feature 2: Compare Card
// Feature 3: Utils
