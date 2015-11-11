$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("parentgroupid");
    
    //get ค่า message หน้า all
    var url = "http://workingalert.tk/api/getmessage.php?type=app&sessionid=" + sessionid + "&groupid=" + groupid;
    
    
});