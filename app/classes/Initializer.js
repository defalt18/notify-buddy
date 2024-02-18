import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import dotenv from 'dotenv'

import logger from '../utils/logger.js'
import ROUTES from '../constants/routes.js'

export default class Initializer {
	constructor() {
		dotenv.config()
		this.app = express()
		this.port = process.env.PORT
	}

	_initializeAppConfig() {
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: true }))
		this.app.set('views', path.resolve() + '/app/views')
		this.app.set('view engine', 'pug')
		this.app.use(express.static(path.resolve() + '/app/service-workers'))
	}

	_registerRoutes() {
		for (const route of ROUTES) {
			this.app[route.method](...route._getRouteConfig())
		}
	}

	start() {
		logger.log('info', 'Initializing express app...')
		this._initializeAppConfig()
		logger.log('info', 'Initialized express app!')

		// Registering routes
		this._registerRoutes()

		// Start listening
		this.app.listen(this.port, () => {
			logger.log('info', `Express server listening on port : ${this.port}`)
		})
	}
}
