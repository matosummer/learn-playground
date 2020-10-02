const ORIGINALTEXT = document.querySelector("#originalText");
const RESULTTEXT = document.querySelector("#resultText");
const BEFORETEXT = document.querySelector("#beforeText");
const AFTERTEXT = document.querySelector("#afterText");

function convertText() {
  let textLine = ORIGINALTEXT.value.split("\n");
  let before = BEFORETEXT.value ? BEFORETEXT.value : "";
  let after = AFTERTEXT.value ? AFTERTEXT.value : "";
  RESULTTEXT.textContent = before + textLine[0] + after;
  for (let i = 1; i < textLine.length; i++) {
    if (textLine[i].trim().length == 0) continue;
    RESULTTEXT.textContent += "\r\n" + before + textLine[i] + after;
  }
}

function highlightTextArea(e) {
  e.focus();
  e.select();
}
