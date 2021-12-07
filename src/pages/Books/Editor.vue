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
      Adicionar esitores
    </q-tooltip>
  </div>

  <q-page class="q-mr-md q-ml-md q-mb-md">
    <h5 class="text_bold" style="margin-left: 12px">Editores</h5>

    <p v-if="getterEditor === -1">Carregando...</p>

    <div v-else>
      <p
        class="text_size_md q-mt-lg"
        style="margin-left: 12px"
        v-if="getterEditorFilter.length === 0"
      >
        Não foi encontrado nenhum editor
      </p>
      <div class="row fit justify-start" v-else>
        <CardEditor
          v-for="editor in getterEditorFilter"
          :key="editor._id"
          :editor="editor"
        />
      </div>
    </div>
  </q-page>

    <AddEditorDialog v-model="openDialogAdd" :onClose="() => {}"/>

</template>
<script>
import CardEditor from "../../components/books/CardEditor.vue";
import { createNamespacedHelpers } from "vuex";
import AddEditorDialog from '../../components/books/AddEditorDialog.vue';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  components: {
    CardEditor,
    AddEditorDialog
  },
  data() {
    return {
      openDialogAdd: false,
    };
  },
  mounted() {
    this.actionGetEditor({ apollo: this.$apollo });
  },
  computed: {
    ...mapGetters(["getterEditor", "getterEditorFilter"]),
  },
  methods: {
    ...mapActions(["actionGetEditor"]),
  },
};
</script>
