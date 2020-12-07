import AppID from 'ibmcloud-appid-js';


export class AuthService {
  appID = new AppID();

  constructor() { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  async init() {
    console.log('initializing appId');
    try {
      await this.appID.init({
        clientId: '2bf93ce7-d7a4-4db2-aef7-11f5eb36992c',
        discoveryEndpoint: 'https://eu-de.appid.cloud.ibm.com/oauth/v4/51df018e-bdfa-46ab-a7a0-9bc7fb4f5d44/.well-known/openid-configuration'
      });
    } catch (e) {
      alert(e);
    }
  }
  // tslint:disable-next-line:typedef
  async login() {
    try{
      const tokens = await this.appID.signin();
      const decodeIDTokens = tokens.idTokenPayload;
      const userName = 'Hi ' + decodeIDTokens.name + ', Congratulations!';
      console.log(userName);
      sessionStorage.setItem('token', JSON.stringify(tokens));
    }catch (e){
      console.error(e);
    }
  }

  isAuthenticated(): boolean{
    if (sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== null){
      return true;
    }
    return false;
  }

  getRoles(): string[]{
    if (this.isAuthenticated()){
      const tokens = JSON.parse(sessionStorage.getItem('token'));
      return tokens.accessTokenPayload.roles;
    }
  }

  getUsername(): string{
    if (this.isAuthenticated()){
    const tokens = JSON.parse(sessionStorage.getItem('token'));
    return tokens.idTokenPayload.name; }
  }

  getAccessToken(): string {
    if (this.isAuthenticated()){
    const tokens = JSON.parse(sessionStorage.getItem('token'));
    return tokens.accessToken; }
  }

  isAdmin(): boolean {
    if (this.isAuthenticated()){
    const roles = this.getRoles();
    if (roles.includes('amministratore')) { return true; }
    return false; }else {
      return false;
    }
  }

  isEveryOneButNotOpComunale(): boolean {
    if (this.isAuthenticated()){
    const roles = this.getRoles();
    if (!roles.includes('operatore_comunale')) { return true; }
    return false; }else {
      return false;
    }
  }

  isAdminOrOpComunale(): boolean {
    if (this.isAuthenticated()){
    const roles = this.getRoles();
    if (!roles.includes('operatore_biglietteria') && !roles.includes('operatore_biglietteria_comunale')) { return true; }
    return false; }else {
      return false;
    }
  }

  isOperatoreBiglietteriaComunale(): boolean {
    if (this.isAuthenticated()){
    const roles = this.getRoles();
    if (roles.includes('operatore_biglietteria_comunale')) { return true; }
    return false; }else {
      return false;
    }
  }
}
