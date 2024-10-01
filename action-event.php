<?php
session_start(); // Inicia a sessão
include_once 'db.php'; // Inclui o arquivo de conexão ao banco de dados

// Obtém os dados do formulário enviados via POST
$dados = filter_input_array(INPUT_POST);

// Verifica se a ação é de exclusão
if (!empty($dados['action']) && $dados['action'] === 'delete') {
    // Prepara a consulta para excluir um evento pelo ID
    $sql = $db->prepare("DELETE FROM events WHERE id = :id");
    $sql->bindValue(":id", $dados['id']);
    
    // Executa a consulta e verifica se foi bem-sucedida
    if (!$sql->execute()) {
        $_SESSION['msg'] = "<p class='alert-danger'>Erro! Evento não existe ou já foi deletado.</p>";
        header('Location: index.php'); // Redireciona para a página inicial
        exit; // Encerra o script
    }
    
    $_SESSION['msg'] = "<p class='alert-success'>Sucesso! Evento excluído.</p>";
    header('Location: index.php'); // Redireciona para a página inicial
    exit; // Encerra o script
}

// Remove a chave 'action' do array de dados
unset($dados['action']);

// Valida se a data de início é anterior à data de fim
if ($dados['start'] >= $dados['end']) {
    $_SESSION['msg'] = "<p class='alert-danger'>Erro! Preencha as datas corretamente e tente novamente.</p>";
    header('Location: index.php'); // Redireciona para a página inicial
    exit; // Encerra o script
}

// Define campos obrigatórios e suas traduções
$required = ['title', 'color', 'start'];
$translate = [
    'title' => 'Nome do Evento',
    'color' => 'Cor',
    'start' => 'Início do Evento',
];

// Verifica se os campos obrigatórios estão preenchidos
foreach ($dados as $key => $value) {
    if (in_array($key, $required) && empty($value)) {
        $_SESSION['msg'] = "<p class='alert-danger'>Erro! O campo " . $translate[$key] . " é obrigatório.</p>";
        header('Location: index.php'); // Redireciona para a página inicial
        exit; // Encerra o script
    }

    // Prepara os campos para atualização no banco
    $set[] = $key . ' = :' . $key;
}
$set = implode(', ', $set); // Junta os campos em uma string

// Se não houver ID, insere um novo evento
if (!$dados['id']) {
    $sql = $db->prepare("INSERT INTO events SET $set");
    
    // Associa os valores aos campos correspondentes
    foreach ($dados as $key => $value) {
        $sql->bindValue(":" . $key, $value);
    }
    
    $sql->execute(); // Executa a inserção
    $_SESSION['msg'] = "<p class='alert-success'>Sucesso! Evento salvo.</p>";
    header('Location: index.php'); // Redireciona para a página inicial
    exit; // Encerra o script
} else {
    // Se houver ID, atualiza o evento existente
    $sql = $db->prepare("UPDATE events SET $set WHERE id = :id");
    
    // Associa os valores aos campos correspondentes
    foreach ($dados as $key => $value) {
        $sql->bindValue(":" . $key, $value);
    }
    
    $sql->execute(); // Executa a atualização
    $_SESSION['msg'] = "<p class='alert-success'>Sucesso! Evento alterado.</p>";
    header('Location: index.php'); // Redireciona para a página inicial
    exit; // Encerra o script
}
?>
