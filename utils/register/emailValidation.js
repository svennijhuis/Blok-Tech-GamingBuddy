const emailVal = (email) => {
    // eslint-disable-next-line
    // const valid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // set of characters that checks if an emailaddress is valid
    // vgm werkt dit niet man, heb t ff in comments gezet

    // heb deze op t internet gevonden, werkt wel maar idk welke jij liever wil - Laurens
    const valid = /(.+)@(.+){2,}\.(.+){2,}/;

    if (!valid.test(email.value)) {
        return false;
    } else {
        return true;
    }
};

module.exports = { emailVal };
