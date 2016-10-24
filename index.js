//small jq
function $(selector){
  return document.querySelector(selector);
}
HTMLElement.prototype.val=function(v){
  var value=v;
  if(v||v===0||v===''){
    this.value=v;
  }else{
    value=this.value
  }
  return value;
}
HTMLElement.prototype.html=function(v){
  var value=v;
  if(v||v===0||v===''){
    this.innerHTML=v;
  }else{
    value=this.innerHTML;
  }
  return value
};
HTMLElement.prototype.removeAttr=function(attr){
  this.removeAttribute(attr);
  return this
};
HTMLElement.prototype.css=function(n,v){
  this.style[n]=v;
  return this
}

$('#form').onsubmit=function(e){
  e.preventDefault();
  $('#name').disabled='disabled';
  $('#age').disabled='disabled';
  $('#comment').disabled='disabled';
  var data={
    name:$('#name').val().trim(),
    age:$('#age').val().trim(),
    comment:$('#comment').val().trim()
  }
  var xhr=getXHR();
  xhr.open('POST','http://127.0.0.1:18001/list');
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(JSON.stringify(data));
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      $('#name').removeAttr('disabled').val('');
      $('#age').removeAttr('disabled').val('');
      $('#comment').removeAttr('disabled').val('');
      alert('save successful');
      init();
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
$('b.close').onclick=function(){
  $('.modal').css('display','none');
}
$('ul.list').onclick=function(e){
  var target=e.target;
  var li;
  if(target.nodeName=='LI'||target.nodeName=='SPAN'){
    li=target.nodeName=='LI'?target:target.parentNode;
    liId=li.id;
    $('#cname').val(li.querySelectorAll('.item')[0].html().slice(6));
    $('#cage').val(li.querySelectorAll('.item')[1].html().slice(5));
    $('#ccomment').val(li.querySelector('.com').html().slice(9))
    $('.modal').css('display','block');
  }
  if(target.nodeName=='BUTTON'){
    li=target.parentNode;
    liId=li.id;
    removeLi(liId);
  }
}
var liId;
//update
$('#cform').onsubmit=function(e){
  e.preventDefault();
    $('#cname').disabled='disabled';
    $('#cage').disabled='disabled';
    $('#ccomment').disabled='disabled';
    var data={
      id:liId,
      value:{
        name:$('#cname').val().trim(),
        age:$('#cage').val().trim(),
        comment:$('#ccomment').val().trim()
      }
    }
    var xhr=getXHR();
    xhr.open('PUT','http://127.0.0.1:18001/list');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
        $('#cname').removeAttr('disabled').val('');
        $('#cage').removeAttr('disabled').val('');
        $('#ccomment').removeAttr('disabled').val('');
        $('.modal').css('display','none');
        init();
      }
    }
}
//delete
function removeLi(lId){
  var xhr=getXHR();
  xhr.open('delete','http://127.0.0.1:18001/list');
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(JSON.stringify({"id":lId}));
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      alert('success');
      init();
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
      renderList(JSON.parse(xhr.responseText));
    }
  }
}
function renderList(list){
  var List=list.map(function(item,ind,arr){
    return ('<li id="'+item._id+'"><span class="item">name: '+item.name+
    '</span><span class="item">age: '
    +item.age+'</span><span class="com">comment: '+item.comment+'</span>'
    +'<button>delete</button></li>'
    )
  });
  $('.list').html(List.join(""));
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
