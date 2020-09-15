import path from 'path'
import config from '@config'
import Express from 'express'
import Webpack from 'webpack'
import v1Router from '@routes'
import Mongoose from 'mongoose'
import BodyParser from 'body-parser'
import multer from 'multer'
import WebpackConfig from '@/webpack.config'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import fileUpload from 'express-fileupload'
import morgan from 'morgan';
Mongoose.connect(config.databaseUrl, { useNewUrlParser: true })

const app = Express()

app.use(BodyParser.json())

const compiler = Webpack(WebpackConfig)
app.use(fileUpload({
  createParentPath: true
}));
app.use(
  WebpackDevMiddleware(compiler, {
    hot: true,
    publicPath: WebpackConfig.output.publicPath,
  })
)

app.use(WebpackHotMiddleware(compiler))

app.use(v1Router)

app.use(Express.static(path.resolve(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})
app.use(morgan('dev'));
app.listen(4000, () => {
  console.log('server started')
})
