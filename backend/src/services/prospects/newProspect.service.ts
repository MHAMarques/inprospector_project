import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Prospect } from "../../entities/prospect.entity";
import { User } from "../../entities/user.entity";
import { IProspectRequest, IProspectResponse } from "../../interfaces/prospects";
import { prospectResponseSchema } from "../../schemas/prospect.schema";

const newProspectService = async (prospectInfo:IProspectRequest, userId: string): Promise<IProspectResponse>  => {
    const prospectRepo = AppDataSource.getRepository(Prospect);
    
    const userRepo = AppDataSource.getRepository(User);
    const userFound: User = await userRepo.findOneBy({
        id: userId,
    });

    if (!userFound) {
        throw new AppError(409, "User not found");
    }
    
    const newProspect = prospectRepo.create({
        ...prospectInfo,
        user: userFound
    });

    await prospectRepo.save(newProspect);
    const returnProspect = await prospectResponseSchema.validate(newProspect, {stripUnknown: true})
    return returnProspect;
}

export default newProspectService;