var isTruthy = function(arg) {
    return !!arg
}

console.log(isTruthy('undefined'))

var carro = {
    marca: 'GM',
    modelo: 'Corsa',
    placa: 'IGO6354',
    ano: 1997,
    cor: 'Branca',
    quantasPortas: 4,
    assentos: 5,
    quantidadePessoas: 0,

    mudarCor: function(newCor) { 
        this.cor = newCor 
    },
    obterCor: function() {
        return this.cor
    },
    obterModelo: function() {
        return this.modelo
    },
    obterMarca: function() {
        return this.marca
    },
    obterMarcaModelo: function() {
        return 'Este carro é um ' + this.obterMarca() + ' ' + this.obterModelo()
    },
    adicionarPessoas: function(pessoas) {
        if(this.quantidadePessoas === this.assentos) {
            return 'O carro já está lotado!'
        } else if((this.quantidadePessoas + pessoas) > this.assentos) {
            return 'Só cabem mais ' + (this.assentos - this.quantidadePessoas) + 'pessoas!'
        } else {
            this.quantidadePessoas += pessoas
            return 'Já temos ' + this.quantidadePessoas + 'pessoas no carro!'   
        }
    }

}

console.log(carro.obterCor())
carro.mudarCor('Vermelho')
console.log(carro.obterCor())
carro.mudarCor('Verde Musgo')
console.log(carro.obterCor())
console.log(carro.obterMarcaModelo())
carro.adicionarPessoas(2)
carro.adicionarPessoas(4)
carro.adicionarPessoas(-4)
carro.adicionarPessoas(10)
console.log(carro.quantidadePessoas)
