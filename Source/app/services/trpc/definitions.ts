import {config} from './init'

import { router as DemoRouter } from '../../routes/demo'

export const appRouter = config.router({
    demo: DemoRouter,
})
   
export type AppRouter = typeof appRouter;
   