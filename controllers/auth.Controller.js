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
    }
) 