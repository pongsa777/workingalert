$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    var url = "http://workingalert.tk/api/getallmessage.php?type=app&sessionid=" + sessionid +"&x="+Math.random();
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            for (var i = 0; i < data.message.length; i++) {
                var msgid = data.message[i].id;
                var bodymsg = data.message[i].body;
                var priority = data.message[i].priority;
                var fromid = data.message[i].formid;
                var pict = data.message[i].pict;
                var fromname = data.message[i].formname;
                var read = data.message[i].read;
                var datetime = data.message[i].date + ' ' + data.message[i].time;
                
                var div = document.createElement('div');
                if(priority=='H' || priority=='h'){//check priority
                    var path = '';
                    for (var j = 0; j < data.message[i].grouppath.length; j++) {
                        temp = data.message[i].grouppath[j].path;
                        path = path + '<div class="panel-heading">'
                        +'<img src="img/icon/com.png" class="icon-size">'
                        +'<h3 class="panel-title panel-set">'+ temp.substr(temp.lastIndexOf('>')+1) +'</h3>'
                        +'</div>';
                    }
                    if(read == "Y" || read == "y"){
                        read = '';
                    }else{
                        read = '<div class="btn-group btn-ack ack ' + i + '"><button type="button" class="btn btn-default"><b> Ack</b></button></div>';
                    }
                    div.className = 'panel panel-success position-pannel';
                    div.innerHTML = '<img src="img/bookmark.png" class="size-img" style="float: right;">'
                    +path
                    +'<div class="panel-body">'
                    +bodymsg
                    +'<input type="hidden" value="' + msgid + '" id="msgid' + i + '">'
                    +'</div>'
                    +'<div class="panel-footer style-panel-footer">'
                    +'<img src="'+pict+'" class="img-circle size-img">'
                    +'<div class="col-md-4 name-sent">'
                    +'<b>'+fromname+'</b><br>'
                    +'<small>'+datetime+'</small><br>'
                    +'<div id="seeack" class="seeack ' + i + '"><a href="#">People who ack this</a></div>'
                    +'</div>'
                    +read
                    +'</div>';
                    
                    document.getElementById('listmessage').appendChild(div);
                }else{
                    var path = '';
                    for (var j = 0; j < data.message[i].grouppath.length; j++) {
                        temp = data.message[i].grouppath[j].path;
                        path = path + '<div class="panel-heading">'
                        +'<img src="img/icon/web.png" class="icon-size">'
                        +'<h3 class="panel-title panel-set">'+ temp.substr(temp.lastIndexOf('>')+1) +'</h3>'
                        +'</div>';
                    }
                    
                    div.className = 'panel panel-default position-pannel';
                    div.innerHTML = path
                    +'<div class="panel-body">'
                    +bodymsg
                    +'<input type="hidden" value="' + msgid + '" id="msgid' + i + '">'
                    +'</div>'
                    +'<div class="panel-footer style-panel-footer">'
                    +'<img src="'+pict+'" class="img-circle size-img">'
                    +'<div class="col-md-4 name-sent">'
                    +'<b>'+fromname+'</b><br>'
                    +'<small>'+datetime+'</small><br>'
                    +'</div>'
                    +'</div>';
                    
                    document.getElementById('listmessage').appendChild(div);
                }
            }
        }else{
            alert("you can't login more than 1 device");
            localStorage.clear();
            navigator.app.exitApp();
        }
    
    }); // close get api
    
    
    $(document).on("click", ".ack", function () {
        //var havePriority = $(this).parent('.btn-group').parent('.btn-group').siblings('.bookmark-position').length;
        //if(havePriority == 1){
        //    alert('confirm to read!')    
        //}
        var pos = $(this).attr("class").replace("btn-group btn-ack ack ", "");
        var messageid = $("#msgid" + pos).val();
        var sessionid = localStorage.getItem('sessionid');
        var urll2 = "http://workingalert.tk/api/confirmreadall.php?type=app&sessionid="+sessionid+"&messageid="+messageid;
        $.ajax({
            url: urll2,
            dataType:"JSON",
            success: function(result) {
                document.location.href = "dashboard.html";
            } 
        });
    });
    
    
    $(document).on("click", ".seeack", function () {
        var pos = $(this).attr("class").replace("seeack ", "");
        var messageid = $("#msgid" + pos).val();
        if(messageid != ""){
            localStorage.setItem('msgid',messageid);
            document.location.href = 'view-ack.html'
        }else{
            alert('can not recieve group id');
        }
        
    });

}); //close document ready