const router = require('express').Router();
const admin = require('firebase-admin');

// Initialize firebase app and firestore
let serviceAccount = require('./ServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

// express route
router.get('/', function (req, res) {

  var searchMerchantName = req.query.merchant
  var data = new Array();

  console.log("Merchant name: " + searchMerchantName)

  if(searchMerchantName == "A W") {
    searchMerchantName = "A&W"
  }

  searchMerchantName = searchMerchantName.toLowerCase()

  // if merchant name query is blank then list all
  // else, list specific only
  if (searchMerchantName == 'undefined' || searchMerchantName == '') {
    console.log("List all")
    db.collection('merchant_collection').get().then((snapshot) => {

        snapshot.forEach(doc => {
          const company_name = doc.data().company_name
          const location = doc.data().location
          const _id = doc.id
          data.push({company_name: company_name, location: location, _id: _id})
        });

        // To debug in localhost different port, set below to allow CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

  } else {
    console.log("List specific")

    db.collection('merchant_collection').get().then((snapshot) => {

        snapshot.forEach(doc => {
          const company_name = doc.data().company_name

          if (company_name.toLowerCase() == searchMerchantName || company_name.toLowerCase().includes(searchMerchantName)) {
            const location = doc.data().location
            const _id = doc.id
            data.push({company_name: company_name, location: location, _id: _id})
          }
        });

        // To debug in localhost different port, set below to allow CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }
});


module.exports = router