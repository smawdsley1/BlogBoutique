import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

interface DecodedJwt {
  exp?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isTokenValid(token: string): boolean {
    if (!token) {
      return false;
    }
    try {
      const decoded = decode(token) as DecodedJwt;
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp > currentTime) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }

    //make sure that signature is the correct one
  }
}
