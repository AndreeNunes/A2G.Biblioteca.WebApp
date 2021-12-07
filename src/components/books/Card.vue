<template>
  <q-card class="container_card_global" style="max-width: 550px">
    <div class="row justify-between items-center">
      <div class="row items-center">
        <img src="~assets/icons/icons8-book-50.png" width="37" />
        <div class="q-ml-md text_bold" style="font-size: 18px">
          {{ book.name }}
        </div>
      </div>
      <q-btn flat round color="primary" icon="las la-ellipsis-v" v-if="isAdmin">
        <q-menu auto-close class="options_menu_global">
          <q-list style="min-width: 230px">
            <q-item clickable v-close-popup>
              <q-item-section class="row" @click="() => {}"
                >Editar livro
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                class="row"
                @click="() => (isShowRemoveBook = true)"
                >Remover livro</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="row items-center">
      <div class="col">
        <div class="q-mt-md text_mid_bold q-mt-sm">
          <div class="title_rating">Avaliações</div>
          <div
            class="row items-center"
            v-if="book.reviewedComments?.length ?? 0 > 0"
          >
            <div class="text_size_lg q-mr-sm">5.0</div>
            <q-rating
              v-model="book.rating"
              size="22px"
              color="orange"
              readonly
              style="margin-top: -2px"
            />
          </div>
          <div v-else>
            <div class="text_size_md q-mr-sm">Ainda não há avaliação</div>
          </div>
        </div>
        <div class="q-mt-md title_available">
          Genêro: {{ book.gender.name }}
        </div>

        <div class="q-mt-md title_available row justify-between items-center">
          Disponiveis: {{ book.stock }}
          <q-btn
            color="primary"
            outline
            icon-right="las la-arrow-right"
            label="Ver mais"
            :to="'/livros/' + book._id"
          />
        </div>
      </div>
    </div>
  </q-card>

  <DialogSimple
    v-model="isShowRemoveBook"
    title="Remover o livro"
    describle="Você realmente deseja deletar esse livro?"
    :onMethod="() => deleteBook()"
    titleButtonConfirm="Deletar"
  />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";
import DialogSimple from '../common/DialogSimple.vue';

const { mapActions, mapGetters, mapState } =
  createNamespacedHelpers("book");

export default {
  props: {
    book: Object,
  },
  components: {
    DialogSimple
  },
  data() {
    return {
      isShowBalance: true,
      isShowRemoveBook: false,
      isAdmin: false,
    };
  },
  mounted(){
    this.isAdmin = localStorage.getItem("admin") == 'true' ? true : false
  },
  setup() {
    const $q = useQuasar();

    function showLoading() {
      $q.loading.show({
        spinner: QSpinnerTail,
        spinnerSize: 80,
        backgroundColor: "#ddd",
        messageColor: "black",
      });
    }

    function triggerError(msg) {
      $q.notify({
        type: "negative",
        message: msg || "Ocorreu algum erro ao remover.",
      });
    }

    function triggerPositive(msg) {
      $q.notify({
        type: "positive",
        message: msg || "Livro exluido com sucesso.",
      });
    }

    function loadingHide() {
      $q.loading.hide();
    }

    return {
      showLoading,
      triggerError,
      triggerPositive,
      loadingHide,
    };
  },
  methods: {
    ...mapActions(["actionDeleteBook"]),

    async deleteBook() {
      if(await this.actionDeleteBook({apollo: this.$apollo, id: this.book._id})){
        this.triggerPositive("Livro removido com sucesso.");
      } else {
        this.triggerError("Ocorreu algum erro ao deletar esse livro.");
      }

      this.isShowRemoveBook = false
    },

    
  },
};
</script>
<style scoped>
.title_rating {
  font-size: 20px;
  font-weight: 300;
}

.title_available {
  font-size: 16px;
  font-weight: 400;
  color: #555;
}

.container_button_more_information {
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: rgba(87, 87, 87, 0.274);
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
