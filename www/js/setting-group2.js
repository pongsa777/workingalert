$(document).ready(function () {
    groupid = localStorage.getItem("groupid");
    sessionid = localStorage.getItem("sessionid");
    
    $("#gogroupinfo").on("click", function (e) {
        document.location.href = 'infogroup.html';
    });

    $("#newsubgroup").on("click", function (e) {
        document.location.href = 'create-subgroup.html';
    });
    
    $("#deletegroup").on("click", function (e) {
        if (confirm('Are you to delete this group')) {
            var urldelete = 'http://workingalert.tk/api/deletegroup.php?sessionid=' + sessionid + '&groupid=' + groupid + '&type=app';
            $.ajax({
                url: urldelete,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    if(data.status == 'success'){
                        alert('Delete successfull'); 
                        document.location.href = 'group.html';
                    }else{
                        alert('delete failed');    
                    }
                }
            });
        }
    });

    
    document.addEventListener("backbutton", function (e) {
        document.location.href = 'in-group.html';
    }, false);
}); // close doc ready