import { JwtPayload } from "jwt-decode"

export interface UserJwtPayload extends JwtPayload {
  email: string
  id: string
  isVerified: boolean
  name?: string
  organization?: string
  role: string
  subscription: string
  createdAt: string
  updatedAt: string
}