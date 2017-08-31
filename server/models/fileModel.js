var mongoose = require('mongoose');
// mongoose.connect('mongodb://group5:hackti8@cluster0-shard-00-00-wlsqh.mongodb.net:27017,cluster0-shard-00-01-wlsqh.mongodb.net:27017,cluster0-shard-00-02-wlsqh.mongodb.net:27017/rapid-share-clone?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var Schema = mongoose.Schema;

var FileSchema = new Schema({
  fileName: String,
  url: String,
  uploadDate: Date
})

var fileModels = mongoose.model('File', FileSchema);

module.exports = fileModels;
