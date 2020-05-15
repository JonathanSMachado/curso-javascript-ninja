'use strict';

function sum(num1, num2) {

	if(!num1 || !num2) {
		return new Error('Por favor, passe dois números por parametro!')
	}

	return num1 + num2
}

module.exports = sum
