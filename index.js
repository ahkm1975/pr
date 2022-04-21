const { PeerServer } = require('peer');

var connectionArray = new Array();

const peerServer = PeerServer({ host: 'localhost', port: 999, path: '/myapp', key: 'yt', allow_discovery: true });

function makeUserListMessage() {
  var userListMsg = {
    type: "userlist",
    users: []
  };
  var i;
  for (i=0; i<connectionArray.length; i++) {
    userListMsg.users.push(connectionArray[i].id);
  }
  return userListMsg;
}

function sendUserListToAll() {
  var userListMsg = makeUserListMessage();
  var userListMsgStr = JSON.stringify(userListMsg);
  var i;
  for (i=0; i<connectionArray.length; i++) {
    connectionArray[i].send(userListMsgStr);
  }
}

peerServer.on('connection', (client) => { connectionArray.push(client); sendUserListToAll(); });

peerServer.on('disconnect', (client) => { console.log(client.id); });
