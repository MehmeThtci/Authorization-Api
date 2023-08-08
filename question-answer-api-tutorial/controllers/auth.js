const User = require('../middlewares/models/user');
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require("express-async-handler")
const {sendJwtToClient} = require ("../helpers/authorization/tokenhelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");
const register = asyncErrorWrapper (async (req, res, next) => {
// Post Data


    const {name,email,password,role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role

    });
    sendJwtToClient(user,res,200);


});
const login = asyncErrorWrapper (async (req, res, next) =>{

    const {email,password} = req.body;

    if(!validateUserInput(email,password)) {
        return next(new CustomError("Please check your inputs",400));
    }
    if(email == undefined  || password == undefined){
        return next(new CustomError("Please Check Your İnputs",400))
    }

    const user = await User.findOne({ email }).select("+password");
if(!comparePassword(password,user.password)){
    return next(new CustomError("Please Check PASSWORD!!!",400))
}
    sendJwtToClient(user,res,200);

});
const getUser = (req,res,next)=>{
    res.json({
        success: true,
        data : {
            id: req.user.id,
            name: req.user.name
        }
    })
};
const logout =asyncErrorWrapper (async (req,res,next) => {
   const {NODE_ENV} = process.env;

   return res.status(200).cookie({
       httpOnly: true,
       expires : new Date(Date.now()),
       secure: NODE_ENV ==="development" ? false:true

   }).json({
        success:true,
        message : "Logout Successfull"})
});

const imageUpload = asyncErrorWrapper(async (req,res,next) =>{

    res.status(200).json({
        success:true,
        message:"Resim Başarıyla Yüklendi"
    })

})

module.exports = {
    register,
    login,
    getUser,
    imageUpload,
    logout
};