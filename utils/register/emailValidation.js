const emailVal = (email) => {

    const valid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!valid.test(email.value)) {
        console.log("false email");
        return false;
    } else {
        console.log("true email");
        return true
    }
}
    
module.exports = { emailVal };