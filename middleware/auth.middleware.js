const user = require("../models/User.Schema");
const JWT = require("jsonwebtoken");
const asyncHandler = require("../services/asyncConverter");
const CustomError = require("../utils/CustomError");
const {cookieOptions , cookieDeleter } = require("../utils/CookieHandler");

export const isLoggedIn = asyncHandler(
    async function (req, res,next) {
        let token;

        if(req.cookies.token ||
            (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
                token = req.cookies.token || req.headers.authorization.split(" ")[1];
            }
            if(!token){
                throw new CustomError("No Token Found !", 402)
            }

            try {
                const decodedToken = JWT.verify(token,process.env.JWT_SERCET)
               req.user = await User.findById(
                    decodedToken._id,
                    "name email role"
                )
                next();
            } catch (error) {
                throw new CustomError("No Token Found !", 402)

            }
    })