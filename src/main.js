import IMask from "imask";
import "./css/index.css";

const ccBackground1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBackground2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["blue", "grey"],
  };
  ccBackground1.setAttribute("fill", colors[type][0]);
  ccBackground2.setAttribute("fill", colors[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`);
}

//setCardType("mastercard");
globalThis.setCardType = setCardType;

//CVC
const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
  mask: "000",
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

//expiry date
const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
};
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

//Card number
const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  //This function will be triggered every time a number is entered on card number input
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });
    return foundMask;
  },
};
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

//updating card holder
const cardHolder = document.querySelector("#card-holder");
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value");
  ccHolder.innerText = cardHolder.value.length === 0 ? "JANE DOE" : cardHolder.value;
});

//add button
const addButton = document.getElementById("add-card");
addButton.addEventListener("click", () => {
  alert("Your card was added");
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
