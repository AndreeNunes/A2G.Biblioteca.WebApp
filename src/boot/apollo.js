import { boot } from 'quasar/wrappers';
import {ApolloClient} from 'apollo-client';
import VueApollo from 'vue-apollo';
import fetch from 'node-fetch';
import {createLink} from 'apollo-absinthe-upload-link';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import schema from '../helper/schema.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
})

const httpLink = createLink({uri: `http://localhost:4000/graphql`, fetch: fetch});

const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ fragmentMatcher }),
  connectToDevTools: true,
});
const apolloProvider = new VueApollo({
  defaultClient: apollo,
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$apollo

  app.config.globalProperties.$apollo = apollo;
  // ^ ^ ^ this will allow you to use this.$apollo (for Vue Options API form)
  //       so you won't necessarily have to import apollo in each vue file
});

export { apollo, VueApollo, apolloProvider };

