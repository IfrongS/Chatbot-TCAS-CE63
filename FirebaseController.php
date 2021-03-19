<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class FirebaseController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
       /* $factory = (new Factory()) ->withDatabaseUri('https://chatbot-pdbp.firebaseio.com');

        $database = $factory->createDatabase();
        $reference = $database->getReference('data/');
        $snap = $reference ->orderByKey()->getSnapshot();
        $childkey = $database->getReference('data')->getChildKeys();
        //$x='-MW5lOq4CPdClWRgOrmY';
        //$childdata = $database->getReference('data')->getChildDatas();

       /* $newPost = $database
        ->getReference('blog/posts')
        ->push([
        'title' => 'Laravel FireBase Tutorial' ,
        'category' => 'Laravel'
        ]);
        echo '<pre>';
       // print_r($newPost->getvalue());
        echo '<pre>';
        print_r($snap->getvalue());
        print_r($childkey);*/

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( $key)
    {   
       
       
       
        echo($key);
        $factory = (new Factory()) ->withDatabaseUri('https://chatbot-pdbp.firebaseio.com');
        $database = $factory->createDatabase();
        $postData =  ['status' => 'trained'];
        $reference = $database->getReference('data/' .$key)->update($postData);

        return redirect('/');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
