<template>
  <q-card class="container_card_global" style="max-width: 550px">
    <div class="row justify-between items-center">
      <div class="row items-center">
        <q-avatar
          size="40px"
          font-size="20px"
          color="primary"
          text-color="white"
          >{{ comment.author.name[0] }}</q-avatar
        >

        <div class="q-ml-md text_bold" style="font-size: 18px">
          {{ comment.author.name }}
        </div>
      </div>
    </div>

    <div class="q-mt-md items-center">
      <div>Livro: {{ comment.book.name }}</div>
      <div>Genêro: {{ comment.book.gender.name }}</div>
    </div>

    <div class="row items-center q-mt-md justify-between">
      <div class="row items-center">
        <i
          class="las la-comment-alt q-mr-sm"
          style="font-size: 30px; color: #444444"
        />
      </div>

      <div class="row items-center">
        <q-rating size="2em" v-model="comment.score" color="warning" disable />
        <div class="text_available_rating q-ml-sm">{{ comment.score }}</div>
      </div>
    </div>

    <div class="q-mt-md">
      {{ comment.text }}
    </div>

    <div class="row justify-end q-mt-lg">
      <q-btn
        outline
        style="color: green"
        label="Autorizar"
        @click="() => (isShowCommentAuditing = true)"
      />
    </div>
  </q-card>

  <DialogSimple
    v-model="isShowCommentAuditing"
    title="Autorizar"
    describle="Você realmente deseja autorizar esse comentário?"
    :onMethod="() => updateComment()"
    titleButtonConfirm="Autorizar"
  />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";
import DialogSimple from "../common/DialogSimple.vue";

const { mapActions, mapGetters, mapState } =
  createNamespacedHelpers("comments");

export default {
  props: {
    comment: Object,
  },
  components: {
    DialogSimple,
  },
  data() {
    return {
      isShowCommentAuditing: false,
    };
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
        message: msg || "Ocorreu algum erro ao excluir a chave.",
      });
    }

    function triggerPositive(msg) {
      $q.notify({
        type: "positive",
        message: msg || "Chave exluida com sucesso.",
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
    ...mapActions(["actionEditComment"]),
    async updateComment() {
      this.showLoading();

      let comment = {
        text: this.comment.text,
        score: this.comment.score,
        book: this.comment.book._id,
        author: this.comment.author.idAuthor,
        reviewed: true,
      };

      if (
        await this.actionEditComment({
          apollo: this.$apollo,
          id: this.comment._id,
          comment,
        })
      ) {
        this.triggerPositive(
          "O comentário foi autorizado com sucesso."
        );
      } else {
        this.triggerError("Ocorreu algum erro ao autorizar o Comentário.");
      }

      this.loadingHide();
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
