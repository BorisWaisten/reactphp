<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'conexion.php';
$objDb = new DbConnect();
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM items";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $items = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($items);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO items(titulo, descripcion, precio, imagen) VALUES(:titulo, :descripcion, :precio, :imagen)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':titulo', $user->titulo);
        $stmt->bindParam(':descripcion', $user->descripcion);
        $stmt->bindParam(':precio', $user->precio);
        $stmt->bindParam(':imagen', $user->imagen); 
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Item creado exitosamente.'];
        } else {
            $response = ['status' => 0, 'message' => 'Error al crear el item.'];
        }
        echo json_encode($response);
        break;

        case "PUT":
            $user = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE items SET titulo = :titulo, descripcion = :descripcion, precio = :precio, imagen = :imagen WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $updated_at = date('Y-m-d');
            
            
            $stmt->bindParam(':id', $user->id);
            $stmt->bindParam(':titulo', $user->titulo);
            $stmt->bindParam(':descripcion', $user->descripcion);
            $stmt->bindParam(':precio', $user->precio);
            $stmt->bindParam(':imagen', $user->imagen);  // Corregido aquí
        
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
            break;
        

    case "DELETE":
        $sql = "DELETE FROM items WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}