export const MODEL_TYPES_TEMPLATE =`
import { Prisma, #!{MODEL_NAME} } from '@prisma/client';

type New#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}CreateArgs['data'];
type update#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}UpdateArgs['data'];

export { type #!{MODEL_NAME}, type New#!{MODEL_NAME}, type update#!{MODEL_NAME} };
`;