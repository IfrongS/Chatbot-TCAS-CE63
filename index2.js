'use strict';
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const db = admin.firestore();
//admin.initializeApp();
admin.initializeApp({
		credential : admin.credential.applicationDefault(),
  		databaseURL : 'ws://chatbot-pdbp.firebaseio.com/'
});
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  const request = require('request');

  request({
    
    url: "https://graph.facebook.com/v8.0/me/messages?access_token=EAAvDZBKkHOuoBADNmfwWxuZBJJJkZBcqcH2VXtXcfx67gAf5CPocGzoAhASh6whmKscC6AW7IVIbD2AKHfz7ipBijuZBvQ5UciLXUdCSD0vk6nPdPOwvHcjIfeemoMLGdYwZAlIZAoEDgZCBkynlIBxZAu3UwdPSaM5BGWUZACTZB69wZDZD",
    //qs: {access_token: EAAvDZBKkHOuoBAByjZC7HNLEdSwoShq6fGz4CQMJfjCs6fyDoO8p59StxM8VS2B2N3zqOGqhpCUZBRDpnY5MOeIHdbOcDZC6OoKqb7XHNlP33yTj6qpX49z1Wzpt41Fa1yDQdIq5JOtKBW7sE23Yv15aTzieTy65YCaEMwFfJAZDZD},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text:"Bot said: Hello " + text }
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error body: ', response.body.error);
    }
  });

 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
	function HandlerSavetoDB(agent){
      const text = agent.parameters.text;
      return admin.database().ref('data').set({
        	user_name: 'user1',
        	user_input:text
      });
    }
  
 function getNameHandler(agent) {
    let user_input = agent.parameters.user_input ;
    db.collection("user").add({ user_input:  user_input });
  }

   function userInput(agent) {
   let user_input = agent.query;
 //test it
    agent.add(`นี่คือ user_input${user_input}`);
}
  
  let intentMap = new Map();
  intentMap.set('SavetoDB', getNameHandler);
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  //intentMap.set('SavetoDB', HandlerSavetoDB);
	agent.handleRequest(intentMap);
  });