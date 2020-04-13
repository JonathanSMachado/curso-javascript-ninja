(function () {
    'use strict'

    /*
    Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
    As regras são:
    
    - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
    diretamente;
    - O input deve iniciar com valor zero;
    - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
    - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
    multiplicação(x) e divisão(÷);
    - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
    que irá limpar o input, deixando-o com valor 0;
    
    - A cada número pressionado, o input deve atualizar concatenando cada valor
    digitado, como em uma calculadora real;
    - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
    operação no input. Se o último caractere no input já for um símbolo de alguma
    operação, esse caractere deve ser substituído pelo último pressionado.
    Exemplo:
    - Se o input tem os valores: "1+2+", e for pressionado o botão de
    multiplicação (x), então no input deve aparecer "1+2x".
    - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
    input;
    - Ao pressionar o botão "CE", o input deve ficar zerado.
    */

    var $display = document.querySelector('[data-type=display]')
    var $numericButtons = document.querySelectorAll('[data-type=numeric]')
    var $operationButtons = document.querySelectorAll('[data-type=operation]')
    var $clearButton = document.querySelector('[data-type=clear]')
    var $resultButton = document.querySelector('[data-type=calculate]')

    function setNumberInDisplay(e) {
        if ( $display.value == 0 ) {
            $display.value = e.target.dataset.value
        } else {
            $display.value += e.target.dataset.value
        }
    }

    function setOperationInDisplay(e) {
        var value = e.target.dataset.value;
        var regex = /[-+*\/]$/

        var lastIsOperation = $display.value.match(regex);
        
        if ( lastIsOperation ) {
            $display.value = $display.value.replace(regex, value);
            return;
        }

        $display.value += value;
    }

    function clearDisplay() {
        $display.value = 0;
    }

    function calculate() {
        var valueToCalc = $display.value
        var priorityOperations = /(\d+)([*\/])(\d+)/
        var otherOperations = /(\d+)([+-])(\d+)/

        while( hasPendentOperation(valueToCalc) ) {
            var match = valueToCalc.match(priorityOperations) || 
                        valueToCalc.match(otherOperations)

            if ( match ) {
                switch( match[2] ) {
                    case '+':
                        valueToCalc = valueToCalc.replace(match[0], sum(match[1], match[3]));
                        break;
                    case '-':
                        valueToCalc = valueToCalc.replace(match[0], subtraction(match[1], match[3]));
                        break;
                    case '*':
                        valueToCalc = valueToCalc.replace(match[0], multiply(match[1], match[3]));
                        break;
                    case '/':
                        valueToCalc = valueToCalc.replace(match[0], division(match[1], match[3]));
                        break;
                }
            }
        }

        $display.value = valueToCalc;
    }

    function hasPendentOperation(value) {
        return !!value.match(/[-+*\/]/)
    }
    
    function sum(n1, n2) {
        return (+n1) + (+n2)
    }

    function subtraction(n1, n2) {
        return (+n1) - (+n2)
    }

    function multiply(n1, n2) {
        return (+n1) * (+n2)
    }

    function division(n1, n2) {
        return (+n2) === 0 ? 0 : (+n1) / (+n2)
    }

    $numericButtons.forEach(function( btn ) {
        btn.addEventListener('click', setNumberInDisplay, false)
    })

    $operationButtons.forEach(function( btn ) {
        btn.addEventListener('click', setOperationInDisplay, false)
    })

    $clearButton.addEventListener('click', clearDisplay, false)

    $resultButton.addEventListener('click', calculate, false)

})();