$(document).ready(function () {
    $("#dashboard").on("click", function (e) {
        document.location.href = "dashboard_new.html";
    });

    $("#group").on("click", function (e) {
        document.location.href = "group.html";
    });

    $("#searchgroup").on("click", function (e) {
        document.location.href = "search-group.html";
    });

    $("#creategroup").on("click", function (e) {
        localStorage.removeItem('parentgroupid');
        document.location.href = "create-group.html";
    });

    $("#attribute").on("click", function (e) {
        document.location.href = "attribute.html";
    });

    $("#searchattribute").on("click", function (e) {
        document.location.href = "search-attribute.html";
    });
    
    $("#createattribute").on("click", function (e) {
        document.location.href = "create-attribute.html";
    });
    
    $("#logout").on("click", function (e) {
        if (confirm('Do you want to logout and exit application')) {
            var sessionid = localStorage.getItem("sessionid");
            var url = 'http://workingalert.tk/api/removedeviceid.php?sessionid='+sessionid+'&type=app';
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    localStorage.clear();
                    navigator.app.exitApp();
                }else{
                    alert('logout not successfull you may recieve push notification');    
                    localStorage.clear();
                    navigator.app.exitApp();
                }
            });
            
        }
    });
});
