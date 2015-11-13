$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("groupid");
    
    //ดึงคน pending มาโชว์
    var url = 'http://workingalert.tk/api/getmemberingroup.php?type=app&sessionid='+sessionid+'&groupid='+groupid;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            mystatus = data.mystatus;
            
            // insert number of each tab
            document.getElementById('countmember').innerHTML = data.member.length;
            document.getElementById('countadmin').innerHTML = data.admin.length;
            document.getElementById('countblock').innerHTML = data.block.length;
            
            
            //loop get member user
            if(data.member.length != 0 ){
                for (var i = 0; i < data.member.length ; i++) { 
                    var id = data.member[i].id;
                    var role_id =data.member[i].role_id;
                    var email = data.member[i].email;
                    var name = data.member[i].firstname+' '+data.member[i].lastname;
                    var nickname = data.member[i].nickname;
                    var phone = data.member[i].phone;
                    var pict = data.member[i].picture;
                    if(pict == null || pict == "null"){
                        pict = "img/user-a.png";
                    }
                    
                    var div = document.createElement('div');
                    div.className = 'row box-name name-box border-mem';
                    //generate name
                    var namebox = '<div class="col-xs-2">'
                                    +'<img src="'+pict+'" class="img-circle" style="width: 50px;height: 50px;">'
                                + '</div>'
                                + '<div class="col-lg-12 btn-position">'
                                    +'<h6 style="margin-left: 25%;">'
                                    +name
                                    +'</h6>'
                                +'</div>';
                    //generate dropdown
                    var dropdown = '';
                    if(mystatus == "admin"){
                        var dropdown = '<div class="dropdown menu-dropdown">'
                                        +'<span class="glyphicon glyphicon-option-vertical" id="menu1" data-toggle="dropdown"></span>'
                                        +'<ul class="dropdown-menu active" role="menu" aria-labelledby="menu1" style="margin-left: 44%;">'
                                            +'<input type="hidden" value="'+id+'" id="menumember'+i+'">'
                                            +'<li role="presentation">'
                                                +'<a role="menuitem" tabindex="-1" href="#" class="addadmin '+i+'">Add to admin</a>'
                                            +'</li>'
                                            +'<li role="presentation">'
                                                +'<a role="menuitem" tabindex="-1" href="#" class="blockuser '+i+'">Blocked user</a>'
                                            +'</li>'
                                            +'<li role="presentation" class="divider"></li>'
                                            +'<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="removefromgroup '+i+'">Remove from group</a></li>'
                                        +'</ul>'
                                    +'</div>';
                    }
                    
                    div.innerHTML = namebox + dropdown ;
                    document.getElementById('panelmember').appendChild(div);
                    
                }
            }
            
            
            
            //loop get admin
            if(data.admin.length != 0 ){
                for (var j = 0; j < data.admin.length ; j++) { 
                    var id = data.admin[j].id;
                    var role_id =data.admin[j].role_id;
                    var email = data.admin[j].email;
                    var name = data.admin[j].firstname+' '+data.admin[j].lastname;
                    var nickname = data.admin[j].nickname;
                    var phone = data.admin[j].phone;
                    var pict = data.admin[j].picture;
                    if(pict == null || pict == "null"){
                        pict = "img/user-a.png";
                    }
                    
                    var div = document.createElement('div');
                    div.className = 'row box-name name-box border-mem';
                    //generate name
                    var namebox = '<div class="col-xs-2">'
                                    +'<img src="'+pict+'" class="img-circle" style="width: 50px;height: 50px;">'
                                + '</div>'
                                + '<div class="col-lg-12 btn-position">'
                                    +'<h6 style="margin-left: 25%;">'
                                    +name
                                    +'</h6>'
                                +'</div>';
                    //generate dropdown
                    var dropdown = '';
                    if(mystatus == "admin"){
                        var dropdown = '<div class="dropdown menu-dropdown">'
                                        +'<span class="glyphicon glyphicon-option-vertical" id="menu1" data-toggle="dropdown"></span>'
                                        +'<ul class="dropdown-menu active" role="menu" aria-labelledby="menu1" style="margin-left: 44%;">'
                                            +'<li role="presentation">'
                                                +'<input type="hidden" value="'+id+'" id="menuadmin'+j+'" >'
                                                +'<a role="menuitem" tabindex="-1" href="#" class="removeadmin '+j+'">Remove from admin</a>'
                                            +'</li>'
                                        +'</ul>'
                                    +'</div>';
                    }
                    
                    div.innerHTML = namebox + dropdown ;
                    document.getElementById('paneladmin').appendChild(div);
                    
                }
            }
            
            
            //loop blocked user
            if(data.block.length != 0){
                for (var k = 0; k < data.block.length ; k++) { 
                    var id = data.block[k].id;
                    var role_id =data.block[k].role_id;
                    var email = data.block[k].email;
                    var name = data.block[k].firstname+' '+data.member[k].lastname;
                    var nickname = data.block[k].nickname;
                    var phone = data.block[k].phone;
                    var pict = data.block[k].picture;
                    if(pict == null || pict == "null"){
                        pict = "img/user-a.png";
                    }
                    var div = document.createElement('div');
                    div.className = 'row box-name name-box border-mem';
                    //generate name
                    var namebox = '<div class="col-xs-2">'
                                    +'<img src="'+pict+'" class="img-circle" style="width: 50px;height: 50px;">'
                                + '</div>'
                                + '<div class="col-lg-12 btn-position">'
                                    +'<h6 style="margin-left: 25%;">'
                                    +name
                                    +'</h6>'
                                +'</div>';
                    //generate dropdown
                    var dropdown = '';
                    if(mystatus == "admin"){
                        var dropdown = '<div class="dropdown menu-dropdown">'
                                        +'<span class="glyphicon glyphicon-option-vertical" id="menu1" data-toggle="dropdown"></span>'
                                        +'<ul class="dropdown-menu active" role="menu" aria-labelledby="menu1" style="margin-left: 44%;">'
                                            +'<li role="presentation">'
                                                +'<input type="hidden" value="'+id+'" id="menublock'+k+'">'
                                                +'<a role="menuitem" tabindex="-1" href="#" class="unblock '+k+'">Unblocked</a>'
                                            +'</li>'
                                            +'<li role="presentation" class="divider"></li>'
                                            +'<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="removefromgroup '+k+'">Remove from group</a></li>'
                                        +'</ul>'
                                    +'</div>';
                    }
                    div.innerHTML = namebox + dropdown ;
                    document.getElementById('panelblock').appendChild(div);
        
                }
            }
        }
    }); // close get api
    
    
    $(document).on("click", "#leavegroup", function () {
        var urlleave = 'http://workingalert.tk/api/leavegroup.php?sessionid='+sessionid+'&type=app&groupid='+groupid;
        $.ajax({
            url: urlleave,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.location.href = 'group.html';
                }
            } 
        });
    });
    
    
    $(document).on("click", ".unblock", function () {
        var pos = $(this).attr("class").replace("unblock ", "");
        var userid = $("#menublock"+pos).val();
        var urlleave = 'http://workingalert.tk/api/unblockmember.php?type=app&sessionid='+sessionid+'&groupid='+groupid+'&memberid='+userid;
        $.ajax({
            url: urlleave,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.location.href = 'viewmember.html';
                }
            } 
        });
    });
    
    
    $(document).on("click", ".removeadmin", function () {
        var pos = $(this).attr("class").replace("removeadmin ", "");
        var userid = $("#menuadmin"+pos).val(); 
        var urlleave = 'http://workingalert.tk/api/removeadmin.php?type=app&sessionid='+sessionid+'&groupid='+groupid+'&memberid='+userid;
        $.ajax({
            url: urlleave,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.location.href = 'viewmember.html';
                }
            } 
        });
    });
    
    
    $(document).on("click", ".removefromgroup", function () {
        var pos = $(this).attr("class").replace("removefromgroup ", "");
        var userid = $("#menumember"+pos).val(); 
        var urlleave = 'http://workingalert.tk/api/firemember.php?type=app&sessionid='+sessionid+'&groupid='+groupid+'&memberid='+userid;
        $.ajax({
            url: urlleave,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.location.href = 'viewmember.html';
                }
            } 
        });
    });
    
    
    $(document).on("click", ".blockuser", function () {
        var pos = $(this).attr("class").replace("blockuser ", "");
        var userid = $("#menumember"+pos).val();
        var urlleave = 'http://workingalert.tk/api/blockmember.php?type=app&sessionid='+sessionid+'&groupid='+groupid+'&memberid='+userid;
        $.ajax({
            url: urlleave,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.location.href = 'viewmember.html';
                }
            } 
        });
    });
    
    
    $(document).on("click", ".addadmin", function () {
        var pos = $(this).attr("class").replace("addadmin ", "");
        var userid = $("#menumember"+pos).val();
        var urlleave = 'http://workingalert.tk/api/makeadmin.php?type=app&sessionid='+sessionid+'&groupid='+groupid+'&memberid='+userid;
        $.ajax({
            url: urlleave,
            dataType:"JSON",
            success: function(result) {
                alert(result.description);
                if(result.status == "success"){
                    document.location.href = 'viewmember.html';
                }
            } 
        });
    });
    
    
}); //close doc ready