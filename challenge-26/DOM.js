(function () {
    'use strict'

    function DOM(elements) {
        this.elements = document.querySelectorAll(elements)
    }

    DOM.prototype.on = function (event, action) {
        this.elements.forEach(function(element) {
            element.addEventListener(event, action)
        })
    }

    DOM.prototype.off = function (event) {
        this.elements.forEach(function(element) {
            element.removeEventListner(event)
        })
    }

    DOM.prototype.get = function () {
        return this.elements
    }

    window.DOM = window.DOM || DOM

})()