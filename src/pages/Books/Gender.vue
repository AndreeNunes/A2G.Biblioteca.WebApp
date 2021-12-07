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
      Adicionar genêro
    </q-tooltip>
  </div>

  <q-page class="q-mr-md q-ml-md q-mb-md">
    <h5 class="text_bold" style="margin-left: 12px">Genêros</h5>

    <p v-if="getterGender === -1">Carregando...</p>

    <div v-else>
      <p
        class="text_size_md q-mt-lg"
        style="margin-left: 12px"
        v-if="getterGenderFilter.length === 0"
      >
        Não foi encontrado nenhum genêro
      </p>
      <div class="row fit justify-start" v-else>
        <CardGender
          v-for="gender in getterGenderFilter"
          :key="gender._id"
          :gender="gender"
        />
      </div>
    </div>
  </q-page>

    <AddGenderDialog v-model="openDialogAdd" :onClose="() => {}"/>

</template>
<script>
import CardGender from "../../components/books/CardGender.vue";
import { createNamespacedHelpers } from "vuex";
import AddGenderDialog from '../../components/books/AddGenderDialog.vue';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  components: {
    CardGender,
    AddGenderDialog
  },
  data() {
    return {
      openDialogAdd: false,
    };
  },
  mounted() {
    this.actionGetGender({ apollo: this.$apollo });
  },
  computed: {
    ...mapGetters(["getterGender", "getterGenderFilter"]),
  },
  methods: {
    ...mapActions(["actionGetGender"]),
  },
};
</script>
