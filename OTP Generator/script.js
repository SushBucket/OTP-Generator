let otpGen;
let timer;
let secondsRemaining = 15;
function OTPFn(){
    const btn = document.getElementById("genbtn");
    btn.disabled = true;
    clearFn();
    otpGen = Math.floor(1000 + Math.random() * 9000);
    const temp  = document.getElementById("content");
    const showOtp = document.createElement("div");
    showOtp.classList.add("otp-display");
    showOtp.innerHTML = `<p class = "otp-text">Generated OTP:
                    <span>${otpGen}</span>
                    </p>`;
    temp.appendChild(showOtp);
    document.getElementById("otpform").style.display = "flex";
    startTimer();
}
function clearFn(){
    const prevOtp = document.querySelector(".otp-display");
    if(prevOtp){
        prevOtp.remove();
    }
    resetTimer();
    document.getElementById("errormsg").innerText = "";
    enableInputField();
}
// function OTPVerifyFn(){
//     const userOtp = document.getElementById("userotp").value;
//     if (userOtp === ""){
//         alert("Please Enter OTP.");
//         return; 
//     }
//     const enterOtp = parseInt(userOtp);
//     if(!isNaN(enterOtp)){
//         if(secondsRemaining > 0){
//             if(enterOtp === otpGen){
//                 showMsgFn();
//                 document.getElementById("genbtn").disabled = false;
//                 resetTimer();
//                 enableInputField();
//             }
//             else{
//                 document.getElementById("errormsg").innerText = "Invalid OTP. Please Try Again.";
//             }
//         }else{
//             document.getElementById("errormsg").innerText = "OTP Expired. Please generate new OTP.";
//             resetTimer();
//         }
//     }else{
//         alert("Invalid OTP. Please Try Again.");
//     }
// }
function OTPVerifyFn(){
    const userOtp = document.getElementById("userotp").value;
    if (userOtp === ""){
        alert("Please Enter OTP.");
        return; 
    }
    const enterOtp = parseInt(userOtp);
    if(!isNaN(enterOtp)){
        if(secondsRemaining > 0){ // Check if timer is still running
            if(enterOtp === otpGen){
                showMsgFn();
                document.getElementById("genbtn").disabled = false;
                resetTimer();
                enableInputField();
                clearFields(); // Clear input field after successful verification
            }
            else{
                document.getElementById("errormsg").innerText = "Invalid OTP. Please Try Again.";
                clearInputField();
            }
        } else {
            document.getElementById("errormsg").innerText = "OTP Expired. Please generate new OTP.";
            resetTimer();
            disableInputField(); // Disable input field if timer has expired
            clearFields(); // Clear input field after timer expiration
        }
    }else{
        alert("Invalid OTP. Please Try Again.");
    }
}

function showMsgFn(){
    const successmsg = document.getElementById("successmsg");
    successmsg.style.animation = "fadeIn 1s forwards";
    successmsg.style.display = "flex";
    setTimeout(() => {
        successmsg.style.display = "none";
    },3000);
}
function startTimer(){
    timer = setInterval(function(){
        if(secondsRemaining <= 0){
            clearInterval(timer);
            document.getElementById("genbtn").disabled = false;
            document.getElementById("errormsg").innerText = "OTP Expired. Please generate a new OTP.";
            resetTimer();
            disableInputField();
        }else{
            document.getElementById("timer").innerText = `Time Remaining : ${secondsRemaining} seconds`;
            secondsRemaining--;
        }
    },1000);
}
function resetTimer(){
    clearInterval(timer);
    document.getElementById("timer").innerText = "";
    secondsRemaining = 15;
}
function disableInputField(){
    document.getElementById("userotp").disabled = true;
}
function enableInputField(){
    document.getElementById("userotp").disabled = false;
}
function clearFields(){
    document.getElementById("userotp").value = "";
    clearFn();
}
function clearInputField() {
    document.getElementById("userotp").value = "";
}