const bcrypt = require("bcryptjs");

const validateUserInput = (email,password) => {
    return email && password;
};
const comparePassword = (password,hashpassword) =>{
    return bcrypt.compareSync(password, hashpassword);
};
module.exports = {
    validateUserInput,
    comparePassword
}
