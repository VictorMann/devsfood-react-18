import axios from "axios";
import { CategoryType, ErrorType, ProductType } from './Types';
import { trataErrorResponse } from "./Helpers";
import { UserType, EnderecoType } from './Types';
import { getToken } from "./Helpers/auth";  

const http = axios.create({
  baseURL: 'http://localhost:3001'
});

const wsViaCEP = 'https://viacep.com.br/ws/{{CEP}}/json/'; // https://viacep.com.br/

export const api = {
  
  /**
   * dados do usuário logado
   * @returns 
   */
  async user() {
    let data: UserType | ErrorType | any;
    try {
      const resp = await http.get('/user', { headers: { Authorization: getToken() } } );
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }

    return data;
  },

  /**
   * Login
   * @param email 
   * @param password 
   * @returns 
   */
  async login(email: string, password: string) {
    let data: any;
    try {
      const resp = await http.post('/login', { email, password });
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }
    return data;
  },

  /**
   * Cadastro de Usuário
   * @param user 
   * @param end 
   * @returns 
   */
  async register(user: UserType, end: EnderecoType) {
    let data: any;
    try {
      const resp = await http.post('/register', { user, end });
      data = resp.data;
    } catch(e: any) {
      data = trataErrorResponse(e);
    }
    return data;
  },

  /**
   * Retorna a lista de Categorias
   * 
   * @returns 
   */
  async categories() {
    let data: CategoryType[] | ErrorType | any;
    try {
      const resp = await http.get('/categories');
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }

    return data;  
  },

  /**
   * Retorna a lista de Categorias
   * 
   * @returns 
   */
  async products(filters: Object) {
    let data: ProductType[] | ErrorType | any;
    try {
      const resp = await http.get('/products', { params: filters });
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }

    return data;  
  },

  /**
   * Consulta CEP via Web Service (Serviço: https://viacep.com.br/)
   * @param cep {string}
   * @returns 
   */
  async getCEP(cep: string = '02041040') {
    let data: ErrorType | any;
    try {
      let xCep = cep.replace(/\D/g, ''); // somente número
      let url = wsViaCEP.replace('{{CEP}}', xCep);
      const resp = await axios.get(url);
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }
    return data;
  },

  async editEnd(end: EnderecoType) {
    let data: ErrorType | any;
    try {
      const resp = await http.put('/endereco', end, { headers: { Authorization: getToken() } });
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }
    return data;
  },

  async orderStore(cart: any[], valor: number) {
    let data: ErrorType | any;
    try {
      const resp = await http.post('/order', {cart, valor}, { headers: { Authorization: getToken() } });
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }
    return data;
  },

  async orderAll() {
    let data: ErrorType | any;
    try {
      const resp = await http.get('/order', { headers: { Authorization: getToken() } });
      data = resp.data;
    } catch (e: any) {
      data = trataErrorResponse(e);
    }
    return data;
  },
};

