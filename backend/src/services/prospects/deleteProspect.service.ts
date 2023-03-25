import AppDataSource from "../../data-source";
import { Prospect } from "../../entities/prospect.entity";
import { User } from "../../entities/user.entity";
import { IProspectUpdate } from "../../interfaces/prospects";
import { IUserUpdate } from "../../interfaces/users";
import { prospectResponseSchema } from "../../schemas/prospect.schema";
import { userResponseSchema } from "../../schemas/user.schemas";

const deleteProspectService = async (prospectId:string) => {
    const prospectRepo = AppDataSource.getRepository(Prospect);
    
    await prospectRepo
        .createQueryBuilder("prospects")
        .delete()
        .where("id = :id", { id: prospectId })
        .execute()

    return;
}

export default deleteProspectService;