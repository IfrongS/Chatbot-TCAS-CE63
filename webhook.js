'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const request = require('request');

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;
  let username = event.message.text;

  request({
    
    url: "https://graph.facebook.com/v8.0/me/messages?access_token=EAAvDZBKkHOuoBADNmfwWxuZBJJJkZBcqcH2VXtXcfx67gAf5CPocGzoAhASh6whmKscC6AW7IVIbD2AKHfz7ipBijuZBvQ5UciLXUdCSD0vk6nPdPOwvHcjIfeemoMLGdYwZAlIZAoEDgZCBkynlIBxZAu3UwdPSaM5BGWUZACTZB69wZDZD",
    //qs: {access_token: EAAvDZBKkHOuoBAByjZC7HNLEdSwoShq6fGz4CQMJfjCs6fyDoO8p59StxM8VS2B2N3zqOGqhpCUZBRDpnY5MOeIHdbOcDZC6OoKqb7XHNlP33yTj6qpX49z1Wzpt41Fa1yDQdIq5JOtKBW7sE23Yv15aTzieTy65YCaEMwFfJAZDZD},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text:"Bot said: " + text }
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error body: ', response.body.error);
    }
  });
}


/* For Facebook Validation */
app.get('/', (req, res) => {
    if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      res.status(403).end();
    }
  });
  

  
  /* Handling all messenges */
  app.post('/', (req, res) => {
    //console.log(req.body);
    if (req.body.object === 'page') {
      req.body.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          if (event.message && event.message.text) {
            //sendMessage(event);
            getName(event);
            //console.log(event.sender.id);
          }
        });
      });
      res.status(200).end();
    }
  });


  function getName(event){
    var sender = event.sender.id
    let token = "EAAvDZBKkHOuoBADNmfwWxuZBJJJkZBcqcH2VXtXcfx67gAf5CPocGzoAhASh6whmKscC6AW7IVIbD2AKHfz7ipBijuZBvQ5UciLXUdCSD0vk6nPdPOwvHcjIfeemoMLGdYwZAlIZAoEDgZCBkynlIBxZAu3UwdPSaM5BGWUZACTZB69wZDZD"
    request({
      url: "https://graph.facebook.com/v8.0/" + sender,
      qs: {
          access_token : token,
          fields: "first_name"
      },
      

      method: "GET",

      json: true,
      time: true
    }, 
    function (error, response, faceUserInfo) {
      console.log("faceUserInfo", faceUserInfo);
      let name = faceUserInfo.first_name
      console.log("Name of User : ", name);
    });
  }
