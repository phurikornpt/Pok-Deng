const prompt = require("prompt-sync")({ sigint: true });
const helper = require("./utils/helper");
// #### User
let userMoney = 0;

/**
 * Stete
 * 1. INIT: สอบถามเงินลงทุน
 * 2. DISPLAY_CARD: เเสดงไพ่
 * 3. ASK_FOR_PLAY: สอบถามต้องการเล่นต่อ
 */

let state = "INIT";
let bet = 0;
while (true) {
  if (state === "INIT") {
    bet = Number(prompt("Please put your bet : "));
    if (isNaN(bet)) {
      console.error("[X] Please input number only.");
      continue;
    }
    state = "DISPLAY_CARD";
  } else if (state === "DISPLAY_CARD") {
    const { userCard, botCard } = helper.randomCard();
    console.log(`You got ${userCard[0].cardName}, ${userCard[1].cardName}`);
    console.log(
      `The dealer got ${botCard[0].cardName}, ${botCard[1].cardName}`
    );
    const { userPoint, botPoint } = helper.compareCard({
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
    state = "ASK_FOR_PLAY";
  } else if (state === "ASK_FOR_PLAY") {
    const condition = prompt(
      "Wanna play more (Yes/No)? : "
    ).toLocaleLowerCase();
    if (["yes", "y"].includes(condition)) {
      state = "INIT";
    } else if (["no", "n"].includes(condition)) {
      console.log(`You got total ${userMoney} chips`);
      break;
    } else {
      console.error("[X] Please input Yes/No or y/n");
    }
  }
}
