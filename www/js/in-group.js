$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("parentgroupid");

    var url = "http://workingalert.tk/api/getmessage.php?type=app&sessionid=" + sessionid + "&groupid=" + groupid + "&type=app";
    $.get(url, function (data, status) {
        //ใส่ชื่อกลุ่ม
        document.getElementById('groupname').innerHTML = '<h4 class="head-page">' + data.groupname + '</h4>';
        for (var i = 0; i < data.message.length; i++) {
            var msgid = data.message[i].id;
            var bodymsg = data.message[i].body;
            var priority = data.message[i].priority;
            if (priority == 'H' || priority == 'h') {
                priority = '<div class="col-xs-1 bookmark-position"><img src="img/bookmark.png" style="width: 50px;height: 50px;"></div>';
            } else {
                priority = '';
            }
            var from = data.message[i].fromname;
            var read = data.message[i].read;
            if (read == 'Y' || read == 'y') {
                read = '';
            } else {
                read = '<div class="btn-group btn-group-justified" role="group" aria-label="..." style="padding-bottom: 3%;"><div class="btn-group" role="group"><button type="button" class="btn btn-default confirmread ' + i + '"><b> Confirm</b></button></div></div>';
            }
            var datetime = data.message[i].date + ' ' + data.message[i].time;

            var div = document.createElement('div');
            div.className = 'col-md-8 pull-right size-box';

            div.innerHTML = '<div class="col-xs-1 detail"><img src="img/user-a.png" class="img-circle" style="width: 50px;height: 50px;margin-top: 36%;margin-bottom:10%;"><input type="hidden" value="' + msgid + '" id="msgid' + i + '"></div>' + priority + '<div class="col-lg-6 textbox-dashboard"><h6 style="padding-left: 17%;">' + from + '</h6><h6 style="margin-top: -2%;padding-left: 14%;"><small>' + datetime + '</small></h6><div class="col-md-12"><h5>' + bodymsg + '</h5></div></div>' + read + '<hr width="95%" style="margin-top: 1%;"><div class="btn-group btn-group-justified" role="group" style="margin-top: -5%;margin-bottom: 1%;"><div id="callbtn" class="btn-group" role="group"><button type="button" class="btn btn-default"  style="border-color: #FFFFFF;color: #808080;border-right: 1px solid #808080;"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> Call</button></div><div id="seenbtn" class="btn-group" role="group"><button type="button" class="btn btn-default"  style="border-color: #FFFFFF;color: #808080;">Seen</button></div></div>';

            document.getElementById('listmessage').appendChild(div);
        }
    });
    
    
    
    $(document).on("click", ".confirmread", function () {
        var havePriority = $(this).parent('.btn-group').parent('.btn-group').siblings('.bookmark-position').length;
        if(havePriority == 1){
            alert('confirm to read!')    
        }
        var pos = $(this).attr("class").replace("btn btn-default confirmread ", "");
        var messageid = $("#msgid" + pos).val();
        var sessionid = localStorage.getItem('sessionid');
        var groupid = localStorage.getItem('parentgroupid');
        var urll2 = "http://workingalert.tk/api/confirmread.php?type=app&sessionid=" + sessionid + "&groupid=" + groupid + "&messageid=" + messageid;
        $.ajax({
            url: urll2,
            dataType:"JSON",
            success: function(result) {
                document.location.href = "in-group.html";
            } 
        });
    });


    $("#submitbtn").on("click", function (e) {
        var sessionid = localStorage.getItem('sessionid');
        var groupid = localStorage.getItem('parentgroupid');
        var payload = $("#Inputmessage").val();
        var priority = $("#priority").val();
        var url = "http://workingalert.tk/api/createmessage.php?type=app&sessionid=" + sessionid + "&groupid=" + groupid + "&msgpayload=" + payload + "&priority=" + priority;
        $.get(url, function (data, status) {
            //alert(JSON.stringify(data));
            document.location.href = "in-group.html";
        });
    });

    
    
    

});
