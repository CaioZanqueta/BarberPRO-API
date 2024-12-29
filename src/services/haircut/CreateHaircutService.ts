import prismaClient from "../../prisma";

interface IHaircutRequest {
  user_id: string;
  name: string;
  price: number;
}

class CreateHaircutService {
  async execute({ user_id, name, price }: IHaircutRequest) {
    if (!name || !price) {
      throw new Error("Error");
    }

    // Verificar quantos modelos esse usuário já tem cadastrado
    const myHaircuts = await prismaClient.haircut.count({
      where: {
        user_id,
      }
    })

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true
      }
    })

    if (myHaircuts >= 3 && user?.subscriptions?.status !== 'active') {
      throw new Error("Not Authorized");
    }

    const haircut = await prismaClient.haircut.create({
      data: {
        name,
        price,
        user_id,
      }
    })

    return haircut
  }
}

export { CreateHaircutService }