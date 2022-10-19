import "./css/index.css"

const ccBackground1 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
)
const ccBackground2 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
)

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "grey"],
  }
  ccBackground1.setAttribute("fill", colors[type][0])
  ccBackground2.setAttribute("fill", colors[type][1])
}

setCardType("visa")
