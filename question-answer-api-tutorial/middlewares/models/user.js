const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true,"Lütfen isim giriniz"]
    },
    email:{
        type: String,
        required:[true,"Lütfen Mail Girinizz"],
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Lütfen Geçerli Bir Mail Adresi Giriniz']
    },
    role:{
        type: String,
        default: "user",
        enum : ["user","admin"]
    },
    password:{
        type:String,
        minlength:[6,"Lütfen Daha Uzun Bir Şifre Seçiniz"],
        required: [true,"Lütfen bir şifre sağlayın"],
        select: false

    },
    createdAt : {
        type: Date,
        default : Date.now
    },
    title : {
        type:String
    },
    about : {
        type:String
    },
    place : {
        type: String
    },
    website : {
        type: String
    },
    profile_image : {
        type: String,
        default : "default.jpg"
    },
    blocked : {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateJwtFromUser= function () {
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
  const payload = {
      id: this._id,
      name : this.name

  };
  const token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn : JWT_EXPIRE
  });
  return token;
};

UserSchema.pre("save",function (next){

    //Parola Değişmemişse
    if(!this.isModified("password")){

        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
        if(err) next(err);
        this.password = hash;
        next();
        });
    });
});

    module.exports = mongoose.model("User",UserSchema);
