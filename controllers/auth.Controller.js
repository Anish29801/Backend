const User = require("../models/User.Schema");
const asyncHandler = require("../services/asyncConverter");
const CustomError = require("../utils/CustomError");
const {cookieOptions , cookieDeleter } = require("../utils/CookieHandler");
const Mailer = require("../services/MailServices")


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

// @Reset Password

export const ResetPwd = asyncHandler(
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
            
            throw new CustomError(error.message,500)
            
        }
    }
)