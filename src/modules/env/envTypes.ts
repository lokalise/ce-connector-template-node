import type z from 'zod'

import type { ApiReply } from '../commonTypes.js'

import type { envResponseBody } from './envSchemas.js'

export type EnvResponseBody = z.infer<typeof envResponseBody>

export type EnvResponse = ApiReply<EnvResponseBody>
