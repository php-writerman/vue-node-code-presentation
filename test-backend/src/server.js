import 'express-zip'

import cors from 'cors'
import logger from 'morgan'
import helmet from 'helmet'
import express from 'express'
import passport from 'passport'
import fileUpload from 'express-fileupload'

import models from '@app/models/index'
import { initRouterGroups, createRouterBinder } from '@modules/extendedRouter'

import * as routers from './app/features'
import { errorHandleMiddleware } from './app/middleware'
import localLoginStrategy from './app/passport/localLogin'
import { requestMixin } from '@app/transformers/index'

import {
  appConfig,
  modelBinderConfig
} from './app/config'

requestMixin(express.request)

const bindRouter = createRouterBinder(modelBinderConfig(models))
initRouterGroups(express, bindRouter)

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.static('storage'))

app.use(fileUpload({
  limits: {
    fileSize: appConfig.maxUploadFileSize
  },
  abortOnLimit: true,
}))

if (process.env.TESTING === 'false') {
  app.use(logger('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

passport.use('local-login', localLoginStrategy)

// apply bindings to default app router
bindRouter(app)

// apply bindings to all routers
Object.values(routers).forEach(cb => cb({ app }))

app.use(errorHandleMiddleware)

export default app
