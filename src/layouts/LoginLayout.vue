<template>
  <q-layout v-if="isSplashing">
    <q-page
      class="fit row justify-center items-center content-center bg-gradient"
    >
      <div class="fade-in-login">
        <img src="~assets/logo_branco.png" width="250" />
      </div>
    </q-page>
  </q-layout>

  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      isSplashing: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isSplashing = false;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
.bg-filtered {
  width: 500px;
  min-height: 600px;
  margin: 10px;
  background: #fff;
  backdrop-filter: blur(5px);
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 2px rgba(80, 80, 80, 0.1);
}

.rounded {
  border-radius: 2rem;
}

.bg-gradient {
  background-image: linear-gradient(rgb(42, 42, 42), rgb(0, 0, 0));
}

.bg-login {
  background-color: #21a58d;
}

.logo {
  width: 250px;
  align-content: center;
}

.link {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
  cursor: pointer;
}

.link:hover {
  color: #00a99d;
}

.q-tab-panel {
  padding: 0px;
}

.fade-in-login {
  animation: fadeIn 2.5s;
  -webkit-animation: fadeIn 2.5s;
  -moz-animation: fadeIn 2.5s;
  -o-animation: fadeIn 2.5s;
  -ms-animation: fadeIn 2.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
