import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user-usecase";
import { UserCreate } from "../interfaces/user-interface";

// Rotas da aplicação
export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/", async (req, res) => {
    const { name, email } = req.body;
    try {
      const data = await userUseCase.create({
        name,
        email,
      });
      return res.send(data);
    } catch (error) {
      res.send(error);
    }
  });

  fastify.get("/", (req, res) => {
    res.send({ hello: "world" });
  });
}
