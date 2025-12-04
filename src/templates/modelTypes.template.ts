export const MODEL_TYPES_TEMPLATE =`
import { Prisma, #!{MODEL_NAME} } from "@prisma/client";

type New#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}CreateArgs["data"];
type update#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}UpdateArgs["data"];
type FindFirst#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}FindFirstArgs["where"];
type FindMany#!{MODEL_NAME} = Prisma.#!{MODEL_NAME}FindManyArgs["where"];

export { 
    type #!{MODEL_NAME}, 
    type New#!{MODEL_NAME}, 
    type update#!{MODEL_NAME}, 
    type FindOne#!{MODEL_NAME}, 
    type FindMany#!{MODEL_NAME},
};

`;
