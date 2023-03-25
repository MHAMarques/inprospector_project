import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users";
import { userResponseSchema } from "../../schemas/user.schemas";

const getUsersService = async (userId: string): Promise<IUser> => {
    const userRepo = AppDataSource.getRepository(User);
    const getUser = await userRepo
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId })
    .leftJoinAndSelect("user.prospects", "prospects")
    .getOne();
    
    const returnInfo = await userResponseSchema.validate(
        getUser,
        {
            stripUnknown: true,
        }
    );
    return returnInfo;
}

export default getUsersService;