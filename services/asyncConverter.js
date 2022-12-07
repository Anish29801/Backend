const asyncHandler = 
(func) =>
async (req,res,next)=>{
    try {
        await func(req,res,next)
    } catch (error) {
        res.status(401).json(
            {
                success : false,
                message : "Something Went Wrong"
            }
        )
    }
}