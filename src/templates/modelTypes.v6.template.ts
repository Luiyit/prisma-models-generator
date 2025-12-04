export const MODEL_TYPES_TEMPLATE_V6 =`
import { Prisma, #!{MODEL_NAME} } from "@prisma/client";

type New#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}CreateInput;
type update#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}UpdateInput;
type FindOne#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}WhereInput;
type FindMany#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}WhereInput;

export { 
    type #!{MODEL_NAME}, 
    type New#!{MODEL_NAME}, 
    type update#!{MODEL_NAME}, 
    type FindOne#!{MODEL_NAME}, 
    type FindMany#!{MODEL_NAME},
};

`;
