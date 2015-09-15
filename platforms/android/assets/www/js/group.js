$(document).ready(function() {
    sessionid = localStorage.getItem("sessionid");
    var url = "http://workingalert.tk/api/getgroup.php?sessionid=" + sessionid;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            for (var i = 0; i < data.group.length; i++) {
                var groupid = data.group[i].id;
                var name = data.group[i].name;
                var desc = data.group[i].description;
                var date = data.group[i].date;
                var div = document.createElement('div');
                div.className = 'panel panel-default';
                
                div.innerHTML = '<div class="panel panel-default"><div class="panel-heading detail ' + i + '"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse1">'+name+'</a></h4><input type="hidden" value="'+groupid+'" id="groupid' + i + '"></div><div id="collapse1" class="panel-collapse collapse in"><div class="panel-body">'+desc+'</div></div></div> <!-- close callapse 2-->';
                
                document.getElementById('accordion').appendChild(div);
            }
        }
    });

    $(document).on("click", ".detail", function () {
        var pos = $(this).attr("class").replace("panel-heading detail ", "");
        localStorage.setItem("parentgroupid", $(".detail." + pos + " #groupid" + pos).val());
        alert(localStorage.getItem("parentgroupid"));
        if(localStorage.getItem("parentgroupid")!="undefined")
        document.location.href = "in-group.html";
    });
 
});