<template>
  <div class="q-mt-md">
    <div class="row items-center justify-between">
      <div class="text_bold text_size_lg">
        {{ comment.ofUser ? "Eu" : comment.author.name }},
      </div>
      <div class="q-mt-sm row">
        <div v-if="comment.ofUser">
          <q-btn
            flat
            round
            color="primary"
            icon="edit"
            @click="() => (editDialogVisible = true)"
          />
          <q-btn
            flat
            round
            color="negative"
            icon="remove"
            class="q-mr-md"
            @click="() => (showDialogRemove = true)"
          />
        </div>
        <q-rating
          v-model="comment.score"
          size="22px"
          color="orange"
          readonly
          style="margin-top: -2px"
        />
      </div>
    </div>
  </div>

  <div>
    {{ comment.text }}
  </div>

  <q-separator class="q-mt-md" />

  <DialogSimple
    v-model="showDialogRemove"
    title="Deletar comentário"
    describle="Você realmente deseja deletar esse comentário?"
    :onMethod="() => {}"
    titleButtonConfirm="Deletar"
  />

  <DialogCommentAdd
    v-model="editDialogVisible"
    title="Editar a sua avaliação"
    :comment="comment"
  />
</template>
<script>
import DialogSimple from "../common/DialogSimple.vue";
import DialogCommentAdd from "./DialogCommentAdd.vue";
import { useQuasar, QSpinnerTail } from "quasar";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("comment");

export default {
  props: {
    comment: Object,
  },
  components: {
    DialogSimple,
    DialogCommentAdd
  },
  data() {
    return {
      showDialogRemove: false,
      editDialogVisible: false,
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
        message: msg || "Ocorreu algum erro, ao realizar esse processo.",
      });
    }

    function triggerSuccess(msg) {
      $q.notify({
        type: "positive",
        message: msg || "Sucesso em realizar esse processo.",
      });
    }

    function hideLoading() {
      $q.loading.hide();
    }

    return {
      showLoading,
      triggerError,
      hideLoading,
      triggerSuccess,
    };
  },
  methods: {
    ...mapActions(["actionDeleteComment"]),
    async deleteComment() {
      this.showLoading();
      if (await this.actionDeleteComment) {
        this.triggerSuccess("Comentário excluido com sucesso.");
      } else {
        this.triggerError("Ocorreu algum erro ao deletar o comentário.");
      }

      this.hideLoading();
    },
  },
};
</script>
