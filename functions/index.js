const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

exports.getCollections = functions.https.onCall((data,context) => {
    const uid = context.auth.uid;
    let sfRef = db.collection('MESSAGE').doc(uid);
    console.log(uid);
    var users = [];
    return sfRef.listCollections().then(collections => {
        collections.forEach(collection => {
            users.push(collection.id);
        });
        return {
          'users': users
        }
    });
  });


  exports.hello = functions.https.onRequest(async (req, res) => {
    res.send("Hello user!");
  });