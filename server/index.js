import express from 'express'
import config from '@config'
import path from 'path'

import v1Router from '@routes'
import Mongoose from 'mongoose'
import BodyParser from 'body-parser'

import Webpack from 'webpack'
import WebpackConfig from '@/webpack.config'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'


Mongoose.connect(config.databaseUrl, {
    useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true
  }).then( () => {
    console.log("Connected To Mongo Db DataBase");
}).catch((err) => {
  console.log("DataBase Connection Error " + err);
})
const app = express()
app.use(BodyParser.json)

const compiler = Webpack(WebpackConfig)

app.use(WebpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath
}))

app.use(WebpackHotMiddleware(compiler))

app.use(v1Router)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})
app.listen(3000, () => {
  console.log('started')
})
