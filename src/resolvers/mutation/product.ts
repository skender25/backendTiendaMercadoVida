import { IResolvers } from 'graphql-tools';
import ProductsService from '../../services/products.service';



const resolversProductMutation: IResolvers ={
    Mutation: {
      addProducts(_, variables, context) {
        // Añadimos la llamada al servicio
        return new ProductsService(_, variables, context).insert();
      },
      updateProducts(_, variables, context) {
        // Añadimos la llamada al servicio
        return new ProductsService(_, variables, context).modify();
      },
      deleteProducts(_, variables, context) {
        // Añadimos la llamada al servicio
        return new ProductsService(_, variables, context).delete();
      },
      blockProducts(_, variables, context) {
        return new ProductsService(_, variables, context).block();
      },
    }
};

export default resolversProductMutation;