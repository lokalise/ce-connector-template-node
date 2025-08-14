import type z from 'zod/v4'

import type { ApiReply } from '../commonTypes.ts'

import type { envResponseBody } from './envSchemas.ts'

export type EnvResponseBody = z.infer<typeof envResponseBody>

export type EnvResponse = ApiReply<EnvResponseBody>
