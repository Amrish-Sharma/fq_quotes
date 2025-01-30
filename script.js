function getRandomQuote() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex];
            document.getElementById('quote').innerText = quote.text;
            document.getElementById('author').innerText = `— ${quote.author}`;
        })
        .catch(error => console.error('Error fetching quotes:', error));
}

window.onload = getRandomQuote;