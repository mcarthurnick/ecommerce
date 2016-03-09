var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var port = 3000;
var Schema = mongoose.Schema;

var app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.set("debug", true);
mongoose.connect('mongodb://localhost/ecommerce');
mongoose.connection.once("open", function() {
  console.log("Connected to MongoDB");
});

var productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  description: {type: String, required: true},
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

var Product = mongoose.model("Product", productSchema);


app.post('/api/products', function(req, res, next) {
  var product = new Product(req.body);
  product.save(function(err, s) {
    return err ? res.status(500).send(err) : res.send(s);
  });
}),

app.get('/api/products', function(req, res, next) {
  console.log("Fetching sighting:", req.query);
  res.send(req.query);
}),

app.get('/api/products/:id', function(req, res, next) {
  console.log('Connect to GetId!');
  res.send(200).json();
}),

app.put('/api/products/:id', function(req, res, next) {
  console.log('Connected to Put!');
  res.send(200).json();
}),

app.delete('/api/products/:id', function(req, res, next) {
  console.log('Connected to Delete!');
  res.send(200).json();
});















app.listen(port, function() {
  console.log('Listening to port ', port );
});
