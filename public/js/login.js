
(function ($) {
    "use strict";

    var input = $('.validate-input .input100');
    var $baseUrl = "http://139.159.244.231:8080/auth"
    
    //Login button functions
    $("#login").click(function(){
        if(validateInput()){

            //Get Server Timestamp from Server
            var $geturl = $baseUrl + "/time"
            $.get($geturl, function (data, status) {
                window.sessionStorage.setItem("time", JSON.stringify(data))
            })

            //Get Necessary Data
            var $email = $("#email").val()
            var $password = $("#passwd").val()
            var $ex = 1
            var $now = JSON.parse(window.sessionStorage.getItem("time"))["CurrentTimeStamp"]
            var $signature = String($email) + "+" + String($password) + "+" + $now
            var $sigHash = $.md5($signature)
            var $postdata = {
                email: $email,
                signature: $sigHash,
                is_expire: $ex,
                timeStamp: $now
            }

            //Post Data To /signin API to verify user status
            var $posturl = $baseUrl + "/signin"
            $.post($posturl, $postdata,
                function (data, status) {
                    window.sessionStorage.setItem("signedIn", JSON.stringify(data))
                });

            //Verify Log In Status
            var signIn = JSON.parse(window.sessionStorage.getItem("signedIn"))
            if (signIn["SuccStatus"] == 1) {
                window.sessionStorage.setItem("email", String($email))
                window.sessionStorage.setItem("username", String($email).split("@")[0])
                var nextUrl = "chat.html"
                document.location.href = nextUrl
            }
            else if (signIn["SuccStatus"] == 2){
                $("#title").text("You have already signed in").css("color", "red")
                return false
            }
            else if (signIn["SuccStatus"]!=null){
                $("#title").text("Please Check Your Email or Password").css("color","red")
                return false
            }
        }
        else{
            return false
        }
    })

    //Register button functions
    $("#register").click(function(){
        var nextUrl = "signUp.html"
        document.location.href = nextUrl
    })

    //Code below are all for validation of input
    function validateInput() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                console.log(input[i])
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    }

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('id') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);