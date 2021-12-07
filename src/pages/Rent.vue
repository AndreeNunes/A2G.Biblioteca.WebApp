<template>
  <div class="q-pa-md">
    <h5 class="text_bold" style="margin-left: 12px">Alugar</h5>

    
  </div>
</template>
<script>
import { ref } from "vue";
import CardBook from "../components/rent/CardBook.vue";

export default {
  components: {
    CardBook,
  },
  data() {
    return {
      searchBook: "",
      bookFilter: [],
      idSelectionCard: 0,
      book: [
        {
          id: 1,
          name: "Cabana do terror",
          rating: 5,
          available: 10,
        },
      ],
    };
  },
  setup() {
    return {
      step: ref(1),
    };
  },
  methods: {
    onSearchBook() {
      this.bookFilter = this.book.filter((e) =>
        e.name.toUpperCase().includes(this.searchBook.toUpperCase())
      );
    },
    selectionBook(id) {
      this.idSelectionCard = id;
    },
  },
};
</script>

<style scoped>
.container-searching {
  margin-top: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
}
</style>
