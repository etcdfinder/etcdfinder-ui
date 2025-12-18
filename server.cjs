const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests: buffer JSON bodies for /v1 and forward them to the backend
// Note: when using body-parsers in Express, the raw request stream is consumed.
// To ensure the proxied request receives the body, we parse JSON here then write
// the serialized body into the proxy request in `onProxyReq`.
app.use('/v1', createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    secure: false,
    // Preserve the /v1 prefix when forwarding to the backend
    pathRewrite: {
        '^/': '/v1/',
    },
}));

// Handle SPA routing - return index.html for all other routes
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Proxying /v1 to ${BACKEND_URL}`);
});
