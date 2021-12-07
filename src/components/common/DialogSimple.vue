<template>
  <q-dialog>
    <q-card>
      <q-card-section class="row justify-between">
        <div class="font-title" style="margin-top: 11px; font-size: 19px">
          {{ title }}
        </div>
      </q-card-section>

      <q-separator class="q-mt-xs q-mb-md" />

      <p class="font q-mr-md q-ml-md q-mt-md q-mb-md" style="font-size: 17px">
        {{ describle }}
      </p>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Cancelar"
          flat
          v-close-popup
          class="radius"
        />
        <q-btn
          outline
          color="primary"
          :label="titleButtonConfirm ?? 'Ok'"
          flat
          v-close-popup
          class="radius"
          @click="onMethod"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    describle: String,
    titleButtonConfirm: String,
    onMethod: Function,
  },
};
</script>
