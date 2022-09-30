export const decodeBase64 = (data: string): Record<string, unknown> | undefined => {
  const buffer = Buffer.from(data, 'base64')
  try {
    return JSON.parse(buffer.toString('utf-8')) as Record<string, unknown>
  } catch (e) {
    return undefined
  }
}

export const encodeBase64 = (data: Record<string, unknown>): string => {
  const buffer = Buffer.from(JSON.stringify(data), 'utf-8')
  return buffer.toString('base64')
}
