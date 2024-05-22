const path = require('path');

module.exports = {
    // Your existing webpack configuration options...
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify")
        }
    }
};
