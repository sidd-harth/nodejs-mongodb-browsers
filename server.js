var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());

//connecting to mLab
var db = "mongodb://siddharth1:siddharth1@ds125362.mlab.com:25362/testonli2";
//mongodb://<dbuser>:<dbpassword>@ds125362.mlab.com:25362/testonli2
mongoose.connect(db, function(err) {
 if (err) {
  console.log("error!! " + err)
 } else {
  console.log("COnnection Successfull")
 }
})



//defining Schema
var Schema = mongoose.Schema;

var dataSchema = new Schema({
 name: String,
 speed: String,
 user_id: Number
});


//compiling our schema into a Model
var browserModel = mongoose.model('browser', dataSchema);
//A model is a class with which we construct documents.


/**** API Calls Begin Here ****/
app.get('/', function(req, res) {
 res.jsonp(200, {
  "status": "ok",
  "Pod_IP": "HOSTNAME",
  "Pod_IP2222": $HOSTNAME,
  "Pod_name22222": "$PODname",
 "Pod_name": "${PodName}"

});
});

app.get('/status', function(req, res) {
 res.send(200, {  "status": "ok",  "Pod_IP": "HOSTNAME",  "Pod_IP2222": "$HOSTNAME",  "Pod_name22222": "PODname", "Pod_name": "${PodName}"});
}); 

//All Records
app.get('/get', function(req, res) {
 console.log("inside get");
 browserModel.find({}, function(err, browsers) {
  if (err) {
   console.log("browser erropr");
   res.jsonp(err);
  } else {
   console.log("data is " + browsers);
   res.jsonp(browsers);
  }

 });
});


//Insert Data
app.post('/insert', function(req, res) {
 console.log("inside post");

 var newBrowser = new browserModel();

 newBrowser.name = req.body.name,
  newBrowser.speed = req.body.speed;
   newBrowser.user_id = req.body.user_id;

 newBrowser.save(function(err, newInsteredValue) {
  if (err) {
   console.log("insert error");
   res.jsonp(err);
  } else {
   res.json(newInsteredValue)
  }
 })

});


//Update Data - Speed
app.put('/update/:id', function(req, res) {
 console.log("inside put");
 console.log("name is "+req.params.id)
 browserModel.findByIdAndUpdate(
  req.params.id, {
   $set: {
    speed: req.body.speed
   }
  }, {
   new: true
  },
  function(err, updatedBrowser) {
   if (err) {
    console.log("error update")
    res.send("Error Updating!!!")
   } else {
    res.json(updatedBrowser)
   }
  });
});

//Delete Data
app.delete('/delete/:id', function(req, res) {
 console.log("inside delete")
    console.log("name is "+req.params.id)
 browserModel.findByIdAndRemove(req.param.id, {}, function(err, deletedVideo) {
  if (err) {
   res.send("error deleting video")
  } else {
   res.send(deletedVideo)
  }

 })
})

//Get Specific Browser Details
app.get('/specific/:user_id', function(req,res){
    console.log("name is "+req.params.user_id)
    browserModel.findOne({user_id:req.params.user_id}, function(err, browserName){
        if(err){
            console.log("some err");
            res.send("Error in specificbrowser")
        }else{
            console.log("result is "+browserName );
            res.send(browserName);
        }
    })
})




app.listen(8080, function() {
 console.log('Node HTTP server is listening');
});