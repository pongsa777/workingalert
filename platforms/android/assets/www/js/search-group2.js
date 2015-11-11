$(document).ready(function () {
    $("#searchbtn").on("click", function (e) {
        var searchmsg = $("#searchinput").val();
        var sessionid = localStorage.getItem("sessionid");
        if(searchmsg == ""){
            alert("please input search message");    
        }
        var url = "http://workingalert.tk/api/searchgroup.php?type=app&sessionid=" + sessionid + "&searchmsg=" + searchmsg;
        $.get(url, function (data, status) {
            if (data.status == 'success') {
                for (var i = 0; i < data.data.length; i++) { //loop each group
                    //get each data
                    var groupid = data.data[i].groupid;
                    groupid = '<input type="hidden" value="' + groupid + '" id="groupid' + i + '">';
                    
                    var icon = data.data[i].icon;
                    icon = '<img src="icon/normal/'+icon+'" class="icon-size">';
                    
                    var groupname = data.data[i].groupname;
                    groupname = '<h5 class="name-search">'+groupname+'</h5>';
                    
                    var lock = data.data[i].lock;
                    if(lock != ""){
                        lock = '<span class="glyphicon glyphicon-lock set-layoutlock"></span>';
                    }else{
                        lock = '';    
                    }
                    
                    var grouppath = "";
                    for(var j=0 ; j < data.data[i].path.length ; j++){
                        //gen li group
                        grouppath = grouppath+'<li>'+data.data[i].path[j]+'</li>';
                    }
                    grouppath = '<ol class="breadcrumb">'+grouppath+'</ol>';
                    
                    var button = '<button type="button" class="btn btn-primary btn-xs btn-joinn detail ' + i + '">Join Group</button>';
                    
                    var li = document.createElement('li');
                    li.className = 'list-group-item';
                    li.innerHTML = groupid + icon + groupname + grouppath + lock + button;
                    document.getElementById('grouplist').appendChild(li);
                }
            }else{
                alert('server error! please try again');    
            }
        }); //close get api
    }); //close click search
    
    
    $(document).on("click", ".detail", function () {
        //var havePriority = $(this).siblings('.lock').length;
        var pos = $(this).attr("class").replace("btn btn-primary btn-xs btn-joinn detail ", "");
        var groupid = $("#groupid" + pos).val();
        var url2 = "http://workingalert.tk/api/joingroup.php?type=app&sessionid="+sessionid+"&groupid="+groupid;
        $.get(url2, function (data, status) {
            if(data.status=='success'){
                alert(data.description);
                document.location.href = 'search-group.html';
            }else if(data.status=='password'){
                alert('This group require password, '+data.description);
                localStorage.setItem("accessgroupid",groupid)
                document.location.href = 'join-group.html';
            }else{
                alert('some problem can not join');
            }
        });
    });
}); //close document ready