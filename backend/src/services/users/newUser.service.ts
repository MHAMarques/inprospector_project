import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { userResponseSchema } from "../../schemas/user.schemas";

const newUserService = async (userInfo:IUserRequest) => {
    const userRepo = AppDataSource.getRepository(User);
    const newUser = userRepo.create(userInfo);
    
    await userRepo.save(newUser);
    const returnUser = await userResponseSchema.validate(newUser, {stripUnknown: true})
    return returnUser;
}

export default newUserService;