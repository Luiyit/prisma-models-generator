import { PrismaClient as Client } from '@prisma/client';

export default class PrismaClient {
  private static _instance: PrismaClient;
  private client: Client;

  private constructor() {
    this.client = new Client();
    this.client.user.findMany({
      where: { email: '' },
    });
  }

  public static getInstance(): PrismaClient {
    if (!PrismaClient._instance) {
      PrismaClient._instance = new PrismaClient();
    }

    return PrismaClient._instance;
  }

  public static getClient(): Client {
    return this.getInstance().client;
  }
}
