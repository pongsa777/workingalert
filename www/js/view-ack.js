$(document).ready(function () {
    sessionid = localStorage.getItem("sessionid");
    messageid = localStorage.getItem("msgid");
    
    var url = "http://workingalert.tk/api/getackmember.php?type=app&sessionid="+sessionid+"&msgid="+messageid;
    $.ajax({
            url: url,
            dataType:"JSON",
            success: function(result) {
                if(result.status = 'success'){
                    document.getElementById('countack').innerHTML = result.readuser.length;
                    document.getElementById('countunack').innerHTML = result.unreadmember.length;
                    for(var i = 0; i < result.readuser.length ;i++){
                        var name = result.readuser[i].firstname+' '+result.readuser[i].lastname;
                        var nickname = result.readuser[i].nickname;
                        var picture = result.readuser[i].picture;
                        if(result.readuser[i].picture == "" || result.readuser[i].picture == null){
                            picture = 'img/user-a.png';
                        }
                        var phone = result.readuser[i].phone;
                        var phonetel = "'tel:"+phone+"'";
                        var li = document.createElement('li');
                        li.className = 'position-default';
                        li.innerHTML = '<img src="'+picture+'" class="img-circle size-img">'
                        +'<h6 class="name-ack">'+name+'('+nickname+')'+'</h6>'
                        +'<input type="hidden" value="' + phone + '" id="phone' + i + '">'
                        +'<span class="glyphicon glyphicon-earphone phone-set" onclick="window.location.href = '+phonetel+'"></span>';
                        
                        document.getElementById('listreaduser').appendChild(li);
                    }
                    
                    for(var j = 0; j < result.unreadmember.length ;j++){
                        var name2 = result.unreadmember[j].firstname+' '+result.unreadmember[j].lastname;
                        var nickname2 = result.unreadmember[j].nickname;
                        var picture2 = result.unreadmember[j].picture;
                        if(result.unreadmember[j].picture == "" || result.unreadmember[j].picture == null){
                            picture2 = 'img/user.png';
                        }
                        var phone2 = result.unreadmember[j].phone;
                        var phonetel2 = "'tel:"+phone2+"'";
                        var li2 = document.createElement('li');
                        li2.className = 'position-default';
                        li2.innerHTML = '<img src="'+picture2+'" class="img-circle size-img">'
                        +'<h6 class="name-ack">'+name2+'('+nickname2+')'+'</h6>'
                        +'<input type="hidden" value="' + phone2 + '" id="phone' + j + '">'
                        +'<span class="glyphicon glyphicon-earphone phone-set" onclick="window.location.href = '+phonetel2+'"></span>';
                        
                        document.getElementById('listunreaduser').appendChild(li2);
                    }
                }else{
                    alert('read error');    
                }
            } 
        });
});