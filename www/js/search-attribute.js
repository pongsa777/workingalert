$(document).ready(function () {
    
    $("#searchbtn").on("click", function (e) {
        var sessionid = localStorage.getItem("sessionid");
        var searchmsg = document.getElementById('attrmsg').value;
        document.getElementById('listresultattr').innerHTML = '';
        if(searchmsg == ""){
            searchmsg = "%";
        }
        var url = 'http://workingalert.tk/api/searchattr.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg;
        $.get(url, function (data, status) {
            if (data.status == 'success') {
                for(var i = 0; i < data.result.length; i++) {
                    var attrid = data.result[i].attr_id;
                    var attrname = data.result[i].attr_name;
                    var c_date = data.result[i].create_date;
                    var cre_id = data.result[i].create_id;
                    var add_status = data.result[i].add_status;

                    var li = document.createElement('li');
                    li.className = 'list-group-item';

                    var buttonaction = "";
                    if(add_status == 0){ //เป็นปุ่ม add
                        buttonaction = '<button type="button" class="btn btn-primary btn-xs addatr addthis '+i+'" id="addattrbtn'+i+'">Add Attribute</button>';
                    }else{ //เป็นปุ่ม remove
                        buttonaction = '<button type="button" class="btn btn-danger btn-xs addatr removethis '+i+'" id="removeattrbtn'+i+'">Remove</button>';
                    }

                    li.innerHTML = '<h5 class="">'+attrname+'</h5>'
                        +'<input type="hidden" id="attrid'+i+'" value="'+attrid+'">'
                        +buttonaction;

                    document.getElementById('listresultattr').appendChild(li);
                }
            }else{
                alert('server error! please try again');    
            }
        
        });//close get api
        
    }); // event click api
    
    
    $(document).on("click", ".removethis", function () {
        var sessionid = localStorage.getItem("sessionid");
        var pos = $(this).attr("class").replace("btn btn-danger btn-xs addatr removethis ", "");
        var attrid = $("#attrid"+pos).val();
        var urlremove = 'http://workingalert.tk/api/removeattr.php?type=app&sessionid='+sessionid+'&attrid='+attrid;
        $.get(urlremove, function (data, status) {
            if (data.status == 'success') {
//                document.location.href = 'search-attribute.html';
                var but2 = document.createElement('button');
                but2.className = 'btn btn-primary btn-xs addatr addthis '+pos;
                but2.setAttribute("id", 'addattrbtn'+pos);
                but2.innerHTML = 'Add Attribute';
                document.getElementById('removeattrbtn'+pos).remove();
                document.getElementById('attrid'+pos).parentNode.appendChild(but2);
            }else{
                alert('server problems');    
            }
        }); //close remove api
    });// close click remove
    
    $(document).on("click", ".addthis", function () {
        var sessionid = localStorage.getItem("sessionid");
        var pos = $(this).attr("class").replace("btn btn-primary btn-xs addatr addthis ", "");
        var attrid = $("#attrid"+pos).val();
        var urlremove = 'http://workingalert.tk/api/addattr.php?type=app&sessionid='+sessionid+'&attrid='+attrid;
        $.get(urlremove, function (data, status) {
            if (data.status == 'success') {
//                document.location.href = 'search-attribute.html';
                var but2 = document.createElement('button');
                but2.className = 'btn btn-danger btn-xs addatr removethis '+pos;
                but2.setAttribute("id", 'removeattrbtn'+pos);
                but2.innerHTML = 'Remove';
                document.getElementById('addattrbtn'+pos).remove();
                document.getElementById('attrid'+pos).parentNode.appendChild(but2);
            }else{
                alert('server problems');    
            }
        }); //close remove api
    });// close click remove
    
    
    document.addEventListener("backbutton", function (e) {
        document.location.href = 'dashboard_new.html';
    }, false);
    
    
}); // close doc ready