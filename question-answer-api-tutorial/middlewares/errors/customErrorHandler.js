const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = (err,req,res,next) => {
    let customError = err

    if(err.name ==="SyntaxError"){
        customError = new CustomError("Belirlenemeyen Syntax",400);
    }

    if(err.name ==="ValidationError"){
        customError = new CustomError(err.message,400);
    }
    if(err.code === 11000){

        customError = new CustomError("Dublicate error: pls check inputs",400);
    }

    console.log(customError.message,customError.status);
    res
    .status(customError.status || 500)
    .json({
        sucess: false,
        message:customError.message || "Uygulama Hatası"
    });
};

module.exports = customErrorHandler

