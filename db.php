<?php
// criei variaveis de acesso para criar uma conexão com o banco
$host = 'localhost';
$dbname = 'fullcalendar';
$user = 'root';
$pass = '';


try{
    // conexão orientado a objeto
    $db = new PDO("mysql:host=$host;dbname=$dbname",$user,$pass);
    // echo "realizado com sucesso";

}catch(PODException $e){
    echo $e->getMessage();
}
?>