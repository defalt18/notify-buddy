export default class Route {
	constructor(method, path, callback) {
		this.path = path
		this.callback = callback
		this.method = method
	}

	_getRouteConfig() {
		return [this.path, this.callback]
	}
}
