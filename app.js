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
  comment:String,
  visible:Boolean
});
//data modal
mongoose.model('Person',PersonSchema);
var Person=mongoose.model('Person');
var app=express();
app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());
app.route('/list')
  .get(function(req,res){
      var kw=req.query.keyword;
      // kw=JSON.parse(kw);
      var query=kw?{$or:[{name:kw},{age:kw},{comment:kw}],$and:[{visible:true}]}:{visible:true};
      Person.find(query,function(err,docs){
        if(err){
          return
        }else{
          var list=docs.map(function(item,ind,arr){
            return {_id:item._id,name:item.name,age:item.age,comment:item.comment}
          });
          res.send(list.reverse());
          res.end();
        }

      });
  }).post(function(req,res){
    var data=req.body;
    var newperson=new Person();
    newperson.name=data.name;
    newperson.age=data.age;
    newperson.comment=data.comment;
    newperson.visible=true;
    newperson.save();
    res.send(req.body)
    res.end('ok')
  }).put(function(req,res){
    var data=req.body;
    Person.update({_id:data.id},{$set:data.value},function(err){
        if(err){
            return
        }else{
            res.end('ok');
        }
    })
  }).delete(function(req,res){
    var data=req.body;
        Person.update({_id:data.id},{$set:{visible:false}},function(err){
            if(err){
                return
            }else{
                res.end('ok');
            }
        })
  })

app.listen(18001,function(){
  console.log('start successful')
})
