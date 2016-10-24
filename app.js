var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var multer=require('multer');
//link mongodb
mongoose.connect('mongodb://127.0.0.1:27017/demodb');
//date Schema
var PersonSchema=new mongoose.Schema({
  name:String,
  age:String,
  comment:String
});
//data modal
mongoose.model('Person',PersonSchema);
var Person=mongoose.model('Person');
// var person=new Person();
// person.name='wx';
// person.age='22';
// person.comment='hahah';
// person.save();
var app=express();
app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());
app.route('/list')
  .get(function(req,res){
      var kw=req.query.keyword;
      console.log(req.query)
      // kw=JSON.parse(kw);
      var query=kw?{$or:[{name:kw},{age:kw},{comment:kw}]}:{};
      Person.find(query,function(err,docs){
        if(err){
          return
        }else{
          res.send(docs);
          res.end();
        }

      });
  }).post(function(req,res){
    var data=req.body;
    console.log(data.name)
    var newperson=new Person();
    newperson.name=data.name;
    newperson.age=data.age;
    newperson.comment=data.comment;
    console.log(newperson);
    newperson.save();
    res.send(req.body)
    res.end('ok')
  })

app.listen(18001,function(){
  console.log('start successful')
})
