export const decodeBase64 = (data: string): Record<string, unknown> => {
  const buffer = Buffer.from(data, 'base64')
  return JSON.parse(buffer.toString('utf-8')) as Record<string, unknown>
}

export const encodeBase64 = (data: Record<string, unknown>): string => {
  const buffer = Buffer.from(JSON.stringify(data), 'utf-8')
  return buffer.toString('base64')
}
