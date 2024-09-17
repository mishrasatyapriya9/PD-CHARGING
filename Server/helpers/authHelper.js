import bcrypt  from "bcrypt"

// 1st for hashing 
// 2nd for compare and decrypt

const hashPassword  = async(password) =>{
    try {
        //use to make password to hash
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}
export default hashPassword;
// for compare
export const comparePassword = async(password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);
}
