// for signup
const signupName=document.getElementById('signupName')
const signupNameError=document.getElementById('signupNameError')
const signupEmail=document.getElementById('signupEmail')
const signupEmailError=document.getElementById('signupEmailError')
const signupPassword=document.getElementById('signupPassword')
const signupPasswordError=document.getElementById('signupPasswordError')
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

// for login
const loginEmail=document.getElementById('loginEmail')
const loginPassword=document.getElementById('loginPassword')
const loginEmailError=document.getElementById('loginEmailError')
const loginPasswordError=document.getElementById('loginPasswordError')

// for signup 
function signupNameValidate(){
    if(signupName.value===""){
        signupNameError.innerText="*Required"
    }
    else{
        if(!isNaN(signupName.value)){
            signupNameError.innerText="*Invalid"
        }
        else{
            signupNameError.innerText=""
        }
    }
}

function signupEmailAddressValidate(){
    if(signupEmail.value===""){
        signupEmailError.innerText="*Required"
    }
    else{
        signupEmailError.innerText=""
    }
}

function signupPasswordValidate(){
    if(signupPassword.value===""){
        signupPasswordError.innerText="*Required"
    }
    else{
        if(signupPassword.value.length<6 || signupPassword.value.length>15){
            signupPasswordError.innerText="*Password should be between 6 to 15"
        }
        else{
            signupPasswordError.innerText=""
        }
    }
}

function registerClick(){
    if(signupName.value===""){
        signupNameError.innerText="*Required"
    }
    else{
        if(!isNaN(signupName.value)){
            signupNameError.innerText="*Invalid"
        }
        else{
            signupNameError.innerText=""
        }
    }
    if(signupEmail.value===""){
        signupEmailError.innerText="*Required"
    }
    else{
        if(signupEmail.value.match(emailPattern)){
            signupEmailError.innerText=""
        }
        else{
            signupEmailError.innerText="*Invalid"
        }
    }
    if(signupPassword.value===""){
        signupPasswordError.innerText="*Required"
    }
    else{
        if(signupPassword.value.length<6 || signupPassword.value.length>15){
            signupPasswordError.innerText="*Password should be between 6 to 15"
        }
        else{
            signupPasswordError.innerText=""
        }
    }
    if(signupNameError.innerText==="" && signupEmailError.innerText==="" && signupPasswordError.innerText===""){
        const signupUserInfo={
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }
        axios.post('https://stirring-minds-assignment-backend.onrender.com/signup', signupUserInfo)
            .then((response)=>{
                if(response.data.message==='Signup Successful'){
                    document.getElementById('signupSuccess').innerText="Signup Successful !"
                    setTimeout(()=>{
                        document.getElementById('signupForm').reset()
                        document.getElementById('signupSuccess').innerText=""
                        document.getElementById('signupDiv').style='display:none' 
                        document.getElementById('loginDiv').style='display:block' 
                    }, 2500)
                }
                else{
                    signupEmailError.innerText="*Email Id already exist, use different one"
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }
}

function backToLoginClick(){
    const signupDiv=document.getElementById('signupDiv')
    const loginDiv=document.getElementById('loginDiv')
    const signupForm=document.getElementById('signupForm')
    const signupSuccess=document.getElementById('signupSuccess')
    signupSuccess.innerText=""
    signupForm.reset()
    signupDiv.style="display:none"
    loginDiv.removeAttribute('style')
}   

// for login
function loginEmailAddressValidate(){
    if(loginEmail.value===""){
        loginEmailError.innerText="*Required"
    }
    else{
        loginEmailError.innerText=""
    }    
}

function loginPasswordValidate(){
    if(loginPassword.value===""){
        loginPasswordError.innerText="*Required"
    }
    else{
        loginPasswordError.innerText=""
    }    
}

function loginClick(){
    if(loginEmail.value===""){
        loginEmailError.innerText="*Required"
    }
    else{
        loginEmailError.innerText=""
    }
    if(loginPassword.value===""){
        loginPasswordError.innerText="*Required"
    }
    else{
        loginPasswordError.innerText=""
    }  
    if(loginEmailError.innerText==="" && loginPasswordError.innerText===""){
        axios.get(`https://stirring-minds-assignment-backend.onrender.com/login?email=${loginEmail.value}&password=${loginPassword.value}`)
            .then((response)=>{
                if(response.data.message==="Login Successful"){
                    document.getElementById('loginForm').reset()
                    document.getElementById('loginDiv').style="display:none"
                    document.getElementById('homeDiv').style="display:block"
                }
                else{
                    document.getElementById('loginError').innerText="*Invalid Email address/Password"
                    setTimeout(()=>{
                        document.getElementById('loginError').innerText=""
                    }, 4000)
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }
}

function createAccountClick(){
    const signupDiv=document.getElementById('signupDiv')
    const loginDiv=document.getElementById('loginDiv')
    const loginForm=document.getElementById('loginForm')
    
    loginForm.reset()
    loginDiv.style="display:none"
    signupDiv.removeAttribute('style')
}
var i=0

function showPasswordClick(){
    if(i===0 || i%2===0){
        signupPassword.removeAttribute('type')
        loginPassword.removeAttribute('type')
    }
    else{
        signupPassword.setAttribute('type', 'password')
        loginPassword.setAttribute('type', 'password')
    }
    i++
}

function logoutClick(){
    document.getElementById('homeDiv').style="display:none"
    document.getElementById('loginDiv').style="display:block"
}