$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    var url = "http://workingalert.tk/api/getallmessage.php?sessionid=" + sessionid;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            for (var i = 0; i < data.message.length; i++) {
                var priority = data.message[i].priority;
                var from = data.message[i].fromid;
                var msgid = data.message[i].id;
                var read = data.message[i].read;
                if(read=='Y' || read=='y'){
                 read = 'checked';
                }
                
                path = "";
                for(var j=0;j<data.message[i].grouppath.length;j++){
                    path = path+data.message[i].grouppath[j].path+'<br>';
                }
                
                var div = document.createElement('div');
                div.className = 'col-md-8 pull-right size-box';
                div.innerHTML = '<div class="col-xs-1 detail ' + i + '"><img src="./img/user-a.png" class="img-circle" style="width: 50px;height: 50px;margin-top: 36%;margin-bottom:10%;"></div><div class="col-lg-6 textbox-dashboard"><h6>'+ from +'Pongsakorn  Yeanyang</h6><input type="hidden" value="'+msgid+'" id="msgid' + i + '"><h6 style="margin-top: -2%;"><small> August 30 at 5:30 pm</small></h6><div class="col-md-12"><h5>'+data.message[i].body+'</h5></div></div><hr width="95%" style="margin-top: 9%;"><div class="col-lg-12" style="margin-top: -2%;"><h6><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Group : <!--start link path--><ol class="breadcrumb" style="background-color: #FFFFFF;text-align: right;display: inline-block;">'+path+'</ol></h6><!--end link path--></div><div class="col-md-12" style="text-align:right;margin-top: -5%;"><div><label><input type="radio" '+read+' > Read</label></div></div>';
                
                document.getElementById('listmessage').appendChild(div);
            }
        }else{
            
        }
    });
    
    
    $(document).on("click", ".detail", function () {
        var pos = $(this).attr("class").replace("detail ", "");
        localStorage.setItem("parentgroupid", $(".detail." + pos + " #groupid" + pos).val());
        document.location.href = "groupmsg.html";
    });
    
    
});

