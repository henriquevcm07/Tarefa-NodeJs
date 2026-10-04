export interface HashProvider {
  compare(plain: string, hash: string): Promise<boolean>
}
