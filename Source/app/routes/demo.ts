import { config } from '../services/trpc/init';
import { z as zod } from 'zod';

export const router = config.router({
    hello: config.procedure
      .input(
        zod
          .object({
            text: zod.string().nullish(),
          })
          .nullish(),
      )
      .query(({ input }) => {
        return {
          greeting: `Hello ${input?.text ?? 'world!'}`,
        };
      }),
  });