$(document).ready(function () {

    $("#createbtn").on("click", function (e) {
        sessionid = localStorage.getItem("sessionid");
        var attrname = document.getElementById('attrname').value;
        if (attrname == "") {
            alert('please insert attribute name');
        } else if (document.getElementById("accept").checked) {
            // ทำงาน
            var url = 'http://workingalert.tk/api/createattr.php?type=app&sessionid=' + sessionid + '&attrname=' + attrname;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    alert(data.description);
                    document.location.href = 'dashboard_new.html';
                } else {
                    alert('server problems');
                }
            });

        } else {
            alert('please accept that anyone can join your attribute');
        }
    }); // close click event



}); // close doc ready
