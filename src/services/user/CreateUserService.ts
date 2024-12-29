import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface IUserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {

    if (!email) {
      throw new Error("Email not provided")
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userAlreadyExists) {
      throw new Error("User/Email already exists")
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }
}

export { CreateUserService }