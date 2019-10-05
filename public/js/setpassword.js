
(function ($) {
    "use strict";

    var input = $('.validate-input .input100');
    var $baseUrl = "myBaseUrl/auth"

    //Next button functions
    $("#set").click(function () {
        var pwd1 = $("#npwd").val()
        var pwd2 = $("#rpwd").val()
        if (validateInput()&&pwd1==pwd2) {
            //Get Server Timestamp from Server
            var $geturl = $baseUrl + "/time"
            $.get($geturl, function (data, status) {
                window.sessionStorage.setItem("signUpTime", JSON.stringify(data))
            })

            //Get Necessary Data
            var $email = window.sessionStorage.getItem("email")
            var $vercode = window.sessionStorage.getItem("pwd")
            var $now = JSON.parse(window.sessionStorage.getItem("signUpTime"))["CurrentTimeStamp"]
            var $signature = String($email) + "+" + String($vercode) + "+" + $now
            var $sigHash = $.md5($signature)
            var $postdata = {
                email: $email,
                new_password: pwd2,
                signature: $sigHash,
                timeStamp: $now
            }
            //Post Data To /signUp API to verify user status
            var $posturl = $baseUrl + "/changepassword"
            $.post($posturl, $postdata,
                function (data, status) {
                    window.sessionStorage.setItem("cpwd", JSON.stringify(data))
                });

            //Verify Sign Up Status
            var setPwd = JSON.parse(window.sessionStorage.getItem("cpwd"))
            if (setPwd["SuccStatus"] == 1) {
                window.sessionStorage.setItem("firstTime", "True")
                window.sessionStorage.setItem("pwd", pwd2)
                var nextUrl = "index.html"
                document.location.href = nextUrl
            }
            else {
                $("#npwd").val("")
                $("#rpwd").val("")
                return false
            }
        }
        else {
            $("#npwd").val("")
            $("#rpwd").val("")
            validateInput()
            return false
        }
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

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('id') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
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
