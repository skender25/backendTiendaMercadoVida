
import { COLLECTIONS, MESSAGES } from './../../config/constans';
import { IResolvers } from 'graphql-tools';

import ProductsService from '../../services/products.service';



const resolversProductQuery: IResolvers ={
    Query: {
      
        async products(_ , { page, itemsPage,random}, { db }  ){
           
        
            return new ProductsService(_, {
                pagination: { page, itemsPage,random}
            }, { db }).items(random);
        },
        async products2(_ , { page, itemsPage,filter}, { db }  ){
           
        
            return new ProductsService(_, {
                pagination: { page, itemsPage,filter}
            }, { db }).items2(filter);
        },
        async product(_, { id }, { db }) {
            return new ProductsService(_, { id }, { db }).details();
        }
    }
};

export default resolversProductQuery;