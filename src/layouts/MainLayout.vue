<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="appbar">
      <q-toolbar class="q-ml-none q-pl-none">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="lt-sm inline"
          @click="toggleLeftDrawer"
        />

        <div class="toolbar_styles gt-sm inline">
          <q-img src="~assets/logo.png" width="130px" />
        </div>

        <div class="styles_filters" v-if="routerActive == '/livros'">
          <div
            class="
              input_search_global_container
              fit
              q-mr-md
              row
              justify-between
              items-center
            "
          >
            <input
              class="col-md-11 input_search_global"
              placeholder="Pesquisa por nome"
              v-model="filterBookName"
            />
            <q-btn
              flat
              round
              color="primary"
              icon="las la-search"
              class="col-md-1"
              @click="() => actionFilterByNameBook({ name: filterBookName })"
            />
          </div>

          <div style="cursor: pointer">
            <div class="text_bold text_size_md">Genêro</div>
            {{ activeStatus }}
            <i class="las la-angle-down"></i>

            <q-menu fit class="options_menu_global">
              <q-list style="min-width: 100px">
                <q-item clickable @click="() => {}" v-close-popup>
                  <q-item-section>Todos</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>

        <div class="styles_filters" v-if="routerActive == '/home'">
          <div
            class="
              input_search_global_container
              fit
              q-mr-md
              row
              justify-between
              items-center
            "
          >
            <input
              class="col-md-11 input_search_global"
              placeholder="Pesquisar"
              v-model="filterUserName"
            />
            <q-btn
              flat
              round
              color="primary"
              icon="las la-search"
              class="col-md-1"
              @click="() => {}"
            />
          </div>

          <div class="row items-center">
            <div class="q-mr-md">
              <i :class="isAdmin ? 'las la-user-tie' : 'las la-user'" style="font-size: 30px" />
            </div>
            <div>
              <div class="text_bold">Logado com:</div>
              <div class="text_light">{{ userName }}</div>
            </div>
          </div>
        </div>

        <div class="styles_filters" v-if="routerActive == '/usuarios'">
          <div
            class="
              input_search_global_container
              fit
              q-mr-md
              row
              justify-between
              items-center
            "
          >
            <input
              class="col-md-11 input_search_global"
              placeholder="Pesquisa por nome"
              v-model="filterUserName"
            />
            <q-btn
              flat
              round
              color="primary"
              icon="las la-search"
              class="col-md-1"
              @click="searchUsers()"
            />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-white">
      <q-list>
        <q-item active clickable :to="'/home'" class="hover_item_menu">
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-home.svg"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium">Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item active clickable :to="'/livros'" class="hover_item_menu">
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-book-50.png"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium">Livros</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          active
          clickable
          :to="'/comentarios'"
          class="hover_item_menu"
          v-if="isAdmin"
        >
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-send-comment-50.png"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium"
              >Auditoria de Comentários</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item
          active
          clickable
          :to="'/Comentários'"
          class="hover_item_menu"
          v-if="!isAdmin"
        >
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-send-comment-50.png"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium"
              >Empréstimos realizados</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item
          active
          clickable
          :to="'/alugados'"
          class="hover_item_menu"
          v-if="isAdmin"
        >
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-checklist-50.png"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium">Alugados</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          active
          clickable
          :to="'/usuarios'"
          class="hover_item_menu"
          v-if="isAdmin"
        >
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-user-50.png"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium">Usuários</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="las la-cog"
          label="Parametrizações"
          v-if="isAdmin"
        >
          <q-item
            active
            clickable
            :to="'/livros/genero'"
            class="hover_item_menu"
          >
            <q-item-section avatar>
              <q-img
                src="../assets/icons/icons8-agenda-48.png"
                alt="Logo Qyon Bank"
                class="icon_menu"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="font-medium">Genêro</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            active
            clickable
            :to="'/livros/editores'"
            class="hover_item_menu"
          >
            <q-item-section avatar>
              <q-img
                src="../assets/icons/icons8-agenda-48.png"
                alt="Logo Qyon Bank"
                class="icon_menu"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="font-medium">Editores</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            active
            clickable
            :to="'/livros/autores'"
            class="hover_item_menu"
          >
            <q-item-section avatar>
              <q-img
                src="../assets/icons/icons8-agenda-48.png"
                alt="Logo Qyon Bank"
                class="icon_menu"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="font-medium">Autores</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-item
          active
          clickable
          :to="'/configuracoes'"
          class="hover_item_menu"
          v-if="isAdmin"
        >
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-commit-git-50.png"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium">Configurações</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          active-class="tab-active"
          clickable
          @click="() => (isExit = true)"
          class="hover_item_menu"
        >
          <q-item-section avatar>
            <q-img
              src="../assets/icons/icons8-logout-rounded-left-50.png"
              alt="Logo Qyon Bank"
              class="icon_menu"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-medium">Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <DialogSimple
    v-model="isExit"
    title="Logoult"
    describle="Você realmente deseja sair do sistema?"
    :onMethod="() => logoult()"
    titleButtonConfirm="Sair"
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import moment from "moment";
import DialogSimple from "../components/common/DialogSimple.vue";
import register from "../store/module/register";
import registerTwo from "../store/module-book/register";
import registerComments from "../store/module-comments/register";
import registerRent from "../store/module-rent/register";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("module");
const moduleBook = createNamespacedHelpers("book");

export default defineComponent({
  name: "MainLayout",
  components: {
    DialogSimple,
  },
  data() {
    return {
      isAdmin: false,
      filterUserName: "",
      userName: "...",
      isOpenFilterDate: false,
      isExit: false,
      filterBookName: "",
      dateInitialTransaction: moment(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 3,
          new Date().getDate()
        )
      ).format("YYYY-MM-DD"),
      dateFinalTransaction: moment(new Date()).format("YYYY-MM-DD"),
      activeStatus: "Todos",
    };
  },
  created() {
    register(this.$store);
    registerTwo(this.$store);
    registerComments(this.$store);
    registerRent(this.$store);
  },
  computed: {
    routerActive() {
      return useRouter().currentRoute.value.path;
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    return {
      leftDrawerOpen,
      openExit() {
        if ($q.platform.is.mobile) leftDrawerOpen.value = false;
        state.isExit = true;
      },
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    ...mapActions(["actionFilterUser"]),
    ...moduleBook.mapActions(["actionFilterByNameBook"]),
    searchUsers() {
      this.actionFilterUser({ filterUserName: this.filterUserName });
    },
    logoult() {
      localStorage.clear();
      window.location.href = "#/";
    },
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.isAdmin = localStorage.getItem("admin") == 'true' ? true : false

    console.log(this.isAdmin)
  },
});
</script>
