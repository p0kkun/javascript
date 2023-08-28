<?php require '../header.php'; ?>
<title>会員登録フォーム</title>
</head>
<body>
    <h2>会員登録フォーム</h2>
    <form method="POST" action="">
        <label>名前: </label>
        <input type="text" name="first_name" required>
        <br>
        <label>姓: </label>
        <input type="text" name="last_name" required>
        <br>
        <label>Email: </label>
        <input type="email" name="email" required>
        <br>
        <label>電話番号: </label>
        <input type="text" name="phone_number">
        <br>
        <input type="submit" name="submit" value="登録">
    </form>
    <?php
    // フォームが送信されたときの処理
    if (isset($_POST['submit'])) {
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];
        $phone_number = $_POST['phone_number'];
        // データベースへの接続
        $pdo = new PDO('mysql:host=localhost;dbname=Hotel;charset=utf8', 'hoteluser', 'password');
        // エラーモードを設定
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            // クエリの実行
            $query = "INSERT INTO Customers (first_name, last_name, email, phone_number)
                      VALUES (:first_name, :last_name, :email, :phone_number)";
            $statement = $pdo->prepare($query);
            $statement->bindParam(':first_name', $first_name);
            $statement->bindParam(':last_name', $last_name);
            $statement->bindParam(':email', $email);
            $statement->bindParam(':phone_number', $phone_number);
            $statement->execute();
            echo "会員登録が成功しました！";
        } catch (PDOException $e) {
            echo "エラー: " . $e->getMessage();
        }
        // データベースの接続を閉じる
        $pdo = null;
    }
    ?>
<?php require '../footer.php'; ?>