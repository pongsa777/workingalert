$(document).ready(function() {
    sessionid = localStorage.getItem("sessionid");
    var url = 'http://workingalert.tk/api/getmyattr.php?type=app&sessionid='+sessionid;
    $.get(url, function (data, status) {
        if (data.status == 'success') {
            for(var i = 0; i < data.attribute.length; i++) {
                var attr_id = data.attribute[i].attr_id;
                var attr_name = data.attribute[i].attr_name;
                var add_date = data.attribute[i].add_date;
                
                //generate box
                var li = document.createElement('li');
                li.className = "list-group-item";
                
                li.innerHTML = '<h5 class="">'+attr_name+'</h5>'
                    +'<input type="hidden" id="attrid'+i+'" value="'+attr_id+'">'
                    +'<button type="button" class="btn btn-danger btn-xs addatr '+i+'" id="removeattrbtn">Remove</button>';
                
                document.getElementById('result-attr').appendChild(li);
            }
        }else{
            alert('server problems');    
        }
    }); // close get api
    
    $(document).on("click", ".addatr", function () {
        var pos = $(this).attr("class").replace("btn btn-danger btn-xs addatr ", "");
        var attrid = $("#attrid"+pos).val();
        var urlremove = 'http://workingalert.tk/api/removeattr.php?type=app&sessionid='+sessionid+'&attrid='+attrid;
        $.get(urlremove, function (data, status) {
            if (data.status == 'success') {
                document.location.href = 'attribute.html';
            }else{
                alert('server problems');    
            }
        }); //close remove api
    });// close click remove
    
    
    document.addEventListener("backbutton", function (e) {
        document.location.href = 'dashboard_new.html';
    }, false);
    
}); // close doc ready