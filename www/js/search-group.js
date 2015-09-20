$(document).ready(function () {
    
    $("#searchbtn").on("click", function (e) {
        sessionid = localStorage.getItem("sessionid");
        var searchmsg = $("#searchinput").val();
        var url = "http://workingalert.tk/api/searchgroup.php?sessionid=" + sessionid + "&searchmsg=" + searchmsg;
        $.get(url, function (data, status) {
            if (data.status == 'success') {
                document.getElementById('listresult').innerHTML = '';
                for (var i = 0; i < data.data.length; i++) {
                    var desc = data.data[i].description;
                    var groupid = data.data[i].groupid;
                    var name = data.data[i].groupname;
                    lock = data.data[i].lock;
                    
                    var div = document.createElement('div');
                    div.className = 'col-md-8 pull-right div-search';
                    div.innerHTML = '<div class="col-md-8"><h5 style="text-align:left;">'+name+'</h5></div><div class="col-md-8"><div class="row btn-join"><input type="hidden" value="' + groupid + '" id="groupid' + i + '"><button type="button" class="btn btn-primary btn-xs detail ' + i + '">Join</button></div></div><div class="col-md-8" id="description">'+desc+'</div>';
                    
                    document.getElementById('listresult').appendChild(div);
                }
            }
        });
        
    });
    
    $(document).on("click", ".detail", function () {
        var pos = $(this).attr("class").replace("btn btn-primary btn-xs detail ", "");
        var groupid = $("#groupid" + pos).val();
        var url2 = "http://workingalert.tk/api/joingroup.php?sessionid="+sessionid+"&groupid="+groupid;
        $.get(url2, function (data, status) {
            if(data.status=='success'){
                alert('join success');    
            }else{
                alert('some problem');   
            }
        });
    });
});