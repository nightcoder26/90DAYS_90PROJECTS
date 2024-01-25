const heading = document.getElementById("colourValue");
const answerMessage = document.getElementById("answer");
const button = document.getElementsByClassName("colourButton");

function setButtonColour(button, red, green, blue) {
  button.setAttribute(
    "style",
    "background-color: rgb(" + red + "," + green + "," + blue + ");"
  );
}

function makeColour() {
  return Math.round(Math.random() * 255);
}

function startGame() {
  answerMessage.innerHTML = "";

  let answerButton = Math.round(Math.random() * button.length - 1);

  for (let i = 0; i < 6; i++) {
    let red = makeColour();
    let green = makeColour();
    let blue = makeColour();

    setButtonColour(button[i], red, green, blue);
    if (i == answerButton) {
      heading.innerHTML = `(${red}, ${green}, ${blue})`;
    }

    button[i].addEventListener("click", function () {
      if (this == button[answerButton]) {
        answer.innerHTML = "Correct!";
      } else {
        answer.innerHTML = "Wrong! Try again";
      }
    });
  }
}

document.getElementById("resetButton").addEventListener("click", startGame());
