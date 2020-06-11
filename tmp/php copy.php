<?php

require_once 'config' . DIRECTORY_SEPARATOR . 'bdd.php';


if($_GET){

  if($_GET['action'] === 'setEssai'){
    // récupération du nombre mystère
    $req = $pdo->prepare('SELECT nbMystere FROM jeu WHERE id = 1');
    $req->execute();
    $data = $req->fetch();
    
    echo json_encode($data);
  }

  
  elseif($_GET['action'] === 'setNbCoup'){
    // récupération du nombre de coup
    $req = $pdo->prepare('SELECT nbCoup FROM jeu WHERE id = 1');
    $req->execute();
    $data = $req->fetch();

    // incrémentation du nombre de coup et update bdd
    $nbCoup = $data['nbCoup'] + 1;
    $req = $pdo->prepare('UPDATE jeu SET nbCoup = :nbCoup WHERE id = 1');
    $req->execute(['nbCoup' => $nbCoup]);

    echo json_encode($data);
  }

  elseif($_GET['action'] === 'setNbMystere'){
    // update du nouveau nombre mystere
    $_POST = json_decode(file_get_contents('php://input'), true);
    $req = $pdo->prepare('UPDATE jeu SET nbMystere = :nombre WHERE id = 1');
    $req->execute(['nombre' => $_POST['nbMystere']]);

    // raz du nonmbre de coup
    $req = $pdo->prepare('UPDATE jeu SET nbCoup = 1 WHERE id = 1');
    $req->execute();
  }


  
   // elseif($_GET['action'] === 'setLike'){
  //   $req = $pdo->prepare('SELECT * FROM  jeu WHERE id = 1');
  //   $req->execute();
  //   $data = $req->fetch();

  //   $nombreUpdate = $data['nombre'] + 1;

  //   $req = $pdo->prepare('UPDATE  jeu SET nombre = :nombre WHERE id = 1');
  //   $req->execute(['nombre' => $nombreUpdate]);

  //   echo json_encode($nombreUpdate);
  // }
}






