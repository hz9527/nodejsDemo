var express=require('express');
var app=express();
//static file
app.use(express.static('./file'));
//path method
app.get('/path',function(req,res){
  res.end('get path method\n');
});
app.post('/path',function(req,res){
  res.end('post path method\n');
});
//Router
var Router=express.Router();
app.use('/router',Router);
Router.get('/page1',function(req,res){
  res.end('get router method page1\n')
});
Router.get('/page2',function(req,res){
  res.end('get router method page2\n')
});
Router.post('/page3',function(req,res){
  res.end('post router method page3\n')
});

//route
app.route('/route')
  .get(function(req,res){
    res.end('get route method\n')
  }).post(function(req,res){
    res.end('post route method\n')
  });
//params
app.param('newsId',function(req,res,next,nId){
  req.nId=nId;
  console.log('use params');
  next();
});
app.route('/params/:newsId')
  .get(function(req,res){
    console.log('get')
    res.end('use params'+req.nId+'\n')
  })

app.listen(18001,function(){
  console.log('run express\n')
});
