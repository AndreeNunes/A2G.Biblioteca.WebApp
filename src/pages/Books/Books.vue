<template>
  <div
    v-if="isAdmin"
    class="float_buttom_global"
    @click="
      () => {
        openDialogAdd = true;
      }
    "
  >
    <i class="las la-plus"></i>
    <q-tooltip transition-show="flip-right" transition-hide="flip-left">
      Adicionar livros
    </q-tooltip>
  </div>

  <q-page class="q-mr-md q-ml-md q-mb-md">
    <h5 class="text_bold" style="margin-left: 12px">Livros</h5>

    <p v-if="getterBooks === -1">Carregando...</p>

    <div v-else>
      <p
        class="text_size_md q-mt-lg"
        style="margin-left: 12px"
        v-if="getterBooksFilter.length === 0"
      >
        Não foi encontrado nenhum livro
      </p>
      <div class="row fit justify-start" v-else>
        <Card v-for="book in getterBooksFilter" :key="book._id" :book="book" />
      </div>
    </div>
  </q-page>

  <DialogAdd
    v-model="openDialogAdd"
    title="Adicionar livros"
    :user="{}"
    titleButtonConfirm="Adicionar"
    :onMethod="() => (openDialogAdd = false)"
  />
</template>
<script>
import Card from "../../components/books/Card.vue";
import DialogAdd from "../../components/books/AddBookDialog.vue";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  components: {
    Card,
    DialogAdd,
  },
  data() {
    return {
      openDialogAdd: false,
      isAdmin: false,
    };
  },
  mounted() {
    this.actionGetBooks({ apollo: this.$apollo });
    this.actionGetGender({ apollo: this.$apollo });
    this.actionGetEditor({ apollo: this.$apollo });
    this.actionGetAuthor({ apollo: this.$apollo });

    this.isAdmin = localStorage.getItem("admin") == "true" ? true : false;
  },
  computed: {
    ...mapGetters([
      "getterBooks",
      "getterBooksFilter",
      "getterGender",
      "getterEditor",
      "getterAuthor",
    ]),
  },
  methods: {
    ...mapActions([
      "actionGetBooks",
      "actionGetGender",
      "actionGetEditor",
      "actionGetAuthor",
    ]),
  },
};
</script>
