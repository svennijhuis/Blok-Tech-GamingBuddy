const emailVal = (email) => {
    const valid = /(.+)@(.+){2,}\.(.+){2,}/; // set of characters that checks if an emailaddress is valid
    if (!valid.test(email)) {
        return false;
    } else {
        return true;
    }
};

module.exports = { emailVal };
