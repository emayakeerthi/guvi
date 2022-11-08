const form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault()
});


function setError(element, message){
    var formGroup = element.parentElement;
    var errorMsg = formGroup.querySelector('.error');
    errorMsg.innerText = message;
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
};

function setSuccess(element){
    var formGroup = element.parentElement;
    var errorMsg = formGroup.querySelector('.error');
    errorMsg.innerText = "";
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
};


var isNameValid = false;
var isGenderValid = false;
var isDobValid = false;
var isPhoneValid = false;
var isEmailValid = false;
var isPswdValid = false;

//name validation
$("#name").on("change", ()=>{
    var name = document.getElementById("name");
    var nameValue = name.value.trim();
    var letters = /^[A-Za-z\s]*$/;
    if(nameValue.length >= 3 && nameValue!="" && nameValue.match(letters)){
        isNameValid = true;
        setSuccess(name);
    }
    else{
        setError(name, "Please, Enter valid name");
    }
});


//gender validation
$("#gender").on("change", ()=>{
    var gender = document.getElementById("gender");
    var genderValue = gender.value;
    if(genderValue=="male" || genderValue=="female" || genderValue=="others"){
        isGenderValid = true;
        setSuccess(gender);
        gender.style.borderColor="#09c372";
    }
    else{
        setError(gender, "Please, select the gender");
        gender.style.borderColor="#ff3860";
    }
});

//age validation
$("#dob").on("change", ()=>{
    var dob = document.getElementById("dob");
    var dobValue = dob.value.split('-');
    if(dobValue.length==3){
        var year = dobValue[0];
        var month = dobValue[1];
        var day = dobValue[2];
        var currentDate = new Date();
        var age = currentDate.getFullYear()-year
        if( age >= 15 && age<=110){
            setSuccess(dob);
            isDobValid = true;
        }
        else if(age==14){
            if(month<currentDate.getMonth()){
                isDobValid = true;
                setSuccess(dob);
            }
            else if(month-currentDate.getMonth()<=0 && day-currentDate.getDate()<=0){
                isDobValid = true;
                setSuccess(dob);
            }
            else{
                setError(dob, "You're under 15");
            }
            
        }
        else{
            setError(dob,"Please provide your sufficient age");
        }
    }
    else{
        setError(dob, "Please, select the dob");
    }
});

//phone number validation
$("#phone").on("change",()=>{
    var phone = document.getElementById("phone");
    var phoneNumber = phone.value.trim();
    if(phoneNumber!=""){
        if(phoneNumber>5999999999 && phoneNumber<=9999999999){
            isPhoneValid = true;
            setSuccess(phone);
        }
        else{
            setError(phone, "Enter valid phone number");
        }
    }
    else{
        setError(phone, "Please, Enter phone number");
    }
});

//email validation
$("#email").on("change", ()=>{
    var email = document.getElementById("email");
    var regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailValue = email.value.trim();
    if(emailValue!=""){
        if(regx.test(emailValue)){
            isEmailValid = true;
            setSuccess(email);
        }
        else{
            setError(email, "Please, Enter valid email address");
        }
    }
    else{
        setError(email, "Please, Enter email address");
    }
});

//password validation
var password = document.getElementById("password");
$("#password").on("change",()=>{
    var pswdValue = password.value.trim();
    if(pswdValue!=""){
        if(pswdValue.match(/[a-z]/g) && pswdValue.match(/[A-Z]/g) && pswdValue.match(/[0-9]/g) && pswdValue.match(/[^a-zA-Z\d]/g) && pswdValue.length>=8){
            setSuccess(password);
        }
        else{
            setError(password, "Please, Enter valid password");
        }
    }
    else{
        setError(password, "Please, Enter password");
    }
});

//confirm validation
$("#cpassword").on("change",()=>{
    var cpassword = document.getElementById("cpassword");
    var pswdValue = document.getElementById("password").value.trim();
    var cpswdValue = cpassword.value.trim();
    if(cpswdValue!="" && cpswdValue.match(pswdValue)){
        isPswdValid = true;
        setSuccess(cpassword);
    }
    else{
        setError(cpassword, "Please, Enter the same password");
    }
});


//checking the agree box
$("form input:checkbox").on("click", check);
function check() {  
    if($("input[name='agree-checkbox']").prop("checked") == true) {
        $("#signup-button").removeAttr("disabled");
        return;
    }
    $("#signup-button").attr("disabled",true);
};


//form submission using jquery ajax
$("#form").on("submit", function(event){
    if(isNameValid==true && isGenderValid==true && isDobValid==true && isPhoneValid==true && isEmailValid==true && isPswdValid==true){
        $.ajax({
            type: "POST",
            url: "/guvi/php/register.php",
            data: {
                name: $('#name').val(),
                gender: $('#gender').val(),
                dob: $('#dob').val(),
                phone: $('#phone').val(),
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(response){
                if(response==true){
                    alert("Registered Successfully");
                    window.location.replace('/guvi/login.html');
                }
                else{
                    alert("User already registered, Redirecting to login page");
                    window.location.replace('/guvi/login.html');
                }
            },
            error: function(data){
                alert("Something went wrong, Try again!");
            }
        });
    }
    else{
        alert("Some information is missing, Kindly provide valid information");
    }
    event.preventDefault();
});