$(document).ready(function () {
    sessionid = localStorage.getItem('sessionid');
    groupid = localStorage.getItem('groupid');
    var url = 'http://workingalert.tk/api/getgroupinfo.php?type=app&sessionid=' + sessionid + '&groupid=' + groupid + '&xxx=' + Math.random()*1000;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            var groupname = data.groupdata.groupname;
            var groupid = data.groupdata.groupid;
            var groupdesc = data.groupdata.description;
            var groupicon = data.groupdata.icon;

            var groupprivacy = data.groupdata.privacy
            if (groupprivacy == "none") {
                document.getElementById('optionsRadios1').checked = true;
            } else {
                document.getElementById('optionsRadios2').checked = true;
                // apprive box
                var approve = data.groupdata.raw_approve;
                if (approve == null || approve == "null" || approve == 0) {
                    document.getElementById('checkbox0').checked = false;
                } else {
                    document.getElementById('checkbox0').checked = true;
                }

                //password box
                var password = data.groupdata.raw_password;
                if (password == "" || password == null) {
                    document.getElementById('checkbox1').checked = false;
                } else {
                    document.getElementById('checkbox1').checked = true;
                    document.getElementById('password').value = password;
                    document.getElementById('repassword').value = password;
                }
            }

            var grouppermission = data.groupdata.raw_permission;
            if (grouppermission == "" || grouppermission == null || grouppermission == 1) {
                document.getElementById('blankCheckbox2').checked = true;
            } else {
                document.getElementById('blankCheckbox2').checked = false;
            }


            document.getElementById('groupicon').src = './icon/normal/' + groupicon;
            document.getElementById('groupname').value = groupname;
            document.getElementById('description').value = groupdesc;
            document.getElementById('groupid').value = groupid;
        }
    }); // close get api



    $("#editbtn").on('click', function (e) {
        var sessionid = localStorage.getItem("sessionid");
        var parentid = localStorage.getItem("parentgroupid");
        var groupid = $("#groupid").val();
        var groupname = $("#groupname").val();
        var desc = $("#description").val();
        var icon = document.getElementById('groupicon').src;
        icon = icon.substr(icon.lastIndexOf('/') + 1);
        var pass = "";
        var repass = "";
        var approve = 0;
        var permissionsend = 1;

        if (document.getElementById("optionsRadios1").checked) {
            pass = "";
            repass = "";
            document.getElementById('checkbox0').checked = false;
            document.getElementById('checkbox1').checked = false;
        } else {
            if (document.getElementById("checkbox0").checked) {
                approve = 1;
            }
            if (document.getElementById("checkbox1").checked) {
                pass = $("#password").val();
                repass = $("#repassword").val();
            }
        }
        if (document.getElementById("blankCheckbox2").checked == false) {
            permissionsend = 2;
        }

        
        if (pass != repass) {
            alert('group password missmatch');
            document.getElementById('password').value = "";
            document.getElementById('repassword').value = "";
        } else {
            var url = 'http://workingalert.tk/api/setgroupdetail.php?type=app&sessionid=' + sessionid +  '&groupname=' + groupname + '&description=' + desc + '&password=' + pass + '&icon=' + icon + '&permission=' + permissionsend + '&approve=' + approve + '&groupid=' + groupid;
//            console.log(url);
            
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    alert(data.description);
                    document.location.href = "infogroup.html";
                } else {
                    alert('edit failed'+data.description);
                }
            });
        }


    });
});
