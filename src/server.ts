import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user-routes";
import { contactsRoutes } from "./routes/contacts-route";

// logger true, mostra informações no terminal sobre a aplicação
const app: FastifyInstance = fastify({ logger: true });

// Registrando as rotas
app.register(userRoutes, {
  // Definindo o prefixo da rota
  prefix: "/users"
})

app.register(contactsRoutes, {
  prefix: "/contacts"
})

app.listen(
  {
    port: 3000,
  },
  () => console.log("Server rodando na porta 3000")
);
