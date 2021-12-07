<template>
  <div class="float_buttom_global" @click="() => { openDialogAdd = true; }">
    <i class="las la-plus"></i>
    <q-tooltip transition-show="flip-right" transition-hide="flip-left">
      Adicionar usuários
    </q-tooltip>
  </div>

  <q-page class="q-mr-md q-ml-md q-mb-md">
    <h5 class="text_bold" style="margin-left: 12px">Usuários</h5>

    <p v-if="getterUsersFilter === -1">Carregando...</p>

    <div v-else>
      <p
        class="text_size_md q-mt-lg"
        style="margin-left: 12px"
        v-if="getterUsersFilter.length === 0"
      >
        Não foi encontrado nenhum usuários
      </p>
      <div class="row fit justify-start" v-else>
        <Card
          v-for="user in getterUsersFilter"
          :key="user._id"
          :user="user"
        />
      </div>
    </div>
  </q-page>

  <DialogAddOrEditOrInformation v-model="openDialogAdd" title="Adicionar usuarios" :user="{}" titleButtonConfirm="Adicionar" :onMethod="() => openDialogAdd = false" />
  
</template>
<script>
import Card from "../components/users/Card.vue";
import DialogAddOrEditOrInformation from "../components/users/DialogAddOrEdit.vue";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("module");

export default {
  components: {
    Card,
    DialogAddOrEditOrInformation,
  },
  data() {
    return {
        openDialogAdd: false,
        openDialogInformation: false
    };
  },
  mounted() {
    this.actionGetUsers({apollo: this.$apollo});
  },
  computed: {
    ...mapGetters(["getterUsers", "getterUsersFilter"]),
  },
  methods: {
    ...mapActions(["actionGetUsers"]),
  },
};
</script>
