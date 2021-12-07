<template>
  <q-page class="q-mr-md q-ml-md q-mb-md">
    <h5 class="text_bold" style="margin-left: 12px">
      Melhores avaliados
    </h5>

    <div class="row fit justify-start" style="margin-bottom: 9px">
      <Card v-for="b in booksA" :key="b._id" :book="b" />
    </div>

    <h5 class="text_bold" style="margin-left: 12px">Dashboard</h5>

    <div class="row justify-start" style="margin-bottom: 9px">
      <div class="col-12 card">
        <CardInfo v-for="info in infos" :key="info.id" :info="info" />
      </div>
    </div>
  </q-page>
</template>
<script>
import CardInfo from "../components/home/CardInfo.vue";
import CardHomeGraph from "../components/home/CardHomeGraph.vue";
import Card from "../components/books/Card.vue";

export default {
  data() {
    return {
      books: [
        {
          rating: 5,
          _id: "2",
          code: "1",
          name: "A cabana do terror",
          gender: {
            _id: "619a6b803ae3a2cdf72db1e5",
            name: "Terror",
            __typename: "Gender",
          },
          editor: {
            _id: "619d62c5bb73a8f54d522678",
            name: "O labrador",
            description: null,
            __typename: "Editor",
          },
          author: {
            _id: "619bc8ff31703de8ec2f1c72",
            name: "Diego Silva",
            description: null,
            __typename: "Author",
          },
          launch_year: 2021,
          version: "1",
          stock: 10,
          reviewedComments: [],
          __typename: "Book",
        },
        {
          rating: 4,
          _id: "6",
          code: "1",
          name: "Paraíso",
          gender: {
            _id: "619a6b803ae3a2cdf72db1e5",
            name: "Poesia épica",
            __typename: "Gender",
          },
          editor: {
            _id: "619d62c5bb73a8f54d522678",
            name: "O labrador",
            description: null,
            __typename: "Editor",
          },
          author: {
            _id: "619bc8ff31703de8ec2f1c72",
            name: "Dante Alighieri",
            description: null,
            __typename: "Author",
          },
          launch_year: 2021,
          version: "1",
          stock: 8,
          reviewedComments: [],
          __typename: "Book",
        },
        {
          
          rating: 3,
          _id: "619d62fabb73a8f54d52271c",
          code: "1",
          name: "Teto Para Dois",
          gender: {
            _id: "619a6b803ae3a2cdf72db1e5",
            name: "Romance de amor",
            __typename: "Gender",
          },
          editor: {
            _id: "619d62c5bb73a8f54d522678",
            name: "O labrador",
            description: null,
            __typename: "Editor",
          },
          author: {
            _id: "619bc8ff31703de8ec2f1c72",
            name: "Diego Silva",
            description: null,
            __typename: "Author",
          },
          launch_year: 2021,
          version: "1",
          stock: 2,
          reviewedComments: [],
          __typename: "Book",
        },
      ],






      booksA: [
        {
          rating: 5,
          _id: "2",
          code: "1",
          name: "A cabana do terror",
          gender: {
            _id: "619a6b803ae3a2cdf72db1e5",
            name: "Terror",
            __typename: "Gender",
          },
          editor: {
            _id: "619d62c5bb73a8f54d522678",
            name: "O labrador",
            description: null,
            __typename: "Editor",
          },
          author: {
            _id: "619bc8ff31703de8ec2f1c72",
            name: "Diego Silva",
            description: null,
            __typename: "Author",
          },
          launch_year: 2021,
          version: "1",
          stock: 10,
          reviewedComments: [],
          __typename: "Book",
        },
        {
          rating: 5,
          _id: "6",
          code: "1",
          name: "A Casa dos sonhos",
          gender: {
            _id: "619a6b803ae3a2cdf72db1e5",
            name: "Poesia épica",
            __typename: "Gender",
          },
          editor: {
            _id: "619d62c5bb73a8f54d522678",
            name: "O labrador",
            description: null,
            __typename: "Editor",
          },
          author: {
            _id: "619bc8ff31703de8ec2f1c72",
            name: "Dante Alighieri",
            description: null,
            __typename: "Author",
          },
          launch_year: 2021,
          version: "1",
          stock: 8,
          reviewedComments: [],
          __typename: "Book",
        },
        {
          
          rating: 5,
          _id: "619d62fabb73a8f54d52271c",
          code: "1",
          name: "Você ",
          gender: {
            _id: "619a6b803ae3a2cdf72db1e5",
            name: "Romance de amor",
            __typename: "Gender",
          },
          editor: {
            _id: "619d62c5bb73a8f54d522678",
            name: "O labrador",
            description: null,
            __typename: "Editor",
          },
          author: {
            _id: "619bc8ff31703de8ec2f1c72",
            name: "Diego Silva",
            description: null,
            __typename: "Author",
          },
          launch_year: 2021,
          version: "1",
          stock: 2,
          reviewedComments: [],
          __typename: "Book",
        },
      ],








      infos: [
        {
          id: 1,
          describle: "Livros",
          quantity: 150,
          img: "icons8-book-50.png",
        },
        {
          id: 2,
          describle: "Disponiveis",
          quantity: 100,
          img: "icons8-book-50.png",
        },
        {
          id: 3,
          describle: "Alugados",
          quantity: 50,
          img: "icons8-book-50.png",
        },
      ],
    };
  },
  components: {
    CardInfo,
    CardHomeGraph,
    Card,
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 2px 2px 10px 2px rgba(80, 80, 80, 0.1);
}
</style>
