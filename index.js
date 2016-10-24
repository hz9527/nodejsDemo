//small jq
function $(selector){
  return document.querySelector(selector);
}
HTMLElement.prototype.val=function(){
  return this.value;
}
HTMLElement.prototype.html=function(v){
  this.innerHTML=v;
  return this
};
HTMLElement.prototype.removeAttr=function(attr){
  this.removeAttribute(attr);
  return this
}

$('#form').onsubmit=function(e){
  console.log(1)
  e.preventDefault();
  $('#name').disabled='disabled';
  $('#age').disabled='disabled';
  $('#comment').disabled='disabled';
  var data={
    name:$('#name').val(),
    age:$('#age').val(),
    comment:$('#comment').val()
  }
  var xhr=getXHR();
  xhr.open('POST','http://127.0.0.1:18001/list');
  xhr.setRequestHeader('Content-Type','application/json');
  console.log(JSON.stringify(data))
  xhr.send(JSON.stringify(data));
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      $('#name').removeAttr('disabled');
      $('#age').removeAttr('disabled');
      $('#comment').removeAttr('disabled');
      alert('save successful');
    }
  }
}
$("#sbtn").onclick=function(){
  var kw=$('#search').val();
  var xhr=getXHR();
  xhr.open('get','http://127.0.0.1:18001/list?keyword='+kw);
  xhr.send(null);
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      renderList(JSON.parse(xhr.responseText));
    }
  }
}
init();
function init(){
  var xhr=getXHR();
  xhr.open('get','http://127.0.0.1:18001/list');
  xhr.send(null);
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      console.log(xhr.responseText);
      renderList(JSON.parse(xhr.responseText));
    }
  }
}
function renderList(list){
  var List=list.map(function(item,ind,arr){
    return ('<span class="item">name: '+item.name+'</span><span class="item">age: '+item.age+'</span><span class="com">comment: '+item.comment+'</span>')
  })
  List=List.join('</li><li>');
  List='<li>'+List+'</li>';
  $('.list').html(List);
}
//get xhr
function getXHR(){
  var xhr=null;
  if(XMLHttpRequest){
    xhr=new XMLHttpRequest();
  }else{
    xhr=new ActiveXObject('Microsoft.XMLHttp');
  }
  return xhr
}
