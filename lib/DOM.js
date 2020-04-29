(function () {
	'use strict'

	function DOM(elements) {
		if (!this instanceof DOM) {
			return new DOM(elements);
		}

		this.elements = document.querySelectorAll(elements);
		// if( this.elements.length === 1 ) {
		//   return this.get();
		// }
	}

	DOM.prototype.on = function (event, action) {
		this.elements.forEach(function (element) {
			element.addEventListener(event, action, false)
		})
	}

	DOM.prototype.off = function (event, action) {
		this.elements.forEach(function (element, action) {
			element.removeEventListner(event, action, false)
		})
	}

	DOM.prototype.get = function (index) {
		// if( !index ) {
		//   return this.elements[0];
		// }
		// return this.elements[index];

		return this.elements;
	}

	DOM.prototype.map = function (callback) {
		if (typeof callback !== 'function') {
			throw new Error('Parâmetro deve ser uma função!!!')
		}

		const self = this.elements
		const mapped = []

		self.forEach(function (element, key) {
			mapped.push(callback(element, key, self))
		})

		return mapped
	}

	DOM.prototype.filter = function (callback) {
		if (typeof callback !== 'function') {
			throw new Error('Parâmetro deve ser uma função!!!')
		}

		const self = this.elements
		const filtered = []

		self.forEach(function (element, key) {
			if (callback(element, key, self)) {
				filtered.push(element)
			}
		})

		return filtered
	}

	DOM.prototype.reduce = function (callback, initialValue = null) {
		if (typeof callback !== 'function') {
			throw new Error('Parâmetro deve ser uma função!!!')
		}

		const self = this.elements
		let reduced = initialValue

		self.forEach(function (element, key) {
			reduced = callback(reduced, element, key, self)
		})

		return reduced
	}

	DOM.prototype.reduceRight = function (callback, initialValue = null) {
		if (typeof callback !== 'function') {
			throw new Error('Parâmetro deve ser uma função!!!')
		}

		const self = this.elements
		let reduced = initialValue

		for (let i = self.length - 1; i >= 0; i--) {
			reduced = callback(reduced, self[i], key, self)
		}

		return reduced
	}

	DOM.prototype.every = function (callback) {
		if (typeof callback !== 'function') {
			throw new Error('Parâmetro deve ser uma função!!!')
		}

		let every = true

		this.elements.forEach(function (element) {
			if (!callback(element)) {
				every = false
				return
			}
		})

		return every
	}

	DOM.prototype.some = function (callback) {
		if (typeof callback !== 'function') {
			throw new Error('Parâmetro deve ser uma função!!!')
		}

		let some = false
		this.elements.forEach(function (element) {
			if (callback(element)) {
				some = true
				return
			}
		})

		return some
	}

	DOM.isArray = function (array) {
		return Array.isArray(array)
	}

	DOM.isFunction = function (func) {
		return typeof func === 'function'
	}

	DOM.isNumber = function (number) {
		return typeof number === 'number'
	}

	DOM.isObject = function (obj) {
		return typeof obj === 'object'
	}

	DOM.isString = function (string) {
		return typeof string === 'string'
	}

	DOM.isBoolean = function (bool) {
		return typeof bool === 'boolean'
	}

	DOM.isNull = function (param) {
		return param === null || param === 'undefined'
	}

	window.DOM = window.DOM || DOM

})();
