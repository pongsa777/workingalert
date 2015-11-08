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

    $("#setting").on("click", function (e) {
        alert('soonnnn');
        //document.location.href = ".html";
    });

    $("#logout").on("click", function (e) {
        if (confirm('Do you want to logout and exit application')) {
            localStorage.clear();
            navigator.app.exitApp();
        }
    });
});
