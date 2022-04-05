let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"); // a series of characters to check if an emailaddress is valid

let testEmails = ["notanemail.com", "workingexample@stackabuse.com", "example@yale.edu.com"];

testEmails.forEach((address) => {
    console.log(regex.test(address))
});