import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact-usercase";
import { authMiddleware } from "../middlewares/auth-middleware";
import { Contact, ContactCreate } from "../interfaces/contact-interface";

export async function contactsRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  // Adicionando autenticação via middleware para testes
  fastify.addHook("preHandler", authMiddleware);
  fastify.post<{ Body: ContactCreate }>("/", async (req, res) => {
    const { name, email, phone } = req.body;
    const emailUser = req.headers["email"];
    try {
      const data = await contactUseCase.create({
        email,
        name,
        phone,
        userEmail: emailUser,
      });
      return res.send(data);
    } catch (error) {
      res.send(error);
    }
  });

  fastify.get("/", async (req, res) => {
    const emailUser = req.headers["email"];

    try {
      const data = await contactUseCase.listAllContacts(emailUser);
      return res.send(data);
    } catch (error) {
      res.send(error);
    }
  });

  fastify.put<{ Body: Contact; Params: { id: string } }>(
    "/:id",
    async (req, res) => {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      try {
        const data = await contactUseCase.update({
          id,
          name,
          email,
          phone,
        });
        return res.send(data);
      } catch (error) {
        res.send(error);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const data = await contactUseCase.delete(id);
      return res.send(data);
    } catch (error) {
      return res.send(error);
    }
  });
}
