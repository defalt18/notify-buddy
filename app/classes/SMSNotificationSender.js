import NotificationSender from './NotificationSender.js'
import twilio from 'twilio'
import getSecretKey from '../secrets/secrets.js'
import _get from 'lodash/get.js'
import { SMSNotificationTemplate } from '../constants/templates.js'

export default class SMSNotificationSender extends NotificationSender {
	constructor() {
		super()
		this.provider = twilio
	}

	_getInstance() {
		return this
	}

	async _connect(params) {
		this.recipient_phone = _get(params, 'body.recipient_phone')
		this.service = this.provider(
			getSecretKey('TWILIO_AC_SID'),
			getSecretKey('TWILIO_TOKEN')
		)
	}

	_synthesizeBody() {
		return `Hi ${this.recipient_phone},\n` + SMSNotificationTemplate.body
	}

	async _send(params) {
		await this._connect(params)
		await this.service.messages.create({
			body: this._synthesizeBody(),
			to: this.recipient_phone,
			from: getSecretKey('TWILIO_PH_FR'),
		})
	}
}
