module.exports = [{
    context: ['/auth', '/api'],
    target: process.env.REST_SERVER_URL || 'http://localhost:4200',
    secure: true,
    changeOrigin: true
}, {
    context: '/',
    target: process.env.REST_SERVER_URL || 'http://localhost:4200',
    secure: true,
    changeOrigin: true,
    ws: true,
    bypass: function (req, res, proxyOptions) {
        const accept = req.headers.accept || '';
        if (accept.indexOf('html') !== -1) {
            return '/index.html';
        }
    }
}];