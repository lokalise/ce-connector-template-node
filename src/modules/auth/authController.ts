import {
  getAuthContract,
  postAuthContract,
  postAuthRefreshContract, postAuthResponseContract,
  type PostAuthResultRequestBody,
} from '@lokalise/connector-api-contracts'
import type { FastifyRequest } from 'fastify'
import type {
  GetAuthResponse,
  PostAuthRefreshResponse,
  PostAuthResponse,
  PostAuthResultResponse,
} from './authTypes.ts'
import { AbstractController } from 'opinionated-machine'
import { buildFastifyNoPayloadRoute } from '@lokalise/fastify-api-contracts'

type AuthControllerContractsType = typeof AuthController.contracts

export class AuthController extends AbstractController<AuthControllerContractsType> {
  public static contracts = {
    getAuth: getAuthContract,
    postAuth: postAuthContract,
    postAuthRefresh: postAuthRefreshContract,
    postAuthResponse: postAuthResponseContract,
  } as const

  private getAuth = buildFastifyNoPayloadRoute(getAuthContract, async (_req: FastifyRequest, reply: GetAuthResponse) => {
    await reply.send({
      // type can be either apiToken or OAuth that depends on the app authorization strategy
      type: 'apiToken',
    })
  })

}

export const postAuth = async (req: FastifyRequest, reply: PostAuthResponse) => {
  // Api key flow: delete next line if your connector uses OAuth
  const { authService } = req.diScope.cradle
  const authConfig = await authService.validate(req.integrationConfig)
  // OAuth flow: uncomment next line if your connect uses OAuth otherwise delete it
  // const authConfig = await authService.generateAuthorizationUrl(req.integrationConfig)

  if (!authConfig) {
    await reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  await reply.send(authConfig)
}

export const postAuthRefresh = async (req: FastifyRequest, reply: PostAuthRefreshResponse) => {
  const { authService } = req.diScope.cradle

  const authConfig = await authService.refresh(req.integrationConfig, req.authConfig)

  if (!authConfig) {
    await reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  return reply.send(authConfig)
}

export const postAuthResponse = async (
  req: FastifyRequest<{ Body: PostAuthResultRequestBody }>,
  reply: PostAuthResultResponse,
) => {
  const { authService } = req.diScope.cradle

  const credentials = await authService.getAuthCredentials(req.body)

  if (!credentials) {
    await reply.status(403).send({
      message: 'Authorization failed',
      errorCode: 403,
    })
    return
  }

  return reply.send(credentials)
}
