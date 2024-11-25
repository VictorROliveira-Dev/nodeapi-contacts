import { prisma } from "../database/prisma-client";
import {
  Contact,
  ContactCreateData,
  ContactRepository,
} from "../interfaces/contact-interface";

class ContactRepositoryPrisma implements ContactRepository {
  async create(data: ContactCreateData): Promise<Contact> {
    const result = await prisma.contacts.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        userId: data.userId,
      },
    });
    return result;
  }
  async findByEmailOrPhone(
    email: string,
    phone: string
  ): Promise<Contact | null> {
    const result = await prisma.contacts.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone,
          },
        ],
      },
    });

    return result || null;
  }

  async findAllContacts(userId: string): Promise<Contact[]> {
    const result = await prisma.contacts.findMany({
      where: {
        userId,
      },
    });

    return result;
  }

  async update({ id, name, email, phone }: Contact): Promise<Contact> {
    const result = await prisma.contacts.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
      },
    });

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.contacts.delete({
      where: {
        id,
      },
    });

    return result ? true : false;
  }
}

export { ContactRepositoryPrisma };
