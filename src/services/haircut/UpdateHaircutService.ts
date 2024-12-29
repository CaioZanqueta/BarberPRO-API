import prismaClient from "../../prisma";

interface IHaircutRequest {
  user_id: string;
  haircut_id: string;
  name: string;
  price: number;
  status: boolean | string;
}

class UpdateHaircutService {
  async execute({user_id, haircut_id, name, price, status = true }: IHaircutRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      include: {
        subscriptions: true
      }
    })

    if (user?.subscriptions?.status !== 'active') {
      throw new Error("Not authorized");
    }

    const haircut = await prismaClient.haircut.update({
      where: {
        id: haircut_id,
      },
      data: {
        name,
        price,
        status: status === true ? true : false
      }
    })

    return haircut
  }
}

export { UpdateHaircutService }