import AppDataSource from "../../data-source";
import { Prospect } from "../../entities/prospect.entity";
import { IProspectUpdate } from "../../interfaces/prospects";
import { prospectResponseSchema } from "../../schemas/prospect.schema";

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