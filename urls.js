const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Check if a filename is provided as argument
if (process.argv.length !== 3) {
    console.error('Usage: node urls.js FILENAME');
    process.exit(1);
}

const filename = process.argv[2];

// Read the contents of the file containing URLs
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }

    const urls = data.trim().split('\n');

    // Process each URL
    urls.forEach(url => {
        // Parse the URL
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        // Choose the appropriate module for making the request
        const httpModule = parsedUrl.protocol === 'https:' ? https : http;

        // Make a GET request to the URL
        httpModule.get(url, (res) => {
            let body = '';

            // Read the response body
            res.on('data', (chunk) => {
                body += chunk;
            });

            // When the response ends, write the HTML content to a file
            res.on('end', () => {
                const outputFilename = `${hostname}.html`;
                fs.writeFile(outputFilename, body, (err) => {
                    if (err) {
                        console.error(`Error writing to ${outputFilename}: ${err.message}`);
                    } else {
                        console.log(`Successfully saved HTML from ${url} to ${outputFilename}`);
                    }
                });
            });
        }).on('error', (err) => {
            console.error(`Error downloading ${url}: ${err.message}`);
        });
    });
});
