<?php

$connection = new mysqli("localhost", "root", "admin", "brewing");

if ($connection->connect_errno != 0) {
	http_response_code(500);
	echo json_encode([ "number" => $connection->connect_errno, "msg" => $connection->connection_error ]);
	exit();
}

$brews = $connection->query("SELECT * FROM brews");

if (!$brews) {
	http_response_code(500);
	echo json_encode([ "number" => $connection->errno, "msg" => $connection->error ]);
	exit();
}

echo json_encode($brews->fetch_all(MYSQLI_ASSOC));

?>