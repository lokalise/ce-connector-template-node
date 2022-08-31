import type z from 'zod'

import type { ApiReply } from '../types'

import type { envResponseBody } from './schema'

export type EnvResponseBody = z.infer<typeof envResponseBody>

export type EnvResponse = ApiReply<EnvResponseBody>
