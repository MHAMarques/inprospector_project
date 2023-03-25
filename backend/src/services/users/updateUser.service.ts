import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { userResponseSchema } from "../../schemas/user.schemas";

const updateUserService = async (userId:string, userInfo: IUserUpdate) => {
    const userRepo = AppDataSource.getRepository(User);
    
    const userData = await userRepo.findOneBy({id: userId});
    const updateUser = userRepo.create({
        ...userData,
        ...userInfo
    })
    await userRepo.save(updateUser);
    
    const returnUser = await userResponseSchema.validate(updateUser, {stripUnknown: true});
    return returnUser;
}

export default updateUserService;