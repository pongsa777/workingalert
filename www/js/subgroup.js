$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("parentgroupid");
    //var url = "http://workingalert.tk/api/getsubgroup.php?sessionid=" + sessionid + "&groupid=" + groupid;
    $.ajax({
        url: "http://workingalert.tk/api/getsubgroup.php?sessionid=" + sessionid + "&groupid=" + groupid,
        type: "GET",
        dataType: "json",
        success: function (data) {
            document.getElementById('groupname').innerHTML = '<h4 class="head-page">' + data.parentname + '</h4>';
            if (data.status == 'success') {
                for (var i = 0; i < data.group.length; i++) {
                    var groupid = data.group[i].id;
                    var name = data.group[i].name;
                    var desc = data.group[i].description;
                    var div = document.createElement('div');
                    div.className = 'panel panel-default';

                    div.innerHTML = '<div class="panel panel-default"><div class="panel-heading detail ' + i + '"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse1">' + name + '</a></h4><input type="hidden" value="' + groupid + '" id="groupid' + i + '"></div><div id="collapse1" class="panel-collapse collapse in"><div class="panel-body">Description : ' + desc + '<button class="btn-xs btn-primary vchild ' + i + '" style="float:right"> view child</button></div></div></div>';

                    document.getElementById('accordion').appendChild(div);
                }
                
                for (var i = 0; i < data.grouptojoin.length; i++){
                    var groupidj = data.grouptojoin[i].id;
                    var name = data.grouptojoin[i].name;
                    var desc = data.grouptojoin[i].description;  
                    var div = document.createElement('div');
                    div.className = 'panel panel-default';

                    div.innerHTML = '<div class="panel panel-default"><div class="panel-heading detail ' + i + '"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse1">' + name + '</a></h4><input type="hidden" value="' + groupidj + '" id="groupid2' + i + '"></div><div id="collapse1" class="panel-collapse collapse in"><div class="panel-body">Description : ' + desc + '<button class="btn-xs btn-primary join ' + i + '" style="float:right"> join </button></div></div></div>';

                    document.getElementById('accordion').appendChild(div);
                }
            }
        }
    });

    $(document).on("click", ".detail", function () {
        var pos = $(this).attr("class").replace("panel-heading detail ", "");
        localStorage.setItem("parentgroupid", $(".detail." + pos + " #groupid" + pos).val());
        if(localStorage.getItem("parentgroupid")!="undefined"){
            document.location.href = "in-group.html";
        }
    });
 
    $(document).on("click", ".vchild", function () {
        var pos2 = $(this).attr("class").replace("btn-xs btn-primary vchild ", "");
        localStorage.setItem("parentgroupid", $("#groupid" + pos2).val());
        if(localStorage.getItem("parentgroupid")!="undefined"){
            document.location.href = "subgroup.html";
        }
    });
    
    $(document).on("click", ".join", function () {
        var pos3 = $(this).attr("class").replace("btn-xs btn-primary join ", "");
        var regisgroup = $("#groupid2" + pos3).val();
        var url2 = "http://workingalert.tk/api/joingroup.php?sessionid="+sessionid+"&groupid="+regisgroup;
        $.get(url2, function (data, status) {
            alert(JSON.stringify(data));
            document.location.href = "subgroup.html";
        });
    });

});
