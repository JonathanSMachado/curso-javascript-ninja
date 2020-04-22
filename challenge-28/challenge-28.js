(function(){
  'use strict';

  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  var $form;
  var $cep;
  var xhr;

  var $logradouro
  var $estado
  var $cidade
  var $bairro
  var $cepField

  function cepSanitize() {
    return $cep.get()[0].value.replace(/\D+/, '')
  }

  function replaceCepInString(string) {
    return string.replace('[CEP]', cepSanitize())
  }

  function getMessage(key) {
    var messages = {
      'ok': replaceCepInString('Endereço referente ao CEP [CEP]:\n'),
      'error': replaceCepInString('Nao encontramos o endereço para o CEP [CEP].'),
      'loading': replaceCepInString('Buscando informaçoes para o CEP [CEP]'),
    }

    return messages[key]
  }

  function formSubmit(event) {
    event.preventDefault()
    xhr.set
    xhr.open(
      'GET', 
      replaceCepInString('https://cors-anywhere.herokuapp.com/http://apps.widenet.com.br/busca-cep/api/cep.json?code=[CEP]')
    )
    xhr.send(null)
    getMessage('loading')
  }

  function handleRepsonse() {
    if( isRequestOK() ) {
      getMessage('ok')

      try {
        fillDataOnFields(JSON.parse(xhr.responseText))
      } catch (e) {
        getMessage('error')
        clearAllFields()
      }
    }
  }

  function clearAllFields() {
    var $inputs = document.querySelectorAll('.info input')

    $inputs.forEach(function(input){
      input.textContent = ''
    })
  }

  function fillDataOnFields(data) {
    $bairro.get()[0].textContent = data.bairro
    $cidade.get()[0].textContent = data.cidade
    $estado.get()[0].textContent = data.estado
    $logradouro.get()[0].textContent = data.logradouro
    $cepField.get()[0].textContent = data.cep

  }

  function isRequestOK() {
    return xhr.readyState === 4 && xhr.status === 200
  }

  function initEvents() {
    $form.get()[0].addEventListener('submit', formSubmit, false)
    xhr.addEventListener('readystatechange', handleRepsonse, false)
  }

  function initVariables() {
    $form = new DOM('form')
    $cep = new DOM('input[name="cep"]')
    xhr = new XMLHttpRequest()

    $bairro = new DOM('[data-js="bairro"]')
    $estado = new DOM('[data-js="estado"]')
    $cidade = new DOM('[data-js="cidade"]')
    $logradouro = new DOM('[data-js="logradouro"]')
    $cepField = new DOM('[data-js="cep"]')
    initEvents()
  }

  initVariables()

})()
