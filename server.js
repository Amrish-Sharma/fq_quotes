// Simple Node.js server for handling quote submissions
// This would be used in a real deployment scenario

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PENDING_QUOTES_FILE = 'pending-quotes.json';

async function loadPendingQuotes() {
    try {
        const data = await fs.readFile(PENDING_QUOTES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is invalid, return empty array
        return [];
    }
}

async function savePendingQuotes(quotes) {
    await fs.writeFile(PENDING_QUOTES_FILE, JSON.stringify(quotes, null, 2));
}

function validateQuote(quote) {
    if (!quote.quote || !quote.author || !quote.theme) {
        return false;
    }
    
    // Basic validation
    if (quote.quote.length < 10 || quote.quote.length > 500) {
        return false;
    }
    
    if (quote.author.length < 2 || quote.author.length > 100) {
        return false;
    }
    
    return true;
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (method === 'POST' && parsedUrl.pathname === '/api/submit-quote') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const submittedQuote = JSON.parse(body);
                
                // Validate the quote
                if (!validateQuote(submittedQuote)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid quote data' }));
                    return;
                }
                
                // Add timestamp
                submittedQuote.submittedAt = new Date().toISOString();
                
                // Load existing pending quotes
                const pendingQuotes = await loadPendingQuotes();
                
                // Add the new quote
                pendingQuotes.push(submittedQuote);
                
                // Save back to file
                await savePendingQuotes(pendingQuotes);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    success: true, 
                    message: 'Quote submitted successfully' 
                }));
                
            } catch (error) {
                console.error('Error processing quote submission:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
            }
        });
        
    } else if (method === 'GET' && parsedUrl.pathname === '/api/pending-quotes') {
        try {
            const pendingQuotes = await loadPendingQuotes();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(pendingQuotes));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error loading pending quotes' }));
        }
        
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Quote submission server running on port ${PORT}`);
});

module.exports = server;