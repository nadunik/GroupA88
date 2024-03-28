import UserModel from '../Models/User.model.js'
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken'; 
import ENV from '../config.js';
import otpgenerator from 'otp-generator';

export async function verifyUser(req,res,next){
    try {

        const { userame } = req.method == "GET" ? req.query : req.body;

        let exit = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can not find user."});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

export async function register(req, res){
    try {
        const { username, password, profile, email } = req.body;

        const existUsername = new Promise((resolve, rejecct) => {
            UserModel.findOne({ username }, function(err,user){
                if(err) rejecct(new Error(err))
                if(user) rejecct({ error : "Please add another username"});

                resolve();
            })
        });

        const existEmail = new Promise((resolve, rejecct) => {
            UserModel.findOne({ email }, function(err,email){
                if(err) rejecct(new Error(err))
                if(email) rejecct({ error : "Add an uniqe email"});

                resolve();
            })
        });

        Promise.all([existUsername, existEmail])
             .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                       .then( hashedPassword => {

                          const user = new UserModel({
                            username,
                            password: hashedPassword,
                            profile: profile || '',
                            email
                          });

                          user.save()
                              .then(result => res.status(201).send({msg: "User Registered Successfully."}))
                              .catch(error => res.status(500).send({error}))

                       }).catch(error =>{
                        return res.status(500).send({
                            error : "enable to hashed password"
                        })
                       })
                }
             }).catch(error => {
                return res.status(500).send({ error })
             })

    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function login(req, res){
    
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                   .then(passwordCheck => {
                       
                        if(!passwordCheck) return res.status(400).send({ error: "Doesn't have password"})

                        const token = jwt.sign({
                                      userId: user._id,
                                      username: user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});
                        return res.status(200).send({
                            msg: "Login Successful",
                            username: user.username,
                            token
                        })           

                   })
                   .catch(error =>{
                      return res.status(400).send({ error: "Password does not match"})
                   })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not found"});
            })
    } catch (error) {
        return res.status(500).send({error});
    }
}

export async function getUser(req, res){
    
    const { username } = req.params;

    try {
        if(!username) return res.status(501).send({ error : "Invalid username"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({err});
            if(!user) return res.status(501).send({ error : "Couldn't find the user"});

            const { password, ...rest} = object.assign({}, user.toJSON());

            return res.status(201).send(user);
        })
    } catch (error) {
        return res.status(404).send({ error : "Cannot find user data"});
    }
}

export async function updateuser(req, res){
    try{
        // const id = req.query.id;
        const { userId } =req.user;

        if(id){
            const body = req.body;
            UserModel.updateOne({_id : userId}, body, function(err,data){
                if(err) throw err;

                return res.status(201).send({ msg : "record updated"});
            })
        }
        else{
            return res.status(401).send({ error : "User not found"});
        }
    }
    catch(error) {
        return res.status(401).send({ error });
    }
}

export async function generateOTP(req, res){
    req.app.locals.OTP = await otpgenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
    res.status(201).send({ code: req.app.locals.OTP })
}

export async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP)=== parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: 'Verify Successfully'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}

export async function createResetSession(req, res){
    res.json('createResetSession route');
}

export async function resetPassword(req, res){
    res.json('resetPassword route');
}
