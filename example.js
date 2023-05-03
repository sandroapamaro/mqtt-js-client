

// Your MQQT credentials
const options = {
  username: 'orama_mqqt',
  password: 'Orama@140872@',
};

// Connect to your cluster, insert your host name and port
const client = window.mqtt.connect('wss://c57076b3d243460c8bda8a9f5d427c4e.s2.eu.hivemq.cloud:8884/mqtt', options);

//Register all MQQT Client Events

// Run always receive a message
client.on('message', function(topic, message) {
  appendText("topic " + topic + " receive: " + String.fromCharCode.apply(null, message)); // need to convert the byte array to string
});

// Confirm that the connection worked
client.on('connect', () => {
  appendText('Connected!');
});

// Prints an message on error
client.on('error', (error) => {
  appendText('Error:', error);
});

// Inform if connection is lost
client.on('offline', function () {
  appendText('lost connection!')
})


// Actions: subscribe and publish one text message to the same topic

// Subscribe topic - Waiting for messages
client.subscribe('mqttjs/demo');


// Publish text inserted in page in the same topic
function sendMessage() {

  let message = document.getElementById('message');
  //Publish options 
  const pubOptions = {
    qos: 2,
    retain: true
  }
  // Publish message on QOS 2 and retain it
  client.publish('mqttjs/demo', message.value, pubOptions);

}

// Only for print text in html page
function appendText(text) {

  const node = document.createElement("p");
  const textnode = document.createTextNode( (new Date()).toLocaleTimeString()  + " - " + text);
  node.appendChild(textnode);
  document.body.appendChild(node);

}