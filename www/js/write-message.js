$(document).ready(function() {
    sessionid = localStorage.getItem("sessionid");
    groupid = localStorage.getItem("groupid");
    groupname = localStorage.getItem("groupname");
    
    if(groupid != undefined && groupid != null && groupname != undefined && groupname != null ){
        document.getElementById('groupnamesend').value = groupname;
        document.getElementById('groupidsend').value = groupid;
    }else{
        var url = "http://workingalert.tk/api/getgroup.php?type=app&sessionid=" + sessionid;
        $.get(url, function (data, status) {
            if (data.status == 'success') {
                 for (var i = 0; i < data.group.length; i++) {
                    var groupid = data.group[i].id;
                    var name = data.group[i].name;

                    var div = document.createElement('div');
                    div.className = 'panel panel-default';
                    var div = document.createElement('div');
                    div.className = 'radio';
                    div.innerHTML = '<ul class="list-group">'
                                        +'<li class="list-group-item ul-set">'
                                        +'<label>'
                                        +'<input type="radio" class="optionradio '+i+'" name="optionsRadios" id="groupidradio'+ i +'" value="'+groupid+'" checked>'
                                        +name
                                        +'</label>'
                                        +'</li>'
                                    +'</ul>';

                    document.getElementById('listsearchgroup').appendChild(div);
                 }
            }
        }); // close get api
    }
    
    $(document).on("click", ".optionradio", function () {
        var pos = $(this).attr("class").replace("optionradio ", "");
        var groupid = $("#groupidradio" + pos).val();
        var groupname = $(this).parent('label').text();
//        alert(groupname);
//        alert(groupid);
        document.getElementById('groupnamesend').value = groupname;
        document.getElementById('groupidsend').value = groupid;
    });
    
    $("#searchgroupbtn").on("click", function (e) {
        var searchmsg = $("#groupsearchmsg").val();
        if(searchmsg == ""){
            searchmsg = '%';
        }else{
            var url = 'http://workingalert.tk/api/searchmygroup.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.getElementById('listsearchgroup').innerHTML = '';
                    for (var i = 0; i < data.data.length; i++) {
                        var groupid = data.data[i].groupid;
                        var name = data.data[i].groupname;

                        var div = document.createElement('div');
                        div.className = 'panel panel-default';
                        var div = document.createElement('div');
                        div.className = 'radio';
                        div.innerHTML = '<ul class="list-group">'
                                            +'<li class="list-group-item ul-set">'
                                            +'<label>'
                                            +'<input type="radio" class="optionradio '+i+'" name="optionsRadios" id="groupidradio'+ i +'" value="'+groupid+'" checked>'
                                            +name
                                            +'</label>'
                                            +'</li>'
                                        +'</ul>';

                        document.getElementById('listsearchgroup').appendChild(div);
             }
                }else{
                    alert('search api have some problem');   
                }
            }); // close get search my group api
        }
    });
    
    $(document).on("click", ".optionradioattr1", function () {
        var pos = $(this).attr("class").replace("optionradioattr1 ", "");
        var attrid = $("#attr1radio" + pos).val();
        var attrname = $(this).parent('label').text();
        document.getElementById('sendattr1').value = attrname;
        document.getElementById('sendattrid1').value = attrid;
    });    
    
    $("#searchattrbtn1").on("click", function (e) {
        var searchmsg = $("#msgsearchattrbtn1").val();
        if(searchmsg == ""){
            alert('please input attribute name');    
        }else{
            var url = 'http://workingalert.tk/api/searchattr.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.getElementById('listattribute1').innerHTML = '';
                    for (var i = 0; i < data.result.length; i++) {
                        var attrid = data.result[i].attr_id;
                        var attrname = data.result[i].attr_name;

                        var div = document.createElement('div');
                        div.className = 'panel panel-default';
                        var div = document.createElement('div');
                        div.className = 'radio';
                        div.innerHTML = '<ul class="list-group">'
                                            +'<li class="list-group-item ul-set">'
                                            +'<label>'
                                            +'<input type="radio" class="optionradioattr1 '+i+'" name="optionsRadios" id="attr1radio'+ i +'" value="'+attrid+'" checked>'
                                            +attrname
                                            +'</label>'
                                            +'</li>'
                                        +'</ul>';

                        document.getElementById('listattribute1').appendChild(div);
             }
                }else{
                    alert('search api have some problem');   
                }
            });
        }
    });
    
    $("#btndelattr1").on("click", function (e) {
        document.getElementById('sendattr1').value = "";
        document.getElementById('sendattrid1').value = "";
    });
    
    
    $(document).on("click", ".optionradioattr2", function () {
        var pos = $(this).attr("class").replace("optionradioattr2 ", "");
        var attrid = $("#attr2radio" + pos).val();
        var attrname = $(this).parent('label').text();
        document.getElementById('sendattr2').value = attrname;
        document.getElementById('sendattrid2').value = attrid;
    });    
    
    $("#searchattrbtn2").on("click", function (e) {
        var searchmsg = $("#msgsearchattrbtn2").val();
        if(searchmsg == ""){
            alert('please input attribute name');    
        }else{
            var url = 'http://workingalert.tk/api/searchattr.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.getElementById('listattribute2').innerHTML = '';
                    for (var i = 0; i < data.result.length; i++) {
                        var attrid = data.result[i].attr_id;
                        var attrname = data.result[i].attr_name;

                        var div = document.createElement('div');
                        div.className = 'panel panel-default';
                        var div = document.createElement('div');
                        div.className = 'radio';
                        div.innerHTML = '<ul class="list-group">'
                                            +'<li class="list-group-item ul-set">'
                                            +'<label>'
                                            +'<input type="radio" class="optionradioattr2 '+i+'" name="optionsRadios" id="attr2radio'+ i +'" value="'+attrid+'" checked>'
                                            +attrname
                                            +'</label>'
                                            +'</li>'
                                        +'</ul>';

                        document.getElementById('listattribute2').appendChild(div);
             }
                }else{
                    alert('search api have some problem');   
                }
            });
        }
    });
    $("#btndelattr2").on("click", function (e) {
        document.getElementById('sendattr2').value = "";
        document.getElementById('sendattrid2').value = "";
    });
    
    
    $(document).on("click", ".optionradioattr3", function () {
        var pos = $(this).attr("class").replace("optionradioattr3 ", "");
        var attrid = $("#attr3radio" + pos).val();
        var attrname = $(this).parent('label').text();
        document.getElementById('sendattr3').value = attrname;
        document.getElementById('sendattrid3').value = attrid;
    });    
    
    $("#searchattrbtn3").on("click", function (e) {
        var searchmsg = $("#msgsearchattrbtn3").val();
        if(searchmsg == ""){
            alert('please input attribute name');    
        }else{
            var url = 'http://workingalert.tk/api/searchattr.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.getElementById('listattribute3').innerHTML = '';
                    for (var i = 0; i < data.result.length; i++) {
                        var attrid = data.result[i].attr_id;
                        var attrname = data.result[i].attr_name;

                        var div = document.createElement('div');
                        div.className = 'panel panel-default';
                        var div = document.createElement('div');
                        div.className = 'radio';
                        div.innerHTML = '<ul class="list-group">'
                                            +'<li class="list-group-item ul-set">'
                                            +'<label>'
                                            +'<input type="radio" class="optionradioattr3 '+i+'" name="optionsRadios" id="attr3radio'+ i +'" value="'+attrid+'" checked>'
                                            +attrname
                                            +'</label>'
                                            +'</li>'
                                        +'</ul>';

                        document.getElementById('listattribute3').appendChild(div);
             }
                }else{
                    alert('search api have some problem');   
                }
            });
        }
    });
    
    $("#btndelattr3").on("click", function (e) {
        document.getElementById('sendattr3').value = "";
        document.getElementById('sendattrid3').value = "";
    });
    
    $(document).on("click", ".optionradioattr4", function () {
        var pos = $(this).attr("class").replace("optionradioattr4 ", "");
        var attrid = $("#attr4radio" + pos).val();
        var attrname = $(this).parent('label').text();
        document.getElementById('sendattr4').value = attrname;
        document.getElementById('sendattrid4').value = attrid;
    });    
    
    $("#searchattrbtn4").on("click", function (e) {
        var searchmsg = $("#msgsearchattrbtn4").val();
        if(searchmsg == ""){
            alert('please input attribute name');    
        }else{
            var url = 'http://workingalert.tk/api/searchattr.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.getElementById('listattribute4').innerHTML = '';
                    for (var i = 0; i < data.result.length; i++) {
                        var attrid = data.result[i].attr_id;
                        var attrname = data.result[i].attr_name;

                        var div = document.createElement('div');
                        div.className = 'panel panel-default';
                        var div = document.createElement('div');
                        div.className = 'radio';
                        div.innerHTML = '<ul class="list-group">'
                                            +'<li class="list-group-item ul-set">'
                                            +'<label>'
                                            +'<input type="radio" class="optionradioattr4 '+i+'" name="optionsRadios" id="attr4radio'+ i +'" value="'+attrid+'" checked>'
                                            +attrname
                                            +'</label>'
                                            +'</li>'
                                        +'</ul>';

                        document.getElementById('listattribute4').appendChild(div);
             }
                }else{
                    alert('search api have some problem');   
                }
            });
        }
    });
    
    $("#btndelattr4").on("click", function (e) {
        document.getElementById('sendattr4').value = "";
        document.getElementById('sendattrid4').value = "";
    });
    
    $(document).on("click", ".optionradioattr5", function () {
        var pos = $(this).attr("class").replace("optionradioattr5 ", "");
        var attrid = $("#attr5radio" + pos).val();
        var attrname = $(this).parent('label').text();
        document.getElementById('sendattr5').value = attrname;
        document.getElementById('sendattrid5').value = attrid;
    });    
    
    $("#searchattrbtn5").on("click", function (e) {
        var searchmsg = $("#msgsearchattrbtn5").val();
        if(searchmsg == ""){
            alert('please input attribute name');    
        }else{
            var url = 'http://workingalert.tk/api/searchattr.php?type=app&sessionid='+sessionid+'&searchmsg='+searchmsg;
            $.get(url, function (data, status) {
                if (data.status == 'success') {
                    document.getElementById('listattribute5').innerHTML = '';
                    for (var i = 0; i < data.result.length; i++) {
                        var attrid = data.result[i].attr_id;
                        var attrname = data.result[i].attr_name;

                        var div = document.createElement('div');
                        div.className = 'panel panel-default';
                        var div = document.createElement('div');
                        div.className = 'radio';
                        div.innerHTML = '<ul class="list-group">'
                                            +'<li class="list-group-item ul-set">'
                                            +'<label>'
                                            +'<input type="radio" class="optionradioattr5 '+i+'" name="optionsRadios" id="attr5radio'+ i +'" value="'+attrid+'" checked>'
                                            +attrname
                                            +'</label>'
                                            +'</li>'
                                        +'</ul>';

                        document.getElementById('listattribute5').appendChild(div);
             }
                }else{
                    alert('search api have some problem');   
                }
            });
        }
    });
    
    $("#btndelattr5").on("click", function (e) {
        document.getElementById('sendattr5').value = "";
        document.getElementById('sendattrid5').value = "";
    });
    
    attrboxstatus = "";
    $("#addattrbox").on("click", function (e) {
        if(attrboxstatus == "open"){
            //clear ค่าทุกอย่างที่อยู่ในช่อง
            document.getElementById('sendattr5').value = '';
            document.getElementById('sendattrid5').value = '';
            document.getElementById('sendattr4').value = '';
            document.getElementById('sendattrid4').value = '';
            document.getElementById('sendattr3').value = '';
            document.getElementById('sendattrid3').value = '';
            document.getElementById('sendattr2').value = '';
            document.getElementById('sendattrid2').value = '';
            document.getElementById('sendattr1').value = '';
            document.getElementById('sendattrid1').value = '';
            attrboxstatus = "";
        }else{
            attrboxstatus = "open";
        }
    });
    
    $("#sendmsg").on("click", function (e) {
        querystringattribute = "";
        validateinput();
    });
    
    function validateinput() {
        //validate groupname
        if(document.getElementById('groupidsend').value == 0){
            alert('please select group to send');
        }else{ 
            if(attrboxstatus == "open"){  //validate attribute
                var attr1id = document.getElementById('sendattrid1').value;
                var attr2id = document.getElementById('sendattrid2').value;
                var attr3id = document.getElementById('sendattrid3').value;
                var attr4id = document.getElementById('sendattrid4').value;
                var attr5id = document.getElementById('sendattrid5').value;
                // มีมาอย่างน้อย 1 อันรึป่าว?
                if( attr1id != "" || attr2id != "" || attr3id != "" || attr4id != "" || attr5id != "" ){
                    arrgroup = [];
                    arrmark = [];
                    if(attr1id != ""){
                        arrgroup.push(attr1id);
                        arrmark.push(1);
                    }
                    if(attr2id != ""){
                        arrgroup.push(attr2id);
                        arrmark.push(2);
                    }
                    if(attr3id != ""){
                        arrgroup.push(attr3id);
                        arrmark.push(3);
                    }
                    if(attr4id != ""){
                        arrgroup.push(attr4id);
                        arrmark.push(4);
                    }
                    if(attr5id != ""){
                        arrgroup.push(attr5id);
                        arrmark.push(5);
                    }
                    if(validateduplicate(arrgroup)){
                        alert('your selected attribute is duplicate');
                    }else{
//                        alert('your attribute is not duplicate');
                        for( var z=0 ; z< arrmark.length ; z++ ){
                            var eachcondition = document.getElementById('attrcondition'+arrmark[z]).value;
                            var eachattrid = document.getElementById('sendattrid'+arrmark[z]).value;
//                            alert(eachcondition);
//                            alert(eachattrid);
                            if(eachcondition == "and"){
                                querystringattribute = querystringattribute+'&attrin[]='+eachattrid;
                            }else if(eachcondition == "not"){
                                querystringattribute = querystringattribute+'&attrnot[]='+eachattrid;
                            }
                        }
                        callserversendmessage();
                    }
                }else{ // อันที่มีซ้ำกันรึป่าว?
                    alert('please select at lease one attribute');   
                }
            }else{
                callserversendmessage();
            }
        }
    }
    
    function validateduplicate(arr) {
        var sorted_arr = arr.sort(); // You can define the comparing function here. 
        // JS by default uses a crappy string compare.
        var results = [];
        for (var i = 0; i < arr.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
                results.push(sorted_arr[i]);
            }
        }
        if(results.length == 0){
            return false;
        }else{
            return true;
        }
    }
    
    function callserversendmessage(){
        var sendgroupid = document.getElementById('groupidsend').value;
        var msgpayload = $("#Inputmessage").val();
        var priority = $("#priority").val();
        var urlsend = 'http://workingalert.tk/api/createwithattrmessage.php?type=app&sessionid='+sessionid+'&groupid='+sendgroupid+'&msgpayload='+msgpayload+'&priority='+priority+querystringattribute;
        if(msgpayload == ""){
            alert('please input message');
        }else{
            $.get(urlsend, function (data, status) {
                if (data.status == 'success') {
                    alert('send message successfull');
                    document.location.href = 'dashboard_new.html';
                }else{
                    alert(JSON.stringify(data));
                }
            });
        }
    }
    
}); //close doc ready