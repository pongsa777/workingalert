$(document).ready(function () {
    $("#createbtn").on("click", function (e) {
        var sessionid = localStorage.getItem("sessionid");
        var parentid = localStorage.getItem("groupid");
        var groupname = $("#groupname").val();
        var desc = $("#description").val();
        var icon = document.getElementById('icongroup').src;
        icon = icon.substr(icon.lastIndexOf('/')+1);
        var pass = "";
        var repass = "";
        var approve = 0;
        var permissionsend = 1;
        
        if(document.getElementById("optionsRadios1").checked){
            pass = "";
            repass = "";
        }else{
            if(document.getElementById("checkbox0").checked){
                approve = 1;
            }
            if(document.getElementById("checkbox1").checked){
                pass = $("#password").val();
                repass = $("#repassword").val();
            }
        }
        if(document.getElementById("blankCheckbox2").checked == false){
            permissionsend = 2;
        }
        
        if (pass != repass) {
            alert('group password missmatch');
            document.getElementById('password').value = "";
            document.getElementById('repassword').value = "";
        }else{
            var url = 'http://workingalert.tk/api/creategroup.php?type=app&sessionid=' + sessionid + '&parentgroupid=' + parentid + '&groupname=' + groupname + '&description=' + desc + '&password=' + pass + '&icon=' + icon + '&permission=' + permissionsend + '&approve=' + approve;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.location.href = "dashboard_new.html";
                } else {
                    alert('create failed');
                }
            });
        }

    });
});