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
        
    });

    $("#searchattribute").on("click", function (e) {
        
    });
    
    $("#createattribute").on("click", function (e) {
        
    });
    
    $("#logout").on("click", function (e) {
        if (confirm('Do you want to logout and exit application')) {
            localStorage.clear();
            navigator.app.exitApp();
        }
    });
});
