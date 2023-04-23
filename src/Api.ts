import axios from "axios";
import { CategoryType, ErrorType } from './Types';
import { trataErrorResponse } from "./Helpers";

const http = axios.create({
  baseURL: 'http://localhost:3001'
});

export const api = {

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
};