const expect = require('chai').expect
const sum = require('../src/sum')

describe('# SUM Module', function() {
	it('should SUM to be a function', function () {
		expect(sum).to.be.a('function');
	});

	it('should SUM 1 and 9 return 10', function () {
		expect(sum(1, 9)).to.be.equal(10)
	});

	it('should SUM 4 and 5 return 9', function() {
		expect(sum(4, 5)).to.be.equal(9)
	})

	it('should SUM return an error if received just one parameter', function () {
		expect(sum(1)).to.be.an('error')
	});
})
