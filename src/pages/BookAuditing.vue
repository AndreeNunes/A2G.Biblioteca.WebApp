<template>
  <div class="q-pa-md">
    <h5 class="text_bold" style="margin-left: 12px">
      Auditoria de Comentários
    </h5>
 
    <p v-if="getterCommentsFilterNotReviewed === -1">Carregando...</p>

    <div v-else>
      <p
        class="text_size_md q-mt-lg"
        style="margin-left: 12px"
        v-if="getterCommentsFilterNotReviewed.length === 0"
      >
        Não foi encontrado nenhum comentário para auditar
      </p>
      <div class="row fit justify-start" v-else>
        <CardCommentAuditing v-for="comment in getterCommentsFilterNotReviewed" :key="comment._id" :comment="comment" />
      </div>
    </div>
  </div>
</template>
<script>
import CardCommentAuditing from "../components/comments/CardCommentAuditing.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters, mapState } =
  createNamespacedHelpers("comments");

export default {
  components: {
    CardCommentAuditing,
  },
  mounted() {
    this.actionGetComments({ apollo: this.$apollo });
  },
  computed: {
    ...mapGetters([
      "getterCommentsNotReviewed",
      "getterCommentsFilterNotReviewed",
    ]),
  },
  methods: {
    ...mapActions(["actionGetComments"]),
  },
};
</script>
