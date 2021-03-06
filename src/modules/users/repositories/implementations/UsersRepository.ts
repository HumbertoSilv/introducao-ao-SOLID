import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  public create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
    });

    this.users.push(newUser);

    return newUser;
  }

  public findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  public findByEmail(email: string): User | undefined {
    const userEmail = this.users.find((user) => user.email === email);

    return userEmail;
  }

  public turnAdmin(receivedUser: User): User {
    const indexUser = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    this.users[indexUser].admin = true;
    this.users[indexUser].updated_at = new Date();

    return this.users[indexUser];
  }

  public list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
