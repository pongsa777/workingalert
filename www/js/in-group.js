$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("parentgroupid");

    alert(groupid + ' ' + sessionid);
    var url = "http://workingalert.tk/api/getmessage.php?sessionid=" + sessionid + "&groupid=" + groupid;
    $.get(url, function (data, status) {
        for (var i = 0; i < data.message.length; i++) {
            var msgid = data.message[i].id;
            var bodymsg = data.message[i].body;
            var priority = data.message[i].priority;
            var from = data.message[i].fromid;
            
            var div = document.createElement('div');
            div.className = 'col-md-8 pull-right size-box';
            div.innerHTML = '<div class="col-xs-1 detail"><img src="img/user-a.png" class="img-circle" style="width: 50px;height: 50px;margin-top: 36%;margin-bottom:10%;"><input type="hidden" value="'+msgid+'" id="msgid' + i + '"></div><div class="col-lg-6 textbox-dashboard"><h6>'+from+' Pongsakorn  Yeanyang</h6><h6 style="margin-top: -2%;"><small> August 30 at 5:30 pm</small></h6><div class="col-md-12"><h5>'+bodymsg+'</h5></div></div><hr width="95%" style="margin-top: 9%;"><br><div class="col-md-12" style="text-align:right;margin-top: -5%;"><div><label><input type="radio"> Read</label></div></div>';

            document.getElementById('listmessage').appendChild(div);
        }
    });
});
