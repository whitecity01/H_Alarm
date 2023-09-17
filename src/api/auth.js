
const emailAuth = (email) => {
    alert("email:"+email);
}
const checkEmailAuth = (emailAuth) => {
    alert("ema:"+emailAuth);   
}
const phoneNumberAuth = (phoneNumber) => {
    alert("pn:"+phoneNumber);
}
const checkPhoneNumberAuth = (phoneNumberAuth) => {
    alert("pna:"+phoneNumberAuth);
}

const createUser = (email, phoneNumber, password) => {
    alert("이메일:"+email+"번호:"+phoneNumber+"비번:"+password);
}

export { emailAuth, checkEmailAuth, phoneNumberAuth, checkPhoneNumberAuth, createUser};