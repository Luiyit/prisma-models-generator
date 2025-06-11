export const MODEL_TYPES_TEMPLATE_V6 =`
import { Prisma, #!{MODEL_NAME} } from '@prisma/client';

type New#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}CreateInput;
type update#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}UpdateInput;

export { type #!{MODEL_NAME}, type New#!{MODEL_NAME}, type update#!{MODEL_NAME} };
`;
