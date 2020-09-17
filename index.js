
'use strict';
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

admin.initializeApp({
    credential : admin.credential.applicationDefault(),
      databaseURL : 'ws://chatbot-pdbp.firebaseio.com/'
});
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
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
  
    function HandlerReadfromDb(agent){
    return admin.database().ref('data').once('value').then((snapshot) =>  {
          const value = snapshot.child('user_input').val();
          if(value !== null){
              agent.add(`this is value from db ${value}`) ;
          }
        });
    }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('SavetoDB', HandlerSavetoDB);
  intentMap.set('ReadfromDb', HandlerReadfromDb);
  agent.handleRequest(intentMap);
});
