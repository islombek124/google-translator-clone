"use strict";
const wordsDisplay = document.querySelector('main textarea'),
  currentDisplay = document.querySelector('.current'),
  selectTag = document.querySelectorAll('.display select'),
  meaningDisplay = document.querySelector('.meaning__display'),
  exchangeBtn = document.querySelector('.fa-solid.fa-arrow-right-arrow-left');

wordsDisplay.addEventListener('input', (e)=>{
  wordsDisplay.innerHTML = e.target.value;
  currentDisplay.innerHTML = e.target.value.length;
  if (wordsDisplay.value === '') {
    null
  } else {
    setTimeout(searchApi, 1000);
  }
});

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected;
    if ( id == 0 && country_code == "en-GB" ) {
      selected = "selected";
    } else if ( id == 1 && country_code == "hi-IN" ) {
      selected = "selected";
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

function searchApi() {
  let text = wordsDisplay.value,
      translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => meaningDisplay.innerHTML = `${data.responseData.translatedText}`);
}