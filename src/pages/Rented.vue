<template>
<div class="float_buttom_global" @click="() => { openDialogAddRent = true; }">
    <i class="las la-plus"></i>
    <q-tooltip transition-show="flip-right" transition-hide="flip-left">
      Adicionar usuários
    </q-tooltip>
  </div>

  <q-page class="q-mr-md q-ml-md q-mb-md">
    <h5 class="text_bold" style="margin-left: 12px">Alugados</h5>

    <p v-if="getterRented === -1">Carregando...</p>

    <div v-else>
      <p
        class="text_size_md q-mt-lg"
        style="margin-left: 12px"
        v-if="getterRentedFilter.length === 0"
      >
        Não foi encontrado nenhum empréstimo realizado.
      </p>
      <div class="row fit justify-start" v-else>
        <CardRented v-for="rent in getterRentedFilter" :key="rent._id" :rent="rent"/>
     </div>
    </div>
  </q-page>

  <DialogRentAdd 
    v-model="openDialogAddRent"
    title="Alugar livro"
    :onMethod="() => openDialogAddRent = false"
  />
</template>
<script>
import CardRented from "../components/rent/CardRented.vue";
import DialogRentAdd from '../components/rent/DialogRentAdd.vue'
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters, mapState } =
  createNamespacedHelpers("rents");

export default {
  components: {
    CardRented,
    DialogRentAdd
  },
  data() {
    return {
      openDialogAddRent: false
    };
  },
  computed: {
    ...mapGetters([
      "getterRented",
      "getterRentedFilter",
    ]),
  },
  async mounted(){
    await this.actionGetRented({apollo: this.$apollo})
  },
  methods: {
    ...mapActions(["actionGetRented"]),
  },
};
</script>


