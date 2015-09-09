$(document).ready(function () {
alert('extscrip is running');
    $("#searchbtn").on("click", function (e) {
        sessionid = localStorage.getItem("sessionid");
        var searchmsg = $("#searchinput").val();
        var url = "http://workingalert.tk/api/searchgroup.php?sessionid=" + sessionid + "&searchmsg=" + searchmsg;
        alert(url);
        $.get(url, function (data, status) {
            alert(JSON.stringify(data));
            if (data.status == 'success') {
                alert(data.data.length)
                for (var i = 0; i < data.data.length; i++) {
                    var groupid = data.data[i].groupid;
                    var name = data.data[i].groupname;
                    //var desc = data.data[i].description;
                    //var date = data.data[i].date;
                    var div = document.createElement('div');
                    div.className = 'group';
                    div.innerHTML = '<div class="detail ' + i + '"><h1>' + name + '</h1><input type="hidden" value="" id="msgid"><input type="hidden" value="' + groupid + '" id="groupid' + i + '"><h4>{detail}</h4></div><div style="clear:both;"></div><div class="seperate"></div>';
                    document.getElementById('listgroup').appendChild(div);
                }
            }
        });
    });

    $(document).on("click", ".detail", function () {
        var pos = $(this).attr("class").replace("detail ", "");
        alert($(".detail." + pos + " #groupid" + pos).val());
        var groupid = $(".detail." + pos + " #groupid" + pos).val();
        var url2 = "http://workingalert.tk/api/joingroup.php?sessionid="+sessionid+"&groupid="+groupid;
        $.get(url2, function (data, status) {
            alert(JSON.stringify(data));
        });
    });




});
