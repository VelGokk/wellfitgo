<?php
// lead.php
// [OK] Guarda leads en MySQL (DonWeb) de forma segura

// Configuración de la base de datos (ajusta estos valores con los de tu panel DonWeb)
$host = 'localhost';
$db   = 'TU_BASE_DE_DATOS';
$user = 'TU_USUARIO';
$pass = 'TU_PASSWORD';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';
    $origen = $_POST['origen'] ?? '';
    $fecha = date('Y-m-d H:i:s');

    if (!$nombre || !$email) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios']);
        exit;
    }

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        $stmt = $pdo->prepare('INSERT INTO leads (nombre, email, mensaje, origen, fecha) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$nombre, $email, $mensaje, $origen, $fecha]);
        echo json_encode(['success' => true, 'message' => 'Lead guardado correctamente']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
