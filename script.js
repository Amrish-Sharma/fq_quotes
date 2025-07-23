function getRandomQuote() {
    fetch('Quotes.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex];
            document.getElementById('quote').innerText = quote.quote;
            document.getElementById('author').innerText = `— ${quote.author}`;
            
            // Display theme if available (backward compatibility)
            const themeElement = document.getElementById('theme');
            if (quote.theme) {
                themeElement.innerText = `Theme: ${quote.theme}`;
                themeElement.style.display = 'block';
            } else {
                themeElement.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching quotes:', error));
}

function toggleForm() {
    const form = document.getElementById('submission-form');
    const isHidden = form.classList.contains('hidden');
    
    if (isHidden) {
        form.classList.remove('hidden');
    } else {
        form.classList.add('hidden');
        // Clear success message when hiding form
        document.getElementById('success-message').classList.add('hidden');
    }
}

function submitQuote(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const newQuote = {
        quote: formData.get('quote').trim(),
        author: formData.get('author').trim(),
        theme: formData.get('theme'),
        submittedAt: new Date().toISOString()
    };
    
    // Validate required fields
    if (!newQuote.quote || !newQuote.author || !newQuote.theme) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real implementation, this would send to a server
    // For now, we'll simulate storing it locally and show success
    storePendingQuote(newQuote);
    
    // Clear the form
    form.reset();
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.innerText = 'Quote submitted successfully! It will be reviewed and added to the collection.';
    successMessage.classList.remove('hidden');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}

function storePendingQuote(quote) {
    // This would normally send to a server endpoint
    // For demonstration, we'll store in localStorage
    let pendingQuotes = JSON.parse(localStorage.getItem('pendingQuotes') || '[]');
    pendingQuotes.push(quote);
    localStorage.setItem('pendingQuotes', JSON.stringify(pendingQuotes));
    
    console.log('Quote stored locally:', quote);
    console.log('All pending quotes:', pendingQuotes);
}

// Initialize the page
window.onload = function() {
    getRandomQuote();
    
    // Set up form submission handler
    document.getElementById('quote-form').addEventListener('submit', submitQuote);
};