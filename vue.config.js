module.exports = {
    outputDir:`${__dirname}/server/dist`,
    devServer:{
        proxy:'http://localhost:3000'
    }
}