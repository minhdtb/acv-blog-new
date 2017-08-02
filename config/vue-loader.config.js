module.exports = {
    preserveWhitespace: false,
    esModule: true,
    postcss: [
        require('autoprefixer')({
            browsers: ['last 3 versions']
        })
    ]
};
