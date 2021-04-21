import { getCustomRepository } from "typeorm"
import { UsersRespository } from "../repositories/UsersRepository"

class UsersService{
  async create(email: string){
    const usersRepository = getCustomRepository(UsersRespository);
    //verificar se usuario existe
    const userExists = await usersRepository.findOne({
      email,
    });

  //se existir, retornar user
    if(userExists){
      return userExists;
    }

    const user = usersRepository.create({
      email,
    });

    await usersRepository.save(user);

    //se não existir, salvar no DB
    return user;
  }
}

export { UsersService };