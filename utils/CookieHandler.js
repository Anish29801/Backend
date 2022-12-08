
const cookieOptions ={
    expiresIn : new Date(Date.now() + 3*24*60 *60*1000),
    httpOnly : true,
}
const cookieDeleter = {
    expiresIn : new Date(Date.now()),
    httpOnly : true,
}

export default {cookieOptions , cookieDeleter};