<template>
  <div
    class="float_buttom_global"
    @click="
      () => {
        openDialogAdd = true;
      }
    "
  >
    <i class="las la-plus"></i>
    <q-tooltip transition-show="flip-right" transition-hide="flip-left">
      Adicionar autor
    </q-tooltip>
  </div>
  
  <q-page class="q-mr-md q-ml-md q-mb-md">
    <h5 class="text_bold" style="margin-left: 12px">Autores</h5>

    <p v-if="getterAuthor === -1">Carregando...</p>

    <div v-else>
      <p
        class="text_size_md q-mt-lg"
        style="margin-left: 12px"
        v-if="getterAuthorFilter.length === 0"
      >
        Não foi encontrado nenhum autor
      </p>
      <div class="row fit justify-start" v-else>
        <CardAuthor
          v-for="author in getterAuthorFilter"
          :key="author._id"
          :author="author"
        />
      </div>
    </div>
  </q-page>

    <AddAuthorDialog v-model="openDialogAdd" :onClose="() => {}" title="Adicionar autores"/>

</template>
<script>
import CardAuthor from "../../components/books/CardAuthor.vue";
import { createNamespacedHelpers } from "vuex";
import AddAuthorDialog from '../../components/books/AddAuthorDialog.vue';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  components: {
    CardAuthor,
    AddAuthorDialog
  },
  data() {
    return {
      openDialogAdd: false,
    };
  },
  async mounted() {
    await this.actionGetAuthor({ apollo: this.$apollo });
  },
  computed: {
    ...mapGetters(["getterAuthor", "getterAuthorFilter"]),
  },
  methods: {
    ...mapActions(["actionGetAuthor"]),
  },
};
</script>
