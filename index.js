const inputEl = document.getElementById ("input");
const titleEl = document.getElementById ("title");
const meaningEl = document.getElementById ("meaning");
const audioEl = document.getElementById ("audio");

const myApiKey = "oIbbwGF1GmAaBCdDTSeF3w==MEIcnaSsJ3cmDbTy";
const apiDictionary = "https://api.api-ninjas.com/v1/dictionary?word=";

const options = {
    method: "GET",
    headers:{
        "X-Api-Key": myApiKey,
    },
};
audioEl.style.display = "none";

async function fetchAPI(word) {
try{

  titleEl.innerText= `Searching for ${word}...`;
  const response = await fetch(apiDictionary + word, options);
  const data = await response.json();

  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

  if (data.definition) {

  titleEl.innerText = `${capitalizedWord} Means :`

  const definition = data.definition;
  audioEl.style.display = "inline-flex";
  meaningEl.innerText= definition;

  if (data[0] && data[0].phonetics.length > 0) {
    audioEl.src = data[0].phonetics[0].audio;
    audioEl.style.display = "inline-flex";
  } else {
    audioEl.style.display = "none";
  }
  
  } else {
    // If the API response does not contain a definition, display a message
    audioEl.style.display = "none";
    titleEl.innerText = `We could not find a definition for : ${word}`;
    meaningEl.innerText = "The Word You Logged is Either too Advanced or too Basic to Be Explained or Slang";
  }

  } catch (error) {
    titleEl.innerText = `${capitalizedWord} Meaning Was not Found Due to an Error`
    meaningEl.innerText= "Check Your Internet Connection"
    audioEl.style.display = "none";
  }};

  // Listen for keyup events on the input element
    inputEl.addEventListener("keyup", (e) => {
      if (e.target.value && e.key === "Enter") {
    // Fetch the API data when the enter key is pressed and input is not empty
      const word = e.target.value;
      fetchAPI(e.target.value);
    }
  });