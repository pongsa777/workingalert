$(document).ready(function() {
    sessionid = localStorage.getItem("sessionid");
    var url = "http://workingalert.tk/api/getgroup.php?type=app&sessionid=" + sessionid;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            for(var i = 0; i < data.group.length; i++) {
                var groupid = data.group[i].id;
                var name = data.group[i].name;
                var desc = data.group[i].description;
                var pict = data.group[i].pict;
                
                //prepare element
                var div = document.createElement('div');
                div.className = 'panel panel-default';

                //generate header
                var headbox = '<div class="panel-heading detail '+i+'">'
                                +'<h4 class="panel-title">'
                                +'<img src="./icon/normal/'+pict+'" class="icon-size">'
                                +name
                                +'</h4>'
                                +'<span class="glyphicon glyphicon-chevron-right down-span"></span>'
                            + '</div>';
                //generate body
                var bodybox = '<div class="panel-body">'
                                +'<b class="des-style">Group Description: </b>'
                                +desc
                                +'<input type="hidden" value="'+groupid+'" id="groupid'+i+'">'
                            + '</div>';
                //generate footer
                var pathsection = '<div class="panel-footer footer-stylee"><ol class="breadcrumb">';
                for(var j = 0; j < data.group[i].path.length ; j++){
                    pathsection = pathsection+'<li>'+data.group[i].path[j]+'</li>';
                }
                pathsection = pathsection+'</ol></div>';

                div.innerHTML = headbox+bodybox+pathsection;
                document.getElementById('listgroup').appendChild(div);
            }
        }else{
            alert('server problems');    
        }
    }); // close get api
    
    
    $(document).on("click", ".detail", function () {
        var pos = $(this).attr("class").replace("panel-heading detail ", "");
        var groupid = $("#groupid" + pos).val();
        localStorage.setItem("groupid", $("#groupid" + pos).val());
        
        if(localStorage.getItem("groupid")!="undefined"){
            document.location.href = "in-group.html";
        }
    });
    
    
    document.addEventListener("backbutton", function (e) {
        document.location.href = 'dashboard_new.html';
    }, false);
}); // close doc ready