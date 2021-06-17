import jwtDecode from 'jwt-decode';

const BASE_URL = 'http://localhost:5000';

export interface IUser {
  email: string;
  password: string;
}

interface ITokenResponse {
  accessToken: string;
  expiresIn: number;
}

class Auth {
  private expiresAt = 0;

  private _token: string | null = null;

  private renewTimeout: number | undefined;

  private _isAdmin = false;

  get token() {
    return this._token;
  }

  get isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  private setSession({ accessToken, expiresIn }: ITokenResponse) {
    const decoded = jwtDecode(accessToken);

    this.expiresAt = expiresIn + new Date().getTime();
    this._isAdmin = decoded.role === 'admin';
    this._token = accessToken;
    clearTimeout(this.renewTimeout);

    this.scheduleRenew();
  }

  async login(user: IUser) {
    this.setSession(await this.postRequest<ITokenResponse>('/authenticate', user));
  }

  async renewSession() {
    this.setSession(await this.postRequest<ITokenResponse>('/refresh_token'));
  }

  async logout() {
    await this.postRequest('/logout');

    this.resetSession();
  }

  scheduleRenew() {
    const delay = this.expiresAt - Date.now();

    if (delay > 0) {
      this.renewTimeout = window.setTimeout(() => {
        this.renewSession();
      }, delay);
    }
  }

  resetSession() {
    this._token = null;
    this.expiresAt = 0;
    this._isAdmin = false;
    clearTimeout(this.renewTimeout);
  }

  private async postRequest<T>(endpoint: string, data = {}): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (resData?.error) {
      throw new Error(resData.error);
    }

    return resData;
  }
}

const authService = new Auth();

export default authService;
