import GMR from 'graphql-merge-resolvers';
import resolversMailMutation from './email';
import resolversProductMutation from './product';
import resolversUserMutation from './user';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversProductMutation,
    resolversMailMutation
]);

export default mutationResolvers;