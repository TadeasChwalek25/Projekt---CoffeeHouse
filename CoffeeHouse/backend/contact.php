<?php
// 1. Nastavení – kam se má e-mail odeslat
$admin_email = "info@coffeehouse.com";
$subject = "Nová zpráva z webu CoffeeHouse";

// 2. Kontrola, zda byla data odeslána metodou POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Získání a pročištění dat z formuláře (ochrana proti XSS)
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    // 3. Jednoduchá validace
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Prosím, vyplňte všechna pole správně.";
        exit;
    }

    // 4. Sestavení obsahu e-mailu
    $email_content = "Jméno: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Zpráva:\n$message\n";

    // 5. Hlavičky e-mailu
    $headers = "From: $name <$email>";

    // 6. Odeslání e-mailu (funkce mail() vyžaduje nastavený server)
if (@mail($admin_email, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo "Zpráva byla úspěšně odeslána!";
} else {
    if ($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_ADDR'] == '127.0.0.1') {
        http_response_code(200);
        echo "Testovací režim: Data byla přijata v pořádku.";
    } else {
        http_response_code(500);
        echo "Omlouváme se, zprávu se nepodařilo odeslat.";
    }
}
}
