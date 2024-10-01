document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o calendário ao carregar a página
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Configuração da barra de ferramentas do calendário
        headerToolbar: {
            left: 'prev,next today', // Botões de navegação
            center: 'title',         // Título do calendário
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Visualizações disponíveis
        },
        initialView: 'dayGridMonth', // Visualização inicial: grade mensal
        locale: 'pt-br',             // Idioma: Português do Brasil
        navLinks: true,              // Permite clicar para visualizar dia/semana
        selectable: true,            // Permite selecionar datas
        selectMirror: true,          // Espelha a seleção no calendário
        editable: true,              // Permite arrastar eventos
        dayMaxEvents: true,          // Limite de eventos por dia
        // Ações ao clicar em uma data
        dateClick: function (info) {
            abrirModal(info);        // Chama a função para abrir o modal ao clicar numa data
        },
        // Ações ao clicar em um evento
        eventClick: function (info) {
            abrirModalEditar(info);  // Chama a função para abrir o modal de edição ao clicar num evento
        },
        // Ações ao mover um evento
        eventDrop: function (info) {
            moverEvento(info);       // Chama a função para mover um evento arrastado
        },
        // Carrega os eventos de um arquivo PHP
        events: 'event-list.php',
    });
    calendar.render(); // Renderiza o calendário na página

    // Seleciona o modal para abrir/fechar
    const modal = document.querySelector('.modal-opened');

    // Função para abrir o modal de criação de evento
    const abrirModal = (info) => {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');  // Mostra o modal

            modal.style.transition = 'opacity 300ms'; // Aplica transição

            setTimeout(() => modal.style.opacity = 1, 100); // Mostra o modal com efeito de opacidade
        }
        // Preenche os campos de data e hora no modal
        document.querySelector('#start').value = info.dateStr + " 08:00";
        document.querySelector('#end').value = info.dateStr + " 18:00";
    }

    // Função para abrir o modal de edição de evento
    const abrirModalEditar = (info) => {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');  // Mostra o modal

            modal.style.transition = 'opacity 300ms'; // Aplica transição

            setTimeout(() => modal.style.opacity = 1, 100); // Mostra o modal com efeito de opacidade
        }

        // Converte as datas de início e fim para o formato adequado
        let data_start = [
            info.event.start.toLocaleString().replace(',', '').split(' ')[0].split('/').reverse().join('-'),
            info.event.start.toLocaleString().replace(',', '').split(' ')[1]
        ].join(' ');

        let data_end = [
            info.event.end.toLocaleString().replace(',', '').split(' ')[0].split('/').reverse().join('-'),
            info.event.end.toLocaleString().replace(',', '').split(' ')[1]
        ].join(' ');

        // Preenche os campos do modal com as informações do evento
        document.querySelector('.modal-title h3').innerHTML = 'Editar Evento';
        document.querySelector('#id').value = info.event.id;
        document.querySelector('#title').value = info.event.title;
        document.querySelector('#color').value = info.event.backgroundColor;
        document.querySelector('#start').value = data_start;
        document.querySelector('#end').value = data_end;
        document.querySelector('.btn-delete').classList.remove('hidden'); // Exibe o botão de excluir
    }

    // Função para mover um evento (arrastar para uma nova data)
    const moverEvento = (info) => {
        // Coleta os dados do evento
        let id = info.event.id;
        let title = info.event.title;
        let color = info.event.backgroundColor;
        let start = info.event.startStr.substring(0, 19);
        let end = info.event.endStr.substring(0, 19);

        // Cria um objeto com os dados
        let data = { id, title, color, start, end };

        // Converte o objeto para uma string no formato URL codificada
        let urlEncodedData = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

        console.log(urlEncodedData);

        // Envia os dados via AJAX para o arquivo PHP
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'action-event.php', true);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.send(urlEncodedData);

        // Ação após resposta do servidor
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var data = ajax.responseText;
                // console.log(data); // Pode exibir a resposta se necessário
            }
        }
    }

    // Fecha o modal ao clicar no botão de fechar
    document.querySelector('.modal-close').addEventListener('click', () => fecharModal());

    // Fecha o modal ao clicar fora dele
    modal.addEventListener('click', function (event) {
        if (event.target === this) {
            fecharModal(); // Fecha o modal se o usuário clicar fora da janela do modal
        }
    });

    // Fecha o modal ao pressionar a tecla "Escape"
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            fecharModal(); // Fecha o modal se a tecla "Escape" for pressionada
        }
    });

    // Função para fechar o modal com efeito de opacidade
    const fecharModal = () => {
        if (!modal.classList.contains('hidden')) {
            modal.style.transition = 'opacity 300ms'; // Aplica transição

            setTimeout(() => modal.style.opacity = 0, 100); // Define opacidade 0
            setTimeout(() => modal.classList.add('hidden'), 300); // Esconde o modal após o tempo de transição
        }
    }

    // Validação e envio do formulário para adicionar evento
    let form_add_event = document.querySelector('#form-add-event');

    form_add_event.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o envio padrão

        let title = document.querySelector('#title');
        let start = document.querySelector('#start');

        // Verifica se o título está preenchido
        if (title.value == '') {
            title.style.borderColor = 'red'; // Mostra um erro se o campo estiver vazio
            title.focus();
            return false;
        }
        // Verifica se a data de início está preenchida
        if (start.value == '') {
            start.style.borderColor = 'red'; // Mostra um erro se o campo estiver vazio
            start.focus();
            return false;
        }
        this.submit(); // Se tudo estiver preenchido, envia o formulário
    });

    // Ação de deletar evento
    document.querySelector('.btn-delete').addEventListener('click', function () {
        if (confirm('Você confirma a exclusão do evento? Esta ação não pode ser desfeita.')) {
            document.querySelector('#action').value = 'delete'; // Define a ação de exclusão
            form_add_event.submit(); // Envia o formulário para excluir o evento
            return true;
        }
        return false;
    });
});
