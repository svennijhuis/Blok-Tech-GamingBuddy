const emailVal = (email) => {

    const valid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // set of characters that checks if an emailaddress is valid

    if (!valid.test(email.value)) {
        return false;
    } else {
        return true
    }
}
    
module.exports = { emailVal };