$(document).ready(function () {
    sessionid = localStorage.getItem('sessionid');
    $.ajax({
        url: 'http://workingalert.tk/api/getprofile.php?type=app&sessionid=' + sessionid,
        dataType: "JSON",
        success: function (result) {
            if (result.status != 'success') {
                alert('read failed');
            } else {
                document.getElementById('firstname').innerHTML = result.user.firstname;
                document.getElementById('lastname').innerHTML = result.user.lastname;
                document.getElementById('nickname').innerHTML = result.user.nickname;
                document.getElementById('phone').innerHTML = result.user.phone;
                document.getElementById('email').innerHTML = result.user.email;
                pict = result.user.picture;
                if(pict == "" || pict == null){
                    pict = 'img/user-a.png';
                }
                document.getElementById('profilepic').src = pict;
                if (result.user.password != "") {
                    document.getElementById('editpanel').innerHTML = '<h6 style="text-align: left;"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>Profile<button type="button" id="editbtn" class="btn btn-default btn-xs box-edit" style="margin-top: -1%;">Edit Profile</button><button type="button" id="changepassbtn" class="btn btn-default btn-xs box-edit" style="margin-top: -1%;margin-right:10px;">Change Password</button></h6>';
                }
            }
        }
    });



    $(document).on("click", "#editbtn", function () {
        document.location.href = 'edit-profile.html';
    });

    $(document).on("click", "#changepassbtn", function () {
        document.location.href = 'change-password.html';
    });


});
