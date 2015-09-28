$(document).ready(function () {
    sessionid = localStorage.getItem('sessionid');
    groupid = localStorage.getItem('parentgroupid');
    $.ajax({
        url: 'http://workingalert.tk/api/getgroupdetail.php?type=app&sessionid=' + sessionid + '&groupid=' + groupid,
        dataType: "JSON",
        success: function (result) {
            if (result.status != 'success') {
                alert('read failed');
            } else {
                document.getElementById('groupname').value = result.groupdata.groupname;
                document.getElementById('description').value = result.groupdata.description;
            }
        }
    });



    $("#createbtn").on('click', function (e) {
        if ($("#groupname").val() == '') {
            alert('please input groupname');
        } else if ($("#description").val() == '') {
            alert('please input description');
        } else if ($("#password").val() != $("#repassword").val()) {
            alert('grouppassword not match');
        } else {
            var name = $("#groupname").val();
            var desc = $("#description").val();
            var pass = $("#password").val();
            var pass2 = $("#repassword").val()
            var urlEditgroup = 'http://workingalert.tk/api/setgroupdetail.php?type=app&sessionid='+sessionid+'&groupid='+groupid+ '&groupname='+name+'&description='+desc+'&password='+pass+'&password2='+pass2;

            $.ajax({
                url: urlEditgroup,
                dataType: "JSON",
                success: function (data) {
                    if (data.status != 'success') {
                        alert('send to server failed');
                    } else {
                        alert(data.description);
                        document.location.href = 'in-group.html';
                    }
                }
            });
        }


    });
});
