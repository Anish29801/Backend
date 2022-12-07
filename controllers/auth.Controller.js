const User = require("../models/User.Schema");
const asyncHandler = require("../services/asyncConverter");
const CustomError = require("../utils/CustomError");
const cookieOptions = require("../utils/CookieHandler");


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
        const isPasswordMatched = await user.comparePassword(password)
    }
)