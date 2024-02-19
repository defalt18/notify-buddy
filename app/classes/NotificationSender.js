/*
	@abstract
*/

export default class NotificationSender {
	constructor() {
		if (this.constructor === NotificationSender) {
			throw new Error("Abstract classes can't be instantiated.")
		}
	}

	// eslint-disable-next-line
	async _connect() {
		throw new Error("Method '_connect()' must be implemented.")
	}
	// eslint-disable-next-line
	async _send() {
		throw new Error("Method '_send()' must be implemented.")
	}

	_getInstance() {
		return this
	}
}
