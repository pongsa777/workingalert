$(document).ready(function () {
    accessgroupid = localStorage.getItem('accessgroupid');
    sessionid = localStorage.getItem("sessionid");
    
    $("#submitbtn").on('click', function (e) {
        var grouppass = $("#grouppass").val();
        var url = "http://workingalert.tk/api/joingrouppassword.php?type=app&sessionid=" + sessionid + "&pass="+grouppass+ "&groupid="+accessgroupid;
        $.get(url, function (data, status) {
            if(data.status=="success"){
                alert(data.description);
                document.location.href = 'dashboard_new.html';
            }else{
                alert(data.description);
            }
        });
    
    });
});
