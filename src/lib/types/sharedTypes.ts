// models from prisma schema
// model User {
//   id        String   @id @default(uuid())
//   email     String   @unique
//   password  String
//   name      String?
//   // зв'язок 1:М з Record
//   records   Record[] // один користувач може мати декілька записів
// }
// model Record {
//   id        String   @id @default(uuid())
//   userId    String   // foreign key
//   user      User     @relation(fields: [userId], references: [id])
//   createdAt DateTime @default(now())
//   // поля для зберігання обсягів
//   electricityKwh Int?
//   gasM3          Int?
//   priceElectricity Decimal?
//   priceGas Decimal?
// }

export interface User {
  id: string;
  email: string;
  name?: string;
}

export type RecordType = "gas" | "electricity";

export interface Records {
  id: string;
  userId: string;
  createdAt: string;
  type: RecordType;
  usage?: number | null;
  price?: number | null;
  nightUsage?: number | null;
  nightPrice?: number | null;
}
