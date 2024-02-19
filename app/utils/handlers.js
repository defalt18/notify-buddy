import logger from './logger.js'
export default async function executeAsyncSafeStatement(...args) {
	let result, meta
	const [fn, ...fnArgs] = args
	try {
		result = await fn._send(fnArgs)
		meta = { response: 'success', short: 'Request was successful', status: 200 }
	} catch (err) {
		result = err
		logger.log('error', `Request couldn't be processed -\n ${result}`)
		meta = {
			response: 'error',
			details: err.toString(),
			short: 'Service not available',
			status: 500,
		}
	}
	return { result, meta }
}
