document.getElementById('search-button').addEventListener('click', function() {
  const word = document.getElementById('search-input').value;
  
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayMeaning(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      displayError(error.message);
    });
});

function displayMeaning(data) {
  const meaningDisplay = document.getElementById('meaning-display');
  meaningDisplay.innerHTML = ''; 
  
  data.forEach(entry => {
    const meanings = entry.meanings;
    meanings.forEach(meaning => {
      const definition = meaning.definitions[0].definition;
      const example = meaning.definitions[0].example;
      
      const meaningCard = document.createElement('div');
      meaningCard.classList.add('card', 'mb-3');
      meaningCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${entry.word}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${meaning.partOfSpeech}</h6>
          <p class="card-text"><strong>Definition:</strong> ${definition}</p>
          <p class="card-text"><strong>Example:</strong> ${example}</p>
        </div>
      `;
      meaningDisplay.appendChild(meaningCard);
    });
  });
}

function displayError(message) {
  const meaningDisplay = document.getElementById('meaning-display');
  meaningDisplay.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}
