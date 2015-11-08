$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    
    //get ค่า message หน้า all
    var url = "http://workingalert.tk/api/getallmessage.php?type=app&sessionid=" + sessionid +"&x="+Math.random();
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            //loop each message
            for (var i = 0; i < data.message.length; i++) {
                //get data from each message
                var msgid = data.message[i].id;
                var msgbody = data.message[i].body;
                var msgpriority = data.message[i].priority;
                var msgfromid = data.message[i].fromid;
                var msgpict = data.message[i].pict;
                if(msgpict == "" || msgpict == null){ msgpict = 'img/user-a.png'; }
                var msgfromname = data.message[i].formname;
                var msgreadstatus = data.message[i].read;
                var msgreachstatus = data.message[i].reach;
                var msgdatetime = data.message[i].date + ' ' + data.message[i].time;
                


                //prepare element
                var div = document.createElement('div');
                if(msgpriority=='H' || msgpriority=='h'){ //แบบข้อความ high priority
                    //generate header
                    var inheadcollapse = "";
                    for(var j = 0 ; j < data.message[i].grouppath.length ; j++){
                        var temppath = data.message[i].grouppath[j].path;
                        var grouppathid = data.message[i].grouppath[j].id;
                        var grouppathpict = data.message[i].grouppath[j].pict;
                        var grouppathfirst = temppath.substr(0,temppath.indexOf('>')-1);
                        var grouppathlast = temppath.substr(temppath.lastIndexOf('>')+1);
                        
                        if(j == 0){
                            //generate visible
                            var headvisible = '<img src="./icon/normal/12.png" class="icon-size">'
                                            + '<h3 class="panel-title panel-set">'
                                            + grouppathlast
                                            + '</h3>'
                                            + '<span class="glyphicon glyphicon-chevron-down down-span" role="button" data-toggle="collapse" data-target="#msg'+(i+5)+'" aria-expanded="false" aria-controls="collapseExample"></span>'
                                            + '<p class="h6-group">via<span class="glyphicon glyphicon-triangle-right"></span>'
                                            + grouppathfirst
                                            + '</p>';
                        }else{
                            //generate collapse
                            inheadcollapse = inheadcollapse 
                                            +'<div class="panel-heading group-margin">'
                                                +'<h3 class="panel-title">'
                                                +'<img src="icon/normal/20.png" class="icon-size">'
                                                + grouppathlast
                                                +'</h3>'
                                                +'<p class="h6-group">via'
                                                +'<span class="glyphicon glyphicon-triangle-right"></span>'
                                                +grouppathfirst
                                            +'</p></div>';
                        }
                    }
                    var headerbox = '<div class="panel-heading">'
                                        + headvisible
                                        + '<div class="collapse" id="msg'+(i+5)+'">'
                                        + inheadcollapse
                                        + '</div>'
                                    +'</div>';
                    
                    
                    //generate body
                    var bodybox = '<div class="panel-body">'+msgbody+'</div>'
                                + '<input type="hidden" value="' + msgid + '" id="msgid' + i + '">';
                    
                    //generate footer
                    var ackbtnhtml = "";
                    if(msgreadstatus == "N" || msgreadstatus == "n"){
                        ackbtnhtml = '<div class="btn-group btn-ack ack ' + i + '"><button type="button" class="btn btn-default"><b> Ack</b></button></div>';
                    }
                    var footerbox = '<div class="panel-footer style-panel-footer">'
                                        +'<img src="'+msgpict+'" class="img-circle size-img">'
                                        +'<div class="col-md-4 name-sent">'
                                            +'<b>'+msgfromname+'</b><br>'
                                            +'<small>'+msgdatetime+'</small><br>'
                                            +'<div id="seeack" class="seeack ' + i + '"><a href="#">People who ack this</a></div>'
                                        +'</div>'
                                        +ackbtnhtml
                                    +'</div>';
                    
                    div.className = 'panel panel-success position-pannel';
                    div.innerHTML = headerbox + bodybox + footerbox;
                    
                    document.getElementById('home').appendChild(div);

                }else{ //แบบข้อความธรรมดา
                    
                    //generate header
                    var inheadcollapse = "";
                    for(var j = 0 ; j < data.message[i].grouppath.length ; j++){
                        var temppath = data.message[i].grouppath[j].path;
                        var grouppathid = data.message[i].grouppath[j].id;
                        var grouppathpict = data.message[i].grouppath[j].pict;
                        var grouppathfirst = temppath.substr(0,temppath.indexOf('>')-1);
                        var grouppathlast = temppath.substr(temppath.lastIndexOf('>')+1);
                        
                        if(j == 0){
                            //generate visible
                            var headvisible = '<img src="./icon/normal/12.png" class="icon-size">'
                                            + '<h3 class="panel-title panel-set">'
                                            + grouppathlast
                                            + '</h3>'
                                            + '<span class="glyphicon glyphicon-chevron-down down-span" role="button" data-toggle="collapse" data-target="#msg'+(i+5)+'" aria-expanded="false" aria-controls="collapseExample"></span>'
                                            + '<p class="h6-group">via<span class="glyphicon glyphicon-triangle-right"></span>'
                                            + grouppathfirst
                                            + '</p>';
                        }else{
                            //generate collapse
                            inheadcollapse = inheadcollapse 
                                            +'<div class="panel-heading group-margin">'
                                                +'<h3 class="panel-title">'
                                                +'<img src="icon/normal/20.png" class="icon-size">'
                                                + grouppathlast
                                                +'</h3>'
                                                +'<p class="h6-group">via'
                                                +'<span class="glyphicon glyphicon-triangle-right"></span>'
                                                +grouppathfirst
                                            +'</p></div>';
                        }
                    }
                    var headerbox = '<div class="panel-heading">'
                                        + headvisible
                                        + '<div class="collapse" id="msg'+(i+5)+'">'
                                        + inheadcollapse
                                        + '</div>'
                                    +'</div>';
                    
                    
                    //generate body
                    var bodybox = '<div class="panel-body">'+msgbody+'</div>'
                                + '<input type="hidden" value="' + msgid + '" id="msgid' + i + '">';

                    
                    //generate footer
                    var footerbox = '<div class="panel-footer style-panel-footer">'
                                +'<img src="'+msgpict+'" class="img-circle size-img">'
                                +'<div class="col-md-4 name-sent">'
                                    +'<b>'+msgfromname+'</b><br>'
                                    +'<small>'+msgdatetime+'</small>'
                                +'</div></div>';

                    div.className = 'panel panel-default position-pannel';
                    div.innerHTML = headerbox + bodybox + footerbox;
                    
                    document.getElementById('home').appendChild(div);
                }
            }
        }else{
            alert("you can't login more than 1 device");
            localStorage.clear();
            navigator.app.exitApp();   
        }
    }); //close get ajax
    
    //
    //
    //
    //
    //
    //
    //get ค่า message หน้า my message
    var url2 = "http://workingalert.tk/api/getmysendmessage.php?type=app&sessionid=" + sessionid +"&x="+Math.random();
    $.get(url2, function (data, status) {
        if (data.status == 'success') {
            //loop each message
            for (var i = 0; i < data.message.length; i++) {
                //get data from each message
                var msgid = data.message[i].id;
                var msgbody = data.message[i].body;
                var msgpriority = data.message[i].priority;
                var msgfromid = data.message[i].fromid;
                var msgpict = data.message[i].pict;
                if(msgpict == "" || msgpict == null){ msgpict = 'img/user-a.png'; }
                var msgfromname = data.message[i].formname;
                var msgreadstatus = data.message[i].read;
                var msgreachstatus = data.message[i].reach;
                var msgdatetime = data.message[i].date + ' ' + data.message[i].time;
                var to_id = data.message[i].to_id;
                var to_name = data.message[i].to_name;
                


                //prepare element
                var div = document.createElement('div');
                if(msgpriority=='H' || msgpriority=='h'){ //แบบข้อความ high priority
                    //generate header
                    var inheadcollapse = "";
                    
                    var headvisible = '<img src="./icon/normal/12.png" class="icon-size">'
                                            + '<h3 class="panel-title panel-set">'
                                            + to_name
                                            + '</h3>'
                                            + '<span class="glyphicon glyphicon-chevron-down down-span" role="button" data-toggle="collapse" data-target="#snd'+(i+5)+'" aria-expanded="false" aria-controls="collapseExample"></span>';
                    for(var j = 0 ; j < data.message[i].grouppath.length ; j++){
                        var temppath = data.message[i].grouppath[j].path;
                        var grouppathid = data.message[i].grouppath[j].id;
                        var grouppathpict = data.message[i].grouppath[j].pict;
                        var grouppathfirst = temppath.substr(0,temppath.indexOf('>')-1);
                        var grouppathlast = temppath.substr(temppath.lastIndexOf('>')+1);
                        
                            //generate collapse
                            inheadcollapse = inheadcollapse 
                                            +'<div class="panel-heading group-margin">'
                                                +'<h3 class="panel-title">'
                                                +'<img src="icon/normal/20.png" class="icon-size">'
                                                + grouppathlast
                                                +'</h3>'
                                                +'<p class="h6-group">via'
                                                +'<span class="glyphicon glyphicon-triangle-right"></span>'
                                                +grouppathfirst
                                            +'</p></div>';
                    }
                    var headerbox = '<div class="panel-heading">'
                                        + headvisible
                                        + '<div class="collapse" id="snd'+(i+5)+'">'
                                        + inheadcollapse
                                        + '</div>'
                                    +'</div>';
                    
                    
                    //generate body
                    var bodybox = '<div class="panel-body">'+msgbody+'</div>'
                                + '<input type="hidden" value="' + msgid + '" id="msgidread' + i + '">';
                    
                    //generate footer
                    var ackbtnhtml = "";
                        ackbtnhtml = '<div class="btn-group btn-resend resend ' + i + '"><button type="button" class="btn btn-default"><b> Send Again </b></button></div>';
                    var footerbox = '<div class="panel-footer style-panel-footer">'
                                        +'<img src="'+msgpict+'" class="img-circle size-img">'
                                        +'<div class="col-md-4 name-sent">'
                                            +'<b>'+msgfromname+'</b><br>'
                                            +'<small>'+msgdatetime+'</small><br>'
                                            +'<div id="seeack" class="seeack ' + i + '"><a href="#">People who ack this</a></div>'
                                        +'</div>'
                                        +ackbtnhtml
                                    +'</div>';
                    
                    div.className = 'panel panel-success position-pannel';
                    div.innerHTML = headerbox + bodybox + footerbox;
                    
                    document.getElementById('profile').appendChild(div);

                }else{ //แบบข้อความธรรมดา
                    
                    //generate header
                    var inheadcollapse = "";
                    var headvisible = '<img src="./icon/normal/12.png" class="icon-size">'
                                            + '<h3 class="panel-title panel-set">'
                                            + to_name
                                            + '</h3>'
                                            + '<span class="glyphicon glyphicon-chevron-down down-span" role="button" data-toggle="collapse" data-target="#snd'+(i+5)+'" aria-expanded="false" aria-controls="collapseExample"></span>';
                    for(var j = 0 ; j < data.message[i].grouppath.length ; j++){
                        var temppath = data.message[i].grouppath[j].path;
                        var grouppathid = data.message[i].grouppath[j].id;
                        var grouppathpict = data.message[i].grouppath[j].pict;
                        var grouppathfirst = temppath.substr(0,temppath.indexOf('>')-1);
                        var grouppathlast = temppath.substr(temppath.lastIndexOf('>')+1);
                        
                        //generate collapse
                        inheadcollapse = inheadcollapse 
                                            +'<div class="panel-heading group-margin">'
                                            +'<h3 class="panel-title">'
                                            +'<img src="icon/normal/20.png" class="icon-size">'
                                            + grouppathlast
                                            +'</h3>'
                                            +'<p class="h6-group">via'
                                            +'<span class="glyphicon glyphicon-triangle-right"></span>'
                                            +grouppathfirst
                                        +'</p></div>';
                        
                    }
                    var headerbox = '<div class="panel-heading">'
                                        + headvisible
                                        + '<div class="collapse" id="snd'+(i+5)+'">'
                                        + inheadcollapse
                                        + '</div>'
                                    +'</div>';
                    
                    
                    //generate body
                    var bodybox = '<div class="panel-body">'+msgbody+'</div>'
                                + '<input type="hidden" value="' + msgid + '" id="msgid' + i + '">';

                    
                    //generate footer
                    var footerbox = '<div class="panel-footer style-panel-footer">'
                                +'<img src="'+msgpict+'" class="img-circle size-img">'
                                +'<div class="col-md-4 name-sent">'
                                    +'<b>'+msgfromname+'</b><br>'
                                    +'<small>'+msgdatetime+'</small>'
                                +'</div></div>';

                    div.className = 'panel panel-default position-pannel';
                    div.innerHTML = headerbox + bodybox + footerbox;
                    
                    document.getElementById('profile').appendChild(div);
                }
            }
        }else{
            alert("you can't login more than 1 device");
            localStorage.clear();
            navigator.app.exitApp();   
        }
    }); //close get ajax
    
    
    
    
    
    
    
    
    
    $(document).on("click", ".resend", function () {
        var pos = $(this).attr("class").replace("btn-group btn-resend resend ", "");
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
    
    
    $(document).on("click", ".ack", function () {
        var pos = $(this).attr("class").replace("btn-group btn-ack ack ", "");
        var messageid = $("#msgid" + pos).val();
        var sessionid = localStorage.getItem('sessionid');
        var urll2 = "http://workingalert.tk/api/confirmreadall.php?type=app&sessionid="+sessionid+"&messageid="+messageid;
        $.ajax({
            url: urll2,
            dataType:"JSON",
            success: function(result) {
                document.location.href = "dashboard_new.html";
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
});