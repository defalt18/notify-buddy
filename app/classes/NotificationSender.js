/*
	@abstract
*/
export default class NotificationSender {
	constructor() {
		if (this.constructor === NotificationSender) {
			throw new Error("Can't instantiate an abstract class")
		}
	}

	// eslint-disable-next-line
	async _connect() {}
	// eslint-disable-next-line
	async _send() {}
}
