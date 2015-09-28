$(document).ready(function () {
    sessionid = localStorage.getItem('sessionid');
    $.ajax({
        url: 'http://workingalert.tk/api/getprofile.php?type=app&sessionid=' + sessionid,
        dataType: "JSON",
        success: function (result) {
            if (result.status != 'success') {
                alert('read failed');
            } else {
                document.getElementById('firstname').value = result.user.firstname;
                document.getElementById('lastname').value = result.user.lastname;
                document.getElementById('nickname').value = result.user.nickname;
                document.getElementById('phone').value = result.user.phone;
                document.getElementById('email').value = result.user.email;
                document.getElementById('profilepic').src = result.user.picture;
            }
        }
    });


    var imguri = "";
    var userid = "";
    document.addEventListener("deviceready", onDeviceReady, false);
    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }

    $("#selectphoto").on('click', function (e) {
        getPhoto(pictureSource.PHOTOLIBRARY);

        function getPhoto(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: destinationType.FILE_URI,
                //correctOrientation: true,
                sourceType: source
            });
        }

        function onSuccess(imageURI) {
            alert('success');
            imguri = imageURI;
            alert("ImageURI: " + imguri);
            $("#profilepic").attr("src", imageURI);
        }

        function onFail(message) {
            alert('Image Failed because: ' + message);
        }

        function capturePhoto() {
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 50,
                destinationType: destinationType.DATA_URL
            });
        }
    });




    $("#savebtn").on('click', function (e) {
        if ($("#firstname").val() == '') {
            alert('please input name');
        } else if ($("#lastname").val() == '') {
            alert('please input lastname');
        } else if ($("#nickname").val() == '') {
            alert('please input nickname');
        } else if ($("#phone").val() == '') {
            alert('please input phone number');
        } else if ($("#email").val() == '') {
            alert('please input email');
        } else if (imguri == "") { //up ข้อมูลปกติไม่ต้องส่ง pict ลงไปด้วย
            var urlEditProfile = 'http://workingalert.tk/api/editprofile.php';
            $.ajax({
                url: urlEditProfile, //ที่อยู่ของไฟล์เป้าหมาย
                type: "POST", //รูปแบบข้อมูลที่จะส่ง
                data: ({
                    firstname: $("#firstname").val(),
                    lastname: $("#lastname").val(),
                    email: $("#email").val(),
                    mobileno: $("#phone").val(),
                    nickname: $("#nickname").val(),
                    sessionid: localStorage.getItem('sessionid'),
                    type : 'app'
                }), //ข้อมูลที่ส่ง  { ชื่อตัวแปร : ค่าตัวแปร }
                dataType: "json", //รูปแบบข้อมูลที่ส่งกลับ xml,script,json,jsonp,text
                success: function (response) { //แสดงข้อมูลเมื่อทำงานเสร็จ 
                    //alert(JSON.stringify(response));
                    alert('save successfull');
                    document.location.href = 'view-profile.html';
                }
            });

        } else {
            var fileURL = imguri;

            var uri = encodeURI("http://workingalert.tk/api/editprofile.php");

            var options = new FileUploadOptions();
            options.fileKey = "user_image"; //ชื่อที่ต้องตรงกันกับ php
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1); //path รูป
            options.mimeType = "image/jpeg";
            options.params = {
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                email: $("#email").val(),
                mobileno: $("#phone").val(),
                nickname: $("#nickname").val(),
                sessionid: localStorage.getItem('sessionid'),
                type : 'app'
            };

            var ft = new FileTransfer();
            ft.upload(fileURL, uri, win, fail, options, true);

            function win(r) {
                //console.log("Code = " + r.responseCode);
                //console.log("Response = " + r.response);
                //console.log("Sent = " + r.bytesSent);
                //alert("StatusID: "+r.StatusID);
                //userid = r.user_id;
                //alert("User ID: "+userid);
                //localStorage.setItem("userid", userid); //Send data between pages
                //alert(r.response + "\n" + r.responseCode);
                alert("save successfull");
                document.location.href = 'view-profile.html';
            }

            function fail(error) {
                alert("An error has occurred: Code = " + error.code);
                alert(error.response);
            }
        }
    });

});
