(function ($) {
    "use strict";

    var input = $('.validate-input .input100');
    var $baseUrl = "http://139.159.244.231:8080/auth"

    //Get the verification code value and check if this 
    //verification code is right
    //Verify button functions
    $("#verify").click(function () {
        if(validateInput()){
            var verc = $("#vercode").val()
            //The Second vercode shall be replaced by a vaiable storing verification code
            if(verc==verc){
                var nextUrl = "setpassword.html"
                document.location.href = nextUrl
            }
            else{
                $("#vercode").val("")
                return false
            }
        }
        else{
            return false
        }
    })

    //Code below are all for validation of input, like checking if email input is valid
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