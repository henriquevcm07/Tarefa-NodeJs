export interface TokenPayload {
  id: number
  role?: string
}

export interface TokenProvider {
  generate(payload: TokenPayload): Promise<string>
}
