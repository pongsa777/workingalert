$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    localStorage.removeItem('parentgroupid');
    alert(localStorage.getItem("data title") + '  ' + localStorage.getItem("data message"));
    var url = "http://workingalert.tk/api/getgroup.php?sessionid=" + sessionid;
    alert(url);
    $.get(url, function (data, status) {
        alert(JSON.stringify(data));
        if (data.status == 'success') {
            for (var i = 0; i < data.group.length; i++) {
                var groupid = data.group[i].id;
                var name = data.group[i].name;
                var desc = data.group[i].description;
                var date = data.group[i].date;
                var div = document.createElement('div');
                div.className = 'group';
                //div.innerHTML = '<div class="detail ' + i + '"><h1>' + name + '</h1><h4>' + date + '</h4><input type="hidden" value="' + groupid + '" id="groupid' + i + '"></div><div class="widget"><p><img src="pic/star_inactive.png"></p><p><img src="pic/dot_menu.png"></p></div><div style="clear:both;"></div><div class="seperate"></div>';

                //div.innerHTML = '<div class="msgcount"><div class="unreadmsg"><p>0</p></div><p><img src="pic/calendar.png"></p></div><a href="groupmsg.html"><div class="detail' + i + '"><p class="groupname">' + name + '</p><p class="datetime">' + date + '</p><input type="hidden" value="' + groupid + '" id="groupid' + i + '"></div></a><div class="widget"><p><img src="pic/star_active.png"></p><p><img src="pic/dot_menu.png"></p></div><div style="clear:both;"></div><div class="seperate"></div>';

                div.innerHTML = '<div class="group"><div class="msgcount"><div class="unreadmsg"><p>0</p></div><p><img src="pic/calendar.png"></p></div><a href="groupmsg.html"><div class="detail ' + i + '"><div class="data"><p class="groupname">' + name + '</p><p class="datetime">' + date + '</p><input type="hidden" value="'+groupid+'" id="groupid' + i + '"></div></div></a><div class="widget"><p><img src="pic/star_active.png"></p><p><img src="pic/dot_menu.png"></p></div><div style="clear:both;"></div><div class="seperate"></div></div>';
                
                document.getElementById('listgroup').appendChild(div);
            }
        }
    });

    $(document).on("click", ".detail", function () {
        var pos = $(this).attr("class").replace("detail ", "");
        localStorage.setItem("parentgroupid", $(".detail." + pos + " #groupid" + pos).val());
        document.location.href = "groupmsg.html";
    });

    $("#logoutbtn").on("click", function (e) {
        if (confirm('You are now logged out from application')) {
            localStorage.clear();
            navigator.app.exitApp();
        }
    });
});
