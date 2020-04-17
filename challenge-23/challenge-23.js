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

    var $display; 
    var $numericButtons;
    var $operationButtons;
    var $clearButton;
    var $resultButton;

    function initializeGlobalVars() {
        $display = document.querySelector('[data-type=display]')
        $numericButtons = document.querySelectorAll('[data-type=numeric]')
        $operationButtons = document.querySelectorAll('[data-type=operation]')
        $clearButton = document.querySelector('[data-type=clear]')
        $resultButton = document.querySelector('[data-type=calculate]')
    }
    
    function setNumberInDisplay(e) {
        if ( $display.value == 0 ) {
            $display.value = e.target.dataset.value
        } else {
            $display.value += e.target.dataset.value
        }
    }

    function setOperationInDisplay(e) {
        removeLastItemIfItIsAnOperator();
        $display.value += e.target.dataset.value;
    }

    function removeLastItemIfItIsAnOperator() {
        var regex = /[-+*\/]$/;

        if ( $display.value.match(regex) ) {
            $display.value = $display.value.replace(regex, '');
        }
    }

    function clearDisplay() {
        $display.value = 0;
    }

    function calculate() {
        removeLastItemIfItIsAnOperator();
        var value = $display.value;
        var priorityOperations = /(\d+)([*\/])(\d+)/
        var otherOperations = /(\d+)([+-])(\d+)/
        
        while( hasPendentOperation(value) ) {
            var match = value.match(priorityOperations) || 
                        value.match(otherOperations)

            if ( match ) {
                var operator = match[2];
                var operands = [match[1], match[3]];

                value = value.replace(match[0], resolveOperation( operands, operator ));
            }
        }

        $display.value = value;
    }

    function resolveOperation( operands, operator ) {

        switch( operator ) {
            case '+':
                return sum(...operands);
            
            case '-':
                return subtraction(...operands);

            case '*':
                return multiply(...operands);

            case '/':
                return division(...operands);
        }
    }

    function hasPendentOperation(value) {
        return !!value.match(/\d+[-+*\/]/)
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

    function initializeButtonsEvents() {
        $numericButtons.forEach(function( btn ) {
            btn.addEventListener('click', setNumberInDisplay, false)
        })

        $operationButtons.forEach(function( btn ) {
            btn.addEventListener('click', setOperationInDisplay, false)
        })

        $clearButton.addEventListener('click', clearDisplay, false)

        $resultButton.addEventListener('click', calculate, false)
    }

    initializeGlobalVars();
    initializeButtonsEvents();

})();