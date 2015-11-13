$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("groupid");
    
    
    //get ค่า message หน้า all
    var url = "http://workingalert.tk/api/getmessage.php?type=app&sessionid=" + sessionid + "&groupid=" + groupid;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            
            groupname = data.groupdetail[0].name;
            
            //ใส่ค่า groupname ลง header
            document.getElementById('groupname').innerHTML = 
                '<h4 class="head-page">'+data.groupdetail[0].name+'</h4>';
            
            
            if(data.message.length > 0){
                for (var i = 0; i < data.message.length; i++) { //loop each message
                //get data from each message
                var msgid = data.message[i].id;
                var msgbody = data.message[i].body;
                var priority = data.message[i].priority;
                var fromid = data.message[i].fromid;
                var fromname = data.message[i].fromname;
                var pict = data.message[i].pict;
                var reach = data.message[i].reach;
                var msgreadstatus = data.message[i].read;
                var msgdatetime = data.message[i].date + ' ' + data.message[i].time; 
                var icon = data.message[i].icon;
                
                //prepare element
                var div = document.createElement('div');
                
                //generate header
                if(priority == "H" || priority == "h"){
                    div.className = 'panel panel-success position-pannel2';   
                    var headerbox = '<div class="panel-heading">'
                                    +'<img src="./icon/important/'+icon+'" class="icon-size">'
                                    +'<h3 class="panel-title panel-set">'
                                    +data.groupdetail[0].name
                                    +'</h3>'
                                +'</div>';
                }else{
                    div.className = 'panel panel-default position-pannel2'; 
                    var headerbox = '<div class="panel-heading">'
                                    +'<img src="./icon/normal/'+icon+'" class="icon-size">'
                                    +'<h3 class="panel-title panel-set">'
                                    +data.groupdetail[0].name
                                    +'</h3>'
                                +'</div>';
                }
                
                //generate body
                var bodybox = '<div class="panel-body">'+msgbody+'</div>'
                                + '<input type="hidden" value="' + msgid + '" id="msgid' + i + '">';
                
                //generate footer
                if(priority == "H" || priority == "h"){
                    var ackbtnhtml = "";
                    if(msgreadstatus == "N" || msgreadstatus == "n"){
                        ackbtnhtml = '<div class="btn-group btn-ack ack ' + i + '"><button type="button" class="btn btn-default"><b> Ack</b></button></div>';
                    }
                    var footerbox = '<div class="panel-footer style-panel-footer">'
                                        +'<img src="'+pict+'" class="img-circle size-img">'
                                        +'<div class="col-md-4 name-sent">'
                                            +'<b>'+fromname+'</b><br>'
                                            +'<small>'+msgdatetime+'</small><br>'
                                            +'<div id="seeack" class="seeack ' + i + '"><a href="#">People who ack this</a></div>'
                                        +'</div>'
                                        +ackbtnhtml
                                    +'</div>';
                }else{
                    var footerbox = '<div class="panel-footer style-panel-footer">'
                                +'<img src="'+pict+'" class="img-circle size-img">'
                                +'<div class="col-md-4 name-sent">'
                                    +'<b>'+fromname+'</b><br>'
                                    +'<small>'+msgdatetime+'</small>'
                                +'</div></div>';
                }
                
                div.innerHTML = headerbox + bodybox + footerbox;
                document.getElementById('home').appendChild(div); 
            }
            }
        }else{
            alert('server problems');    
        }
    }); // close get all msg
    
    
    
    //
    //
    //
    //
    //
    //
    //get ค่า message หน้า my message
    var url2 = 'http://workingalert.tk/api/getmymessage.php?type=app&sessionid='+sessionid+'&groupid='+ groupid;
    $.get(url2, function (data, status) {
        if (data.status == 'success') {
            if(data.message.length > 0){
                for (var j = 0; j < data.message.length; j++) { //loop each message
                    //get data from each message
                    var msgid = data.message[j].id;
                    var msgbody = data.message[j].body;
                    var priority = data.message[j].priority;
                    var fromid = data.message[j].fromid;
                    var fromname = data.message[j].fromname;
                    var pict = data.message[j].pict;
                    var reach = data.message[j].reach;
                    var msgreadstatus = data.message[j].read;
                    var msgdatetime = data.message[j].date + ' ' + data.message[j].time; 
                    var icon = data.message[j].icon;

                    //prepare element
                    var div = document.createElement('div');

                    //generate header
                    if(priority == "H" || priority == "h"){
                        div.className = 'panel panel-success position-pannel2';   
                        var headerbox = '<div class="panel-heading">'
                                        +'<img src="./icon/important/'+icon+'" class="icon-size">'
                                        +'<h3 class="panel-title panel-set">'
                                        +data.groupdetail[0].name
                                        +'</h3>'
                                    +'</div>';
                    }else{
                        div.className = 'panel panel-default position-pannel2'; 
                        var headerbox = '<div class="panel-heading">'
                                        +'<img src="./icon/normal/'+icon+'" class="icon-size">'
                                        +'<h3 class="panel-title panel-set">'
                                        +data.groupdetail[0].name
                                        +'</h3>'
                                    +'</div>';
                    }

                    //generate body
                    var bodybox = '<div class="panel-body">'+msgbody+'</div>'
                                    + '<input type="hidden" value="' + msgid + '" id="msgidread' + j + '">';

                    //generate footer
                    var resendbtnhtml = "";
                    var viewackhtml = "";
                    if(priority == "H" || priority == "h"){
                        resendbtnhtml = '<div class="btn-group btn-ack resend ' + j + '">'
                                            +'<button type="button" class="btn btn-primary btn-xs">'
                                            +'<b> Send Again</b></button>'
                                            +'</div>';
                        viewackhtml = '<div id="seeack" class="seeack2 ' + j + '"><a href="#">People who ack this</a></div>';

                    }
                    var footerbox = '<div class="panel-footer style-panel-footer">'
                                        +'<img src="'+pict+'" class="img-circle size-img">'
                                        +'<div class="col-md-4 name-sent">'
                                            +'<b>'+fromname+'</b><br>'
                                            +'<small>'+msgdatetime+'</small><br>'
                                            + viewackhtml
                                        +'</div>'
                                        + resendbtnhtml
                                        +'</div>';

                    div.innerHTML = headerbox + bodybox + footerbox;
                    document.getElementById('profile').appendChild(div); 
                }
            }
        }else{
            alert('server problems'); 
        }
    });
    
    
    $(document).on("click", "#gowritemsg", function () {
        localStorage.setItem("groupid", groupid);
        localStorage.setItem("groupname", groupname);
        document.location.href = 'write-message.html';
    });
    
    
    $(document).on("click", ".seeack2", function () {
        var pos = $(this).attr("class").replace("seeack2 ", "");
        var messageid = $("#msgidread" + pos).val();
        if(messageid != ""){
            localStorage.setItem('msgid',messageid);
            document.location.href = 'view-ack.html';
        }else{
            alert('can not recieve group id');
        }
        
    });
    
    $(document).on("click", ".seeack", function () {
        var pos = $(this).attr("class").replace("seeack ", "");
        var messageid = $("#msgid" + pos).val();
        if(messageid != ""){
            localStorage.setItem('msgid',messageid);
            document.location.href = 'view-ack.html';
        }else{
            alert('can not recieve group id');
        }
    });
    
    $(document).on("click", ".ack", function () {
        var pos = $(this).attr("class").replace("btn-group btn-ack ack ", "");
        var messageid = $("#msgid" + pos).val();
        var sessionid = localStorage.getItem('sessionid');
        var urll2 = "http://workingalert.tk/api/confirmreadall.php?type=app&sessionid="+sessionid+"&messageid="+messageid;
        $.ajax({
            url: urll2,
            dataType:"JSON",
            success: function(result) {
                document.location.href = "in-group.html";
            } 
        });
    });
    
    $(document).on("click", ".resend", function () {
        var pos = $(this).attr("class").replace("btn-group btn-ack resend ", "");
        var messageid = $("#msgidread" + pos).val();
        var sessionid = localStorage.getItem('sessionid');
        var urll2 = "http://workingalert.tk/api/resendpush.php?type=app&sessionid="+sessionid+"&msgid="+messageid;
        $.ajax({
            url: urll2,
            dataType:"JSON",
            success: function(result) {
                alert(result.status +'  '+ result.description);
            } 
        });
    });
    
    $(document).on("click", "#goaddmember", function () {
        localStorage.setItem("groupid", groupid);
        localStorage.setItem("groupname", groupname);
        document.location.href = 'addmember.html';
    });
    
    $(document).on("click", "#goviewmember", function () {
        localStorage.setItem("groupid", groupid);
        localStorage.setItem("groupname", groupname);
        document.location.href = 'viewmember.html';
    });
    
    $(document).on("click", "#gosetting", function () {
        localStorage.setItem("groupid", groupid);
        localStorage.setItem("groupname", groupname);
        document.location.href = 'setting-group.html';
    });
    
    document.addEventListener("backbutton", function (e) {
        document.location.href = 'dashboard_new.html';
    }, false);
    
    
}); // close doc ready