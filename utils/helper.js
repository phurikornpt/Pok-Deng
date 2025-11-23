// #### Default
const cardType = ["Clubs", "Hearts", "Spades", "Diamonds"];

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
  const cardMemory = {};
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

module.exports = {
  formatCardName,
  formatCardPoint,
  randomCard,
  compareCard,
};
