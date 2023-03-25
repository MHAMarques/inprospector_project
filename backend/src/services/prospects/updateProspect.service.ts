import AppDataSource from "../../data-source";
import { Prospect } from "../../entities/prospect.entity";
import { User } from "../../entities/user.entity";
import { IProspectUpdate } from "../../interfaces/prospects";
import { IUserUpdate } from "../../interfaces/users";
import { prospectResponseSchema } from "../../schemas/prospect.schema";
import { userResponseSchema } from "../../schemas/user.schemas";

const updateProspectService = async (prospectId:string, prospectInfo: IProspectUpdate) => {
    const prospectRepo = AppDataSource.getRepository(Prospect);
    
    const prospectData = await prospectRepo.findOneBy({id: prospectId});
    const updateProspect = prospectRepo.create({
        ...prospectData,
        ...prospectInfo
    })
    await prospectRepo.save(updateProspect);
    
    const returnProspect = await prospectResponseSchema.validate(updateProspect, {stripUnknown: true});
    return returnProspect;
}

export default updateProspectService;