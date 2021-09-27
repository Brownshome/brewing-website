<?php

if (!array_key_exists("id", $_GET)) {
	http_response_code(400);
	echo json_encode([ "msg" => "No brew ID provided" ]);
	exit();
}

$brewID = filter_var($_GET["id"], FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE);

if (is_null($brewID)) {
	http_response_code(400);
	echo json_encode([ "msg" => "Brew ID invalid" ]);
	exit();
}

$connection = new mysqli("localhost", "root", "admin", "brewing");
if ($connection->connect_errno != 0) {
	http_response_code(500);
	echo json_encode([ "number" => $connection->connect_errno, "msg" => $connection->connection_error ]);
	exit();
}

$query = $connection->prepare("SELECT * FROM timeseries WHERE id = ? ORDER BY time ASC");
$query->bind_param("i", $brewID);
$query->execute();
$data = $query->get_result();

if (!$data) {
	http_response_code(500);
	echo json_encode([ "number" => $connection->errno, "msg" => $connection->error ]);
	exit();
}

echo json_encode($data->fetch_all(MYSQLI_ASSOC));

?>