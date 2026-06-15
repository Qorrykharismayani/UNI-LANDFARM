import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'uni_lanfaram_super_secret_jwt_key_2026_uninside';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  status: string;
}

export function signToken(payload: JWTPayload): string {
  // Encrypt payload inside token expiring in 7 days
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function getSessionFromCookies(cookiesString: string | null): JWTPayload | null {
  if (!cookiesString) return null;
  const match = cookiesString.match(/token=([^;]+)/);
  if (!match) return null;
  return verifyToken(match[1]);
}
