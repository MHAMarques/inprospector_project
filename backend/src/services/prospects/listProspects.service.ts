import AppDataSource from "../../data-source";
import { Prospect } from "../../entities/prospect.entity";
import { User } from "../../entities/user.entity";
import { IProspect, IProspectRequest } from "../../interfaces/prospects";
import { IUser, IUserRequest } from "../../interfaces/users";
import { prospectListSchema } from "../../schemas/prospect.schema";
import { userListSchema } from "../../schemas/user.schemas";

const listProspectsService = async (userId: string): Promise<IProspect[]> => {
    const prospectRepo = AppDataSource.getRepository(Prospect);
    const listProspects = await prospectRepo
    .createQueryBuilder("prospects")
    .where("prospects.user = :user", { user: userId })
    .getMany();
    
    const returnInfo = await prospectListSchema.validate(
        listProspects,
        {
            stripUnknown: true,
        }
    );
    return returnInfo;
}

export default listProspectsService;