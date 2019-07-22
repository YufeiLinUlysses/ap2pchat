
(function ($) {
    "use strict";

    var input = $('.validate-input .input100');
    var $baseUrl = "http://139.159.244.231:8080/auth"

    //Next button functions
    $("#next").click(function () {
        if (validateInput()) {
            //Get Necessary Data
            var $email = $("#email").val()
            window.sessionStorage.setItem("email", String($email))
            window.sessionStorage.setItem("username", String($email).split("@")[0])
            var $invitationCode = $("#invtcode").val()
            var $postdata = {
                email: $email,
                invitaution_code: $invitationCode
            }

            //Post Data To /signUp API to verify user status
            var $posturl = $baseUrl + "/signup"
            $.post($posturl, $postdata,
                function (data, status) {
                    window.sessionStorage.setItem("signUp", JSON.stringify(data))
                });

            //Verify Sign Up Status
            var signUp = JSON.parse(window.sessionStorage.getItem("signUp"))
            if (signUp["SuccStatus"] == 1) {
                var password = signUp["Password"]
                var nextUrl = "verify.html"
                sessionStorage.setItem("email", String($email))
                sessionStorage.setItem("pwd", String(password))
                document.location.href = nextUrl
                return true
            }
            else if(signUp["SuccStatus"] != null){
                $("#title").text("Please Check Your Email or Invitation Code")
                return false
            }
        }
        else {
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