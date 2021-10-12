import enviroment from './enviroments';


if (process.env.NODE_ENV !== 'production'){
    const env = enviroment;
}

export const SECRET_KEY = process.env.SECRET || 'MercadoSecretDona1452';


export enum COLLECTIONS{
    USERS ='users',
    PRODUCTS= 'products'
}

export enum MESSAGES{
    TOKEN_VERIFICATION_FAILED= 'token no valido inicie sesion de nuevo'
}

/**
 * H horas
 * M minutos
 * D dias
 */

export enum EXPIRETIME{
    H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3

}