$(document).ready(function () {
    sessionid = localStorage.getItem('sessionid');
    $.ajax({
        url: 'http://workingalert.tk/api/getprofile.php?type=app&sessionid=' + sessionid,
        dataType: "JSON",
        success: function (result) {
            if (result.status != 'success') {
                //alert('read failed');
            } else {
                if(result.user.picture == "" || result.user.picture == null){
                    document.getElementById('profilepict').src = 'img/user-a.png';
                }else{
                    document.getElementById('profilepict').src = result.user.picture;
                }
                document.getElementById('profilename').innerHTML = result.user.firstname+' '+result.user.lastname; 
            }
        }
    });
});