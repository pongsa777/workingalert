$(document).ready(function () {
    $("#createbtn").on("click", function (e) {
        var sessionid = localStorage.getItem("sessionid");
        var parentid = localStorage.getItem("parentgroupid");
        var groupname = $("#groupname").val();
        var desc = $("#description").val();
        var pass = $("#password").val();
        var repass = $("#repassword").val();
        if (pass != repass) {
            alert('group password missmatch');
            document.getElementById('password').value = "";
            document.getElementById('repassword').value = "";
        }else{
            var url = 'http://workingalert.tk/api/creategroup.php?type=app&sessionid=' + sessionid + '&parentgroupid=' + parentid + '&groupname=' + groupname + '&description=' + desc + '&password=' + pass;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.location.href = "group.html";
                } else {
                    alert('create failed');
                }
            });
        }
    
    
    });
});