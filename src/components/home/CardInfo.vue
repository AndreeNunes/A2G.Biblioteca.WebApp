<template>
  <div class="info-cards">
    <div class="title-card-info">
      <img
        v-if="info.img != null"
        :src="require(`assets/icons/${info.img}`)"
        style="width: 45px"
      />
      <div class="q-mt-sm describle">{{ info?.describle ?? "" }}</div>
    </div>
    <div class="number-info">{{ info?.quantity ?? "" }}</div>

    
  </div>

  <q-separator />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    info: Object,
  },
  setup() {},
});
</script>

<style scoped>
.info-cards {
  width: 100%;
  padding: 30px 20px 20px 30px;
  display: flex;
  justify-content: space-between;
}

.title-card-info {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  max-width: 110px;
  align-items: center;
  font-weight: 300;
  color: #595959;
}

.number-info {
  font-weight: 600;
  font-size: 28px;
  color: #595959;
  display: flex;
  justify-content: center;
  align-items: center;
}

.describle {
    width: 100px;
    font-size: 17px;
}
</style>
