let jsonData;

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    console.log(jsonData);
  })

function highlightText() {
    const inputElement = document.getElementById("textInput");
    const outputElement = document.getElementById("output");

    const inputValue = inputElement.value;
    const keywords = jsonData.keywords.map(keyword => keyword.toLowerCase());

    let highlightedText = "";
    let startIndex = 0;

    for (let i = 0; i < inputValue.length; i++) {
        let matched = false;
        for (const keyword of keywords) {
            if (inputValue.toLowerCase().startsWith(keyword, i)) {
                const matchedText = inputValue.substring(i, i + keyword.length);
                highlightedText += `<span class="highlight">${matchedText}</span>`;
                i += keyword.length - 1;
                startIndex = i + 1;
                matched = true;
                break;
            }
        }
        if (!matched) {
            if (inputValue[i] === '\n') {
                highlightedText += '<br>';
            } else {
                highlightedText += inputValue[i];
            }
        }
    }

    outputElement.innerHTML = highlightedText;
}
  