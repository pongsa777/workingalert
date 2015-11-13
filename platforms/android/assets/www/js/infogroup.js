$(document).ready(function () {
    groupid = localStorage.getItem("groupid");
    sessionid = localStorage.getItem("sessionid");
    
    var url = 'http://workingalert.tk/api/getgroupinfo.php?type=app&sessionid='+sessionid+'&groupid='+groupid+'$rnd ='+ Math.random()*100;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            var groupname = data.groupdata.groupname ;
            var groupid = data.groupdata.groupid;
            var groupdesc = data.groupdata.description;
            var groupicon = data.groupdata.icon;
            var groupprivacy = data.groupdata.privacy;
            var grouppermission = data.groupdata.permission;
            
            document.getElementById('groupicon').src = './icon/normal/'+groupicon;
            document.getElementById('groupname').innerHTML = groupname;
            document.getElementById('groupdesc').innerHTML = groupdesc;
            document.getElementById('privacy').innerHTML = groupprivacy;
            document.getElementById('permission').innerHTML = grouppermission;
        }
    }); // close get api

    
    $(document).on("click", "#editgroup", function () {
        document.location.href = 'editgroup.html';
    });
    
    
    document.addEventListener("backbutton", function (e) {
        document.location.href = 'setting-group.html';
    }, false);
}); // close doc readt