import {darkTheme, lightTheme} from '../Components/Templates/PSTheme';

// Singleton Class to store Token
class SingleTonObject {
  static instance: SingleTonObject | undefined;
  token?: string;
  _user?: any;

  static getInstance() {
    if (!this.instance) {
      this.instance = new SingleTonObject();
    }
    return this.instance;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setUser(user: any) {
    this._user = user;
  }

  getUser() {
    return this._user;
  }
}

// Helper Methods for Get and set token
export function getTheme(_isDark: boolean = false) {
  return _isDark ? darkTheme : lightTheme;
}

export function getToken(): string | undefined {
  return SingleTonObject.getInstance().getToken();
}

export function setToken(token: string) {
  SingleTonObject.getInstance().setToken(token);
}

export function getCurrentUser(): any {
  return SingleTonObject.getInstance().getUser();
}

export function setCurrentUser(user: any) {
  SingleTonObject.getInstance().setUser(user);
}
