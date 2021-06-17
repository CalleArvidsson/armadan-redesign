import auth0 from 'auth0-js';

const REDIRECT_URI = window.location.origin;
const DB_CONN = 'Armadan-users';

class Auth {
  constructor() {
    this.expiresAt = null;
    this.idToken = null;
    this.renewTimout = null;

    this.auth0 = new auth0.WebAuth({
      domain: 'carvid.eu.auth0.com',
      clientID: 'iTyMNpb5qyoqA0NboFAd1VGbcAgOwvrh',
      audience: 'https://armadan.se/api',
      redirectUri: `${REDIRECT_URI}/auth`,
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  getAccessToken = () => this.accessToken;

  getIdToken = () => this.idToken;

  isAuthenticated = () => new Date().getTime() < this.expiresAt;

  isAdmin = () => this.admin;

  login = user => {
    return new Promise((resolve, reject) => {
      this.auth0.login({ realm: DB_CONN, ...user }, err => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  };

  setSession = authResult => {
    localStorage.setItem('is_logged_in', 'true');

    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.admin = authResult.idTokenPayload['https://armadan.se/roles'].roles.includes('Admin');

    this.scheduleRenew();
  };

  renewSession = () => {
    return new Promise((resolve, reject) => {
      // this.auth0.checkSession({}, (err, authResult) => {
      //   if (authResult && authResult.accessToken && authResult.idToken) {
      //     this.setSession(authResult);
      //     resolve(authResult);
      //   } else if (err) {
      //     this.resetSession();
      //     reject(err);
      //   }
      // });
      resolve();
    });
  };

  scheduleRenew = () => {
    const delay = this.expiresAt - Date.now();

    if (delay > 0) {
      this.renewTimout = setTimeout(() => {
        this.renewSession();
      }, delay);
    }
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else {
          reject(err);
        }
      });
    });
  };

  resetSession = () => {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    clearTimeout(this.renewTimout);

    localStorage.removeItem('is_logged_in');
  };

  changePassword = email => {
    return new Promise((resolve, reject) => {
      this.auth0.changePassword(
        {
          connection: DB_CONN,
          email
        },
        err => {
          if (err) {
            return reject(err);
          }

          return resolve();
        }
      );
    });
  };

  logout = () => {
    this.resetSession();

    this.auth0.logout({
      clientID: 'iTyMNpb5qyoqA0NboFAd1VGbcAgOwvrh',
      returnTo: `${REDIRECT_URI}/login`
    });
  };
}

const authService = new Auth();

export default authService;
