import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRespository } from "../repositories/UsersRepository"

class UsersService{
  private usersRepository: Repository<User>

  constructor(){
    this.usersRepository =  getCustomRepository(UsersRespository);
  }
  async create(email: string){
    //verificar se usuario existe 
    const userExists = await this.usersRepository.findOne({
      email,
    });

  //se existir, retornar user
    if(userExists){
      return userExists;
    }

    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    //se não existir, salvar no DB
    return user;
  }
}

export { UsersService };