$(document).ready(function () {
   var oldpass="";
   var newpass="";
    var confirmpass="";
    var name="";
    var email="";
    var imageurl="";
    var id="";
    var mobile="";
   
    $.getJSON('http://localhost:3000/Users/2',displayUser);
    function displayUser(data)
    {
        email=data.email;
        name=data.name;
       localStorage.setItem('uemail',email);
       localStorage.setItem('uname',name);
    }
    var uemail=localStorage.getItem('uemail');
    console.log(uemail);
    var uname=localStorage.getItem('uname');
    console.log(uname);
    $('#myname').text(uname);
    $('#myemail').text(uemail);    

 
     $('#submitdata').click(function(){
        
        oldpass = $("#oldpass").val();
        newpass = $("#newpass").val();
        confirmpass = $("#confirmpass").val();
        console.log(oldpass+"  "+newpass+" "+confirmpass);
        $.getJSON('http://localhost:3000/Users/2',finddata);
        
        function finddata(data)
       {
        console.log(data.password);
        var userOldPass=data.password;
        if(oldpass=='' || newpass== '' || confrimpass== '')
        {
            alert('All fields are mendatory');
        }
        else{
        if(oldpass==userOldPass){
           if(newpass=confirmpass)
           {
             var chnagepass={"id":data.id,"name":data.name,"email":data.email,"password": confirmpass}
             var url="http://localhost:3000/Users/"+data.id;
            $.ajax
            ({
              type: "PUT",
              dataType : 'json',
              async: false,
              url: url,
              data:  chnagepass ,
              success: function () {alert("Thanks!"); },
              failure: function() {alert("Error!");}
       
               });
           }        
        }
        else
        {
            alert("old pass is not matching");
        }
    }
}
         
   });

   $('#changedata').click(function(){
    name=$('#newName').val();
    email=$('#newEmail').val();
    mobile=$('#newMobile').val();
    $.getJSON('http://localhost:3000/Users/2',find);


    function find(data)
   {
    console.log(name,email,mobile);
        var chnagepass={"id":data.id,"name":name,"email":email,"password":data.password,"mobile":mobile}
         var url="http://localhost:3000/Users/"+data.id;
        $.ajax
        ({
          type: "PUT",
          dataType : 'json',
          async: false,
          url: url,
          data:  chnagepass ,
          success: function () {alert("Thanks!"); },
          failure: function() {alert("Error!");}
   
           });
        
           $.getJSON('http://localhost:3000/Users/2',displayUser);
           function displayUser(data)
           {
               email=data.email;
               name=data.name;
              localStorage.setItem('uemail',email);
              localStorage.setItem('uname',name);
           }
           var uemail=localStorage.getItem('uemail');
           console.log(uemail);
           var uname=localStorage.getItem('uname');
           console.log(uname);
           $('#myname').text(uname);
           $('#myemail').text(uemail);    
   
    }
   
    });

    
});