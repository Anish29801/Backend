const User = require("../models/User.Schema");
const asyncHandler = require("../services/asyncConverter");
const CustomError = require("../utils/CustomError");
const {cookieOptions , cookieDeleter } = require("../utils/CookieHandler");
const Mailer = require("../services/MailServices")
import crypto from ("crypto")


// @SignUp
export const SignUp = asyncHandler(
    async function (req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new CustomError("Please Fill All the Details !", 401);
    }

        //Check if User Exists
        const ExistingUser = await User.findOne({ email });
        if(ExistingUser){
            throw new CustomError("User Already Exists !", 401);
            }

            // Creating User
            const user = await User.create({
                name,
                email,
                password
            })
            const token = user.getJwtToken();
            user.password = undefined;

            res.cookie("token",token,cookieOptions)

            res.status(200).json({
                success : true,
                message : "User Sign Up Successful",
                token,
                user
            })
    }
) 

// @LogIn

export const LogIn = asyncHandler(
    async function (req, res) {
    const { email, password } = req.body;

    if(!email || !password){
        throw new CustomError("Please Fill All the Details !", 401);
        }
    const user = await User.findOne({ email }).select("+password");

    if(!user){
        throw new CustomError("User Not Found In Records !", 401);
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            throw new CustomError("Retry Login",401);
        }
    else{ 
        const token = user.getJwtToken();
        user.password = undefinded;
        res.cookie("token",token,cookieOptions);
        return res.status(200).json({
            success : true,
            message : "Login Success",
            token,
            user
        })
        }
    }

)

// @LogOut

export const LogOut = asyncHandler(
    async function (req, res) {
        res.cookie("token",null,cookieDeleter);
        return res.status(200).json({
            success : true,
            message : "Logout Success",
        })
    }
)

// @Reset Password Emailer

export const ResetPwdEmailer = asyncHandler(
    async function (req,res) {
        const { email } = res.body;
        if(!email){
            throw new CustomError("Email not entered properly",401)
        }
        const FoundUser = await User.findOne({email});
        
        if(!FoundUser){
            throw new CustomError("Details Not Match !", 401)
        }
        const ForgotPwdToken = user.getForgetPasswordToken()
        await user.save({vaildateBeforeSave : false})

        const ResetPwdUrl = `${req.protocol}://${req.hostname}/api/auth/password/reset/${ForgotPwdToken}`
        const Mailmessage = `Youe Link : \n\n
        ${ResetPwdUrl}\n\n
        `

        try {
            
            await Mailer({
                email:user.email,
                subject:process.env.SUBJECT,
                text:Mailmessage,
            })
            res.status(200).json({
                success: true,
                message : "Email Send !"
            })
        } catch (error) {

            user.ForgotPasswordToken = undefined
            user.ForgotPasswordExpiry = undefined
            await user.save({vaildateBeforeSave : false})


            throw new CustomError(error.message,500)
            
        }
    }
)

// @Reset Password
export const ResetPwd = asyncHandler(
    async function (req,res) {
        const {token : ResetPwdToken} = req.params;
        const { password,confirmPassword } = req.body;
        const ResetPwdGenToken = crypto
        .createhash("sha256")
        .update(ResetPwdToken)
        .digest('hex');
        
        const UserWithPasswordToken = await user.findOne({
            ForgotPasswordToken:ResetPwdGenToken,
            ForgotPasswordExpiry: {$gt:Date.now()}
        })

        if(!UserWithPasswordToken){
            throw new CustomError("Token Invaild !",401)
        }

        if(password !== confirmPassword){
            throw new CustomError("Password did'nt match !",401);
        }
        user.password = confirmPassword;
        user.ForgotPasswordToken = undefined;
        user.ForgotPasswordExpiry = undefined;

        await user.save();

        const ConfirmToken = user.getJwtToken();
        user.password = undefined;

        res.cookie("token",ConfirmToken,cookieOptions)
        res.status(200).json({
            success : true,
            message : "Operation Sucessful",
            
        })

    }
)


// @Dashboard
//@User Profile

export const GetProfile = asyncHandler(
    async function (req, res) {
        const {user} = req;
        if(!user){
            throw new CustomError("User Not Found !",404)
        }
        res.status(200).json({
            success : true,
            user
        })
    })