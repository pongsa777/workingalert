$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("groupid");
    
    
    //ดึงคน pending มาโชว์
    var url = 'http://workingalert.tk/api/getmemberingroup.php?type=app&sessionid='+sessionid+'&groupid='+groupid;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            //loop get pending user
            if(data.pending.length != 0 ){
                for (var i = 0; i < data.pending.length ; i++) { 
                    var id = data.pending[i].id;
                    var role_id =data.pending[i].role_id;
                    var email = data.pending[i].email;
                    var name = data.pending[i].firstname+' '+data.pending[i].lastname;
                    var nickname = data.pending[i].nickname;
                    var phone = data.pending[i].phone;
                    var pict = data.pending[i].picture;
                    if(pict == null || pict == "null"){
                        pict = "img/user-a.png";
                    }
                    
                    var li = document.createElement('li');
                    
                    li.className = 'list-group-item';
                    li.setAttribute("id", "litop_id"+i);
                    li.innerHTML = '<img src="'+pict+'" class="img-circle pic-size">'
                                        +'<h5 class="name2">'+name+'</h5>'
                                        +'<input type="hidden" id="userid'+i+'" value="'+id+'">'
                                        +'<div class="padbtn-left">'
                                            +'<button type="button" class="btn btn-primary btn-xs accept '+i+'"><b>Accept</b></button>'
                                            +'<button type="button" class="btn btn-default btn-xs notnow '+i+'"><b>Not Now</b></button>'
                                        +'</div>';
                    
                    document.getElementById('listpending').appendChild(li); 
                }
            }else{
                //ไม่มี pending user เลย
            }
        }else{
            alert('server problems please try to reload this page again');
        }
    }); //close get api
    
    
    //search btn event
    $(document).on("click", "#searchbtn", function () {
        var searchmsg = document.getElementById('searchmsg').value;
        var groupid = localStorage.getItem("groupid");
        if(searchmsg==""){
            alert('plese input username or email');
        }else{
            var url = 'http://workingalert.tk/api/searchmember.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg+'&groupid='+groupid;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    for (var j = 0; j < data.result.length ; j++) {
                        var id = data.result[j].id;
                        var email = data.result[j].email;
                        var name = data.result[j].firstname+' '+data.result[j].lastname;
                        var nickname = data.result[j].nickname;
                        var phone = data.result[j].phone;
                        var pict = data.result[j].pict;
                        if(pict == null || pict == "null"){
                            pict = "img/user-a.png";
                        }
                        
                        var li = document.createElement('li');
                        li.className = 'list-group-item';
                        li.setAttribute("id", "li_id"+j);
                        li.innerHTML = '<img src="'+pict+'" class="img-circle pic-size">'
                                        +'<h5 class="name2">'+name+'</h5>'
                                        +'<input type="hidden" value="'+id+'" id="useridsearch'+j+'">'
                                        +'<button type="button" class="btn btn-primary btn-xs btn-add addthis '+j+'"><b>Add</b></button>';
                        document.getElementById('searchresult').appendChild(li);
                        
                    }
                }else{
                    alert(data.status);
                }
            });
        }
    }); //close search event
    
    
    $(document).on("click", ".addthis", function () {
        var pos = $(this).attr("class").replace("btn btn-primary btn-xs btn-add addthis ", "");
        var userid = $("#useridsearch"+pos).val();
        var sessionid = localStorage.getItem('sessionid');
        var urll2 = "http://workingalert.tk/api/addmembertogroup.php?type=app&sessionid="+sessionid+"&memberid="+userid+"&groupid="+groupid;
        $.ajax({
            url: urll2,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.getElementById("li_id"+pos).remove();
                }
            } 
        });
        
    });
    
    
    $(document).on("click", ".accept", function () {
        var pos = $(this).attr("class").replace("btn btn-primary btn-xs accept ", "");
        var userid = $("#userid"+pos).val();
        var urll3 = "http://workingalert.tk/api/confirmapprovemember.php?type=app&sessionid="+sessionid+"&memberid="+userid+"&groupid="+groupid;
        $.ajax({
            url: urll3,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.getElementById("litop_id"+pos).remove();
                }
            } 
        });
        
    });
    
    
    $(document).on("click", ".notnow", function () {
        var pos = $(this).attr("class").replace("btn btn-default btn-xs notnow ", "");
        var userid = $("#userid"+pos).val();
        var urll4 = "http://workingalert.tk/api/firemember.php?type=app&sessionid="+sessionid+"&memberid="+userid+"&groupid="+groupid;
        $.ajax({
            url: urll4,
            dataType:"JSON",
            success: function(result) {
                alert(result.status +'  '+ result.description);
                if(result.status == "success"){
                    document.getElementById("litop_id"+pos).remove();
                }
            } 
        });
    });
    
    
    
    
}); //close doc ready