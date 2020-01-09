<?php

require("connect.php");
require("_CRUD.php");

$_CRUD = new _CRUD();
$_CRUD->_db = $db;


if ( $_GET['action'] != "" ) {
	$_CRUD->load($_GET['action'], $_POST);
	exit;
}

require("header.php");
// Create button




$_CRUD->сreateButton();
$_CRUD->сreateModal();
$_CRUD->read();





	require("footer.php");
?>



