<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <?php use Kreait\Firebase\Factory; ?>

        
        <?php
        function update($key){
                $factory = (new Factory()) ->withDatabaseUri('https://chatbot-pdbp.firebaseio.com');
                $database = $factory->createDatabase();
                $postData =  ['status' => 'trained'];
                $reference = $database->getReference('data/' .$key)->update($postData);

        }

        ?>
        
    </head>
    <body>
        <br>
        <div align="center"><h1> ข้อมูล </h1></div>
        <br>
 <div class="col-md-12 mt-4">
    <div>
    <table class="table">
        <thead class="thead-dark">
            <tr>
             <th scope="col">#</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Status</th>
            <th scope="col">Question</th>
            <th scope="col">Username</th>
            <th scope="col"> </th>
            </tr>
        </thead>
  <tbody>
    <?php
     $factory = (new Factory()) ->withDatabaseUri('https://chatbot-pdbp.firebaseio.com');
     $database = $factory->createDatabase();
     $reference = $database->getReference('data')->getValue();
     $i= 0;
     foreach ($reference as $key => $row) 
        {
         $i++;
     
    ?>
    <tr>
        <th scope="row"><?php echo  $i ?></th>
        <td><?php echo $row['Timestamp']; ?></td>
        <td><?php echo $row['status']; ?></td>
        <td><?php echo $row['user_input']; ?></td>
        <td><?php echo $row['user_name']; ?></td>
        <td><a href="/firebase/token=<?php echo $key ?>" class="btn btn-primary"  > Trained </button></td>
        </tr>
    <?php
        }
    ?>


  </tbody>
</table>

    </div>
</div>


</body>
    
</html>
