import Cookies from "js-cookie";

const TOKEN = 'token';

/**
 * Verifica se esta logado
 */
export const isLogged = () => {
  const token = Cookies.get(TOKEN);
  return !!token;
};

/**
 * Faz login
 * @param token {string} token authenticado
 * @param remmember {boolean} caso deseje relembrar o login no próximo acesso
 */
export const doLoggin = (token: string, remmember: boolean = false): void => {
  if (remmember) Cookies.set(TOKEN, token, { expires: 999 });
  else Cookies.set(TOKEN, token);
};

/** 
 * Obtem o Token
*/
export const getToken = () => Cookies.get(TOKEN);

/** 
 *  Logout 
*/
export const doLogout = () => {
  Cookies.remove(TOKEN);
};