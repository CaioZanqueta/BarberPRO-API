import prismaClient from "../../prisma";

interface IHaircutRequest {
  user_id: string;
  status: boolean | string;
}

class ListHaircutService {
  async execute({ user_id, status }: IHaircutRequest) {
    const haircut = await prismaClient.haircut.findMany({
      where: {
        user_id,
        status: status === 'true' ? true : false
      }
    })

    return haircut
  }
}

export { ListHaircutService }