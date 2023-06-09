import { ErrorType } from '../Types';

/**
 * Retorna a classe do dado passado: String, Number, Object
 * 
 * @param data {any}
 * @returns {string}
 */
export const classOf = (data: any) => {
	if (data === null) return "Null";
	if (data === undefined) return "Undefined";
	return Object.prototype.toString.call(data).slice(8,-1);
};

/**
 * Reposta de erro, verifica se o data da response é um objeto, caso não, retorna statusText 
 * 
 * @param response {AxiosError}
 * @returns {object}
 */
export const trataErrorResponse = (err: any): ErrorType => {
	if (err.response) {
		if (classOf(err.response?.data) === 'Object') return err.response.data;
		return {error: err.response?.statusText};
	}

	return {error: `${err.message}\n${err.config?.baseURL}${err.config?.url}`};
};

/**
 * Retorna o próprio dado, caso seja null|undefined retorna '' (string vazia)
 * passagem do segunda parâmetro possibilita converter o dado 
 * 
 * @param data {any} dado ser verificado
 * @param type {string|null} (opcional) converte o dado caso ele exista  
 * @param defalut {any} (opcional) valor default
 * @returns {any}
 */
export const get = (data: any, type: string|null = null, defalut: any = '') => {
	if (['Null', 'Undefined'].indexOf(classOf(data)) !== -1) return defalut;
	if (type) {
		switch (type) {
			case 'string': return String(data);
			case 'number': return Number(data);
		}
	}
	return data;
};

/**
 * Converte valor número em moeda
 * 
 * @param number {string|number} número a ser convertido
 * @returns {number}
 */
export const formatMoeda = (number: string|number) => {
	return Number(number).toFixed(2).replaceAll('.', ',');
};

/**
 * Delay de processo
 * 
 * @param time {number} tempo em segundos de espera, default 500ms
 * @returns {null}
 */
export const delay = async (time: number = 500) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(null), time);
	});
}