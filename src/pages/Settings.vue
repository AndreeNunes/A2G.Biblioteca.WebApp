<template>
  <div
    class="float_buttom_global"
    style="background-color: #239b56"
    @click="() => save()"
  >
    <i class="las la-check"></i>
    <q-tooltip transition-show="flip-right" transition-hide="flip-left">
      Salvar alterações
    </q-tooltip>
  </div>

  <q-page class="q-mr-md q-ml-md q-mb-md q-mt-lg">
    <div style="max-width: 700px">
      <TitleSetting title="Instituição" color="#0575b54f" icon="school" />

      <div class="q-mt-lg q-pl-sm q-mb-sm text_light">Nome da Instituição</div>
      <q-input filled v-model="settings.school_name" />

      <div class="q-mt-lg q-pl-sm q-mb-sm text_light">Logo da Instituição</div>
      <q-file filled v-model="settings.logo" hint="Escolher uma imagem" />
    </div>

    <div style="max-width: 700px; margin-top: 40px">
      <TitleSetting
        class="q-mt-lg"
        title="Alugar"
        color="#671cbd4f"
        icon="las la-wrench"
      />

      <div class="q-mt-lg q-pl-sm q-mb-sm text_light">
        Data padrão de devolução
      </div>
      <q-input filled v-model="settings.default_rent_time_in_days" />

      <div class="q-mt-lg q-pl-sm q-mb-sm text_light">
        Data máxima de devolução
      </div>
      <q-input filled v-model="settings.maximum_rent_time_in_days" />
    </div>
  </q-page>
</template>
<script>
import TitleSetting from "../components/settings/TitleSettings.vue";
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("module");

export default {
  components: {
    TitleSetting,
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
  data() {
    return {
      settings: {
        _id: "",
        logo: "",
        school_name: "",
        default_rent_time_in_days: "",
        maximum_rent_time_in_days: "",
      },
    };
  },
  async mounted() {
    console.log(await this.actionGetSettings({ apollo: this.$apollo }));
    this.settings = await this.actionGetSettings({ apollo: this.$apollo });
  },
  methods: {
    ...mapActions(["actionGetSettings", "actionEditSettings"]),
    async save() {
        console.log('sdafpefiaugui', this.settings.school_name)
      if (typeof(this.settings.logo) != "string") {
        this.settings.logo = await this.getBase64(this.settings.logo);
      }

      let setting = {
        logo: this.settings.logo,
        school_name: this.settings.school_name,
        default_rent_time_in_days: parseInt(this.settings.default_rent_time_in_days),
        maximum_rent_time_in_days: parseInt(this.settings.maximum_rent_time_in_days),
      };

      this.showLoading();

      if (
        await this.actionEditSettings({
          apollo: this.$apollo,
          setting: setting,
          id: this.settings._id,
        })
      ) {
        this.triggerSuccess("Sucesso em atualizar os parâmetros.")
      } else {
          this.triggerError("Ocorreu algum erro ao atualizar os parâmetros.")
      }

      this.hideLoading();
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // reader.onloadend = (e) => resolve(imageToDataUri(e, 400, 400))
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
  },
};
</script>
