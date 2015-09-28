$(document).ready(function () {
    groupid = localStorage.getItem("parentgroupid");
    sessionid = localStorage.getItem("sessionid");

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

    $("#createnew").on("click", function (e) {
        document.location.href = 'create-subgroup.html';
    });

    $("#editgroup").on("click", function (e) {
        document.location.href = 'edit-group.html';
    });

});
