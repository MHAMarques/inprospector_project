import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate, IUser } from "../../interfaces/users";
import { userResponseSchema, updateUserSchema } from "../../schemas/user.schemas";

const updateUserService = async (userId:string, userInfo: IUserUpdate) => {
    const userRepo = AppDataSource.getRepository(User);
    
    const userData: IUser = await userRepo.findOneBy({id: userId});
    const validUser = await updateUserSchema.validate(userInfo, {stripUnknown: true})
    const updateUser = userRepo.create({
        ...userData,
        ...validUser
    })
    await userRepo.save(updateUser);
    
    const returnUser = await userResponseSchema.validate(updateUser, {stripUnknown: true});
    return returnUser;
}

export default updateUserService;