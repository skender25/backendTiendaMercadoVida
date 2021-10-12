import { findOneElement , asignDocumentId, randomItems, randomItems2 } from './../lib/db-operations';
import { COLLECTIONS } from '../config/constans';
import { IContextData } from '../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.services';
import slugify from 'slugify';


class ProductsService extends ResolversOperationsService {
    collection = COLLECTIONS.PRODUCTS;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    async items(random: Boolean = false ,
        otherFilters: object = {}) {
        let filter: object = { active: { $ne: false } };
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;
        console.log(this.getVariables().pagination);
        console.log(page, itemsPage);
        if(!random){
                const result = await this.list(
                this.collection, 'productos de la tienda'
                ,page, itemsPage);
            return { 
                info: result.info ,
                status: result.status,
                message: result.message,
                products: result.items };
       
        }
     //   const result = await this.list(this.collection, 'productos',page, itemsPage);
      //  return { info: result.info , status: result.status, message: result.message, products: result.items };
      const result: Array<object> = await randomItems(
        this.getDb(),
        this.collection,
        filter,
        itemsPage
      ); 
      if (result.length === 0 || result.length !== itemsPage) {
        return {
          info: { page: 1, pages: 1, itemsPage, total: 0},
          status: false,
          message: 'La información que hemos pedido no se ha obtenido tal y como deseabamos',
          products: [],
        };
      }
      return {
        info: { page: 1, pages: 1, itemsPage, total: itemsPage},
        status: true,
        message: 'La información que hemos pedido se ha cargado correctamente',
        products: result,
      };
   
    }
    async items2(filter: object = {}) {
       // let filter: object = { active: { $ne: false } };
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;
        console.log(this.getVariables().pagination);
        console.log(page, itemsPage);
       
     //   const result = await this.list(this.collection, 'productos',page, itemsPage);
      //  return { info: result.info , status: result.status, message: result.message, products: result.items };
      const result: Array<object> = await randomItems2(
        this.getDb(),
        this.collection,
        filter,
        itemsPage
      ); 
      return { 
        info: { page: 1, pages: 1, itemsPage, total: itemsPage},
        status: true,
        message: 'La información que hemos pedido se ha cargado correctamente',
        products: result,
      };

   
    }

    async details() {
        const result = await this.get(this.collection);
        return { status: result.status, message: result.message, product: result.item };
    }

    async insert() {
        const product = this.getVariables().product;
        const productor = this.getVariables().productor;
        const precio_unidad = this.getVariables().precio_unidad;
        const catregoria = this.getVariables().catregoria;
        const unidad = this.getVariables().unidad;
        const org = this.getVariables().org;
        const imagen = this.getVariables().imagen;
        const cantidad_disp = this.getVariables().cantidad_disp;
        // Comprobar que no está en blanco ni es indefinido
        if (!this.checkData(product || '')) {
            return {
                status: false,
                message: 'El producto no se ha especificado correctamente',
                product: null
            };
        }
        // COmprobar que no existe
        if (await this.checkInDatabase( product || '')) {
            return {
                status: false,
                message: 'El producto existe en la base de datos, intenta con otro género',
                product: null
            };
        }
        // Si valida las opciones anteriores, venir aquí y crear el documento
        const productObject = {
            id: await asignDocumentId(this.getDb(), this.collection, {  _id: -1}),
            name: product,
            productor: slugify(productor || '', { lower: true }),
            catregoria: catregoria,
            precio_unidad : precio_unidad,
            unidad: unidad,
            imagen: imagen,
            cantidad_disp: cantidad_disp,
            org: org
    
        };
        console.log(productObject)
        const result = await this.add(this.collection, productObject, 'productos');
        return { status: result.status, message: result.message, product: result.item };
    }
  
    async modify() {
        const id = this.getVariables().id;
        const product = this.getVariables().product;
        const productor = this.getVariables().productor;
        const precio_unidad = this.getVariables().catregoria;
        const catregoria = this.getVariables().precio_unidad;
        const unidad = this.getVariables().unidad;
        const org = this.getVariables().org;
        const imagen = this.getVariables().imagen;
        const cantidad_disp = this.getVariables().cantidad_disp;

        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del género no se ha especificado correctamente',
                genre: null
            };
        }
        if (!this.checkData(product || '')) {
            return {
                status: false,
                message: 'El género no se ha especificado correctamente',
                product: null
            };
        }
        const objectUpdate = { 
            name: product ,
            productor: productor,
            catregoria: catregoria,
            precio_unidad : precio_unidad,
            unidad: unidad,
            imagen: imagen,
            cantidad_disp: cantidad_disp,
            org: org
        };
        
        const result = await this.update(this.collection, { id }, objectUpdate, 'productos');
        return { status: result.status, message: result.message, product: result.item };
    }

    async delete() {
        const id = this.getVariables().id;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del producto no se ha especificado correctamente',
                product: null
            };
        }
        const result = await this.del(this.collection, { id }, 'product');
        return { status: result.status, message: result.message };
    }

    async block() {
        const id = this.getVariables().id;
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del producto no se ha especificado correctamente',
                genre: null
            };
        }
        const result = await this.update(this.collection, { id }, { active: false }, 'productos');
        return {
            status: result.status,
            message: (result.status) ? 'Bloqueado correctamente': 'No se ha bloqueado comprobarlo por favor'
        };
    }

    private checkData(value: string) {
        return (value === '' || value === undefined) ? false: true;
    }

    private async checkInDatabase(value: string) {
        return await findOneElement(this.getDb(), this.collection, {
            name: value
        });
    }
}

export default ProductsService;