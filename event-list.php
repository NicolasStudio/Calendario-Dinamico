<?php
session_start(); // Inicia a sessão
include_once "db.php"; // Inclui o arquivo de conexão ao banco de dados

// Executa uma consulta SQL para selecionar os eventos
$sql = $db->query("SELECT id, title, color, start, end FROM events");
$events = $sql->fetchAll(); // Obtém todos os eventos

$evs = []; // Array para armazenar os eventos formatados
foreach($events as $event) {
    extract($event); // Extrai as variáveis do array $event

    // Adiciona os dados do evento ao array $evs
    $evs[] = [
        'id' => $id,
        'title' => $title, // Correção do campo 'tilte' para 'title'
        'color' => $color,
        'start' => $start,
        'end' => $end,
    ];
}

// Retorna os eventos como JSON
echo json_encode($evs);
?>
