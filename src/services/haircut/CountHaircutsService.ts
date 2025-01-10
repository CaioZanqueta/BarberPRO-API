import prismaClient from "../../prisma";

interface ICountRequest {
  user_id: string;
}

class CountHaircutsService {
  async execute({ user_id }: ICountRequest) {
    const count = await prismaClient.haircut.count({
      where: {
        user_id
      }
    })

    return count
  }
}

export { CountHaircutsService }