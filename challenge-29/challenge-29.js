(function () {
	'use strict';

	/*
	Vamos estruturar um pequeno app utilizando módulos.
	Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
	A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
	seguinte forma:
	- No início do arquivo, deverá ter as informações da sua empresa - nome e
	telefone (já vamos ver como isso vai ser feito)
	- Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
	um formulário para cadastro do carro, com os seguintes campos:
	  - Imagem do carro (deverá aceitar uma URL)
	  - Marca / Modelo
	  - Ano
	  - Placa
	  - Cor
	  - e um botão "Cadastrar"

	Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
	carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
	aparecer no final da tabela.

	Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
	empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
	Dê um nome para a empresa e um telefone fictício, preechendo essas informações
	no arquivo company.json que já está criado.

	Essas informações devem ser adicionadas no HTML via Ajax.

	Parte técnica:
	Separe o nosso módulo de DOM criado nas últimas aulas em
	um arquivo DOM.js.

	E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
	que será nomeado de "app".
	*/

	function app() {
		var $empresa = new DOM('[data-js="empresa"]');
		var $telefone = new DOM('[data-js="fone"]');
		var $form = new DOM('form');
		var $imagem = new DOM('[name="image"]');
		var $modelo = new DOM('[name="modelo"]');
		var $ano = new DOM('[name="ano"]');
		var $cor = new DOM('[name="cor"]');
		var $table = new DOM('table');

		var xhr = new XMLHttpRequest();

		function loadCompanyData() {
			xhr.open('GET', './company.json');
			xhr.send();
			xhr.addEventListener('readystatechange', populateCompanyFields, false);
		}

		function populateCompanyFields() {
			if (isRequestOk()) {
				var data = parseData();
				$empresa.get()[0].textContent = data.name;
				$telefone.get()[0].textContent = data.phone;
			}
		}

		function parseData() {
			var result;
			try {
				result = JSON.parse(xhr.responseText);
			} catch (e) {
				result = null;
			}

			return result;
		}

		function isRequestOk() {
			return xhr.readyState === 4 && xhr.status === 200;
		}

		function submitForm(event) {
			event.preventDefault();

			var data = {
				imagem: $imagem.get()[0].value,
				modelo: $modelo.get()[0].value,
				ano: $ano.get()[0].value,
				cor: $cor.get()[0].value
			}

			addItemInTable(data)
		}

		function addItemInTable(data) {
			let tableLine = document.createElement('tr');

			for (let prop in data) {
				let tableColumn = document.createElement('td');
				tableColumn.append(data[prop]);
				tableLine.appendChild(tableColumn);
			}

			$table.get()[0].appendChild(tableLine);
		}

		function initEvents() {
			$form.on('submit', submitForm);
		}

		return {
			init: function init() {
				loadCompanyData();
				initEvents();
			}
		}
	}

	app().init();

})();
