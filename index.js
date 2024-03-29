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
     // const order = agent.context.get('SavetoDB');//เพิ่ม
      const user_input = agent.parameters.user_input;
      const user_name = agent.parameters.user_name;
      const time = new Date();
     // let current_date = admin.database.Timestamp();
       return admin.database().ref("data").push({
        	user_input: user_input,
        	user_name: user_name,
        	Timestamp:' '+time,
         	//TIME :current_date ,
        	status: 'not trained'
            
      });
    }
  function TB(agent){
     // const order = agent.context.get('SavetoDB');//เพิ่ม
      
      
      agent.add('เวลา');
    //  agent.add(`current_date = `+ current_date );
      return admin.database().ref("data").push({
        	
        	Timestamp:'TIME',
        	status: 'not trained'
            
      });
    }
  

   function userInput(agent) {
   let user_input = agent.query;
 //test it
    agent.add(`นี่คือ user_input${user_input}`);
}
  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('SavetoDB - confirm', HandlerSavetoDB);
  intentMap.set('TEST', TB);
  intentMap.set('StoreInput', userInput);
  agent.handleRequest(intentMap);
  
  //fb
//  const { promisify } = require('util');
//let graph = require('fbgraph'); // facebook graph library

//const fbGraph = {
//  get: promisify(graph.get)
//};

/*graph.setAccessToken("EAAvDZBKkHOuoBAMvDoPDAFFP8OHvKOgTBZAE6BSoaIAasJZBMNGWTphiiTZCftXLcRgx2JZAAoSJXZB0BuNMwE6Gz7hEOZBOArr85xLf0qFVZCwnZCdJOVQahxUiiJrUL8ZAbLlSIOTEulL25Wq9UI2ZAED65LPKEtYRGX0Sj35pq5FRwZDZD");  // <--- your facebook page token
graph.setVersion("3.2");
 
// gets profile from facebook
// user must have initiated contact for sender id to be available
// returns: facebook profile object, if any
  
 function getFacebookProfile(agent) {
  return new Promise( (resolve, reject) => {
    let ctx = agent.context.get('generic');
    let fbSenderID = ctx ? ctx.parameters.facebook_sender_id : undefined;
    console.log('FACEBOOK SENDER ID: ' + fbSenderID);
    fbGraph.get( fbSenderID )
      .then( payload => {
        console.log('all fine: ' + payload);
        resolve( payload );
      })
      .catch( err => {
        console.warn( err );
        reject( err );
      });
  });
} */
  
});