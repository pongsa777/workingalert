$(document).ready(function () {
    $("#savebtn").on('click', function (e) {
        var sessionid = localStorage.getItem('sessionid');
        var password = $('#oldpass').val();
        var newpassword = $('#newpass').val();
        var newpassword2 = $('#newpass2').val();
        url = 'http://workingalert.tk/api/changepass.php?type=app&sessionid=' + sessionid + '&password=' + password + '&newpassword=' + newpassword + '&newpassword2=' + newpassword2;
        $.ajax({
            url: url,
            dataType: "JSON",
            success: function (result) {
                if (result.status == 'success') {
                    alert(result.description);
                    document.location.href = 'view-profile.html';
                } else {
                    alert(result.description);
                }
            }
        });

    });

});
