<template>
  <q-card
    class="container_card_global bg-white"
    :style="idSelectionCard == book._id ? 'padding: 0px; max-width: 500px; border: 1px solid rgb(0, 141, 87)' : 'padding: 0px; max-width: 500px;'"
  >
    <span v-if="idSelectionCard == book._id" class="container_icon">
      <i class="las la-check"></i>
    </span>

    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">{{ book.name }}</div>
        <div class="text-caption text-grey">
          {{ book.gender.name }}
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat color="primary" @click="() => selectionBook(book.name)">
        Selecionar
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    book: Object,
    selectionBook: Function,
    idSelectionCard: Number,
  },
};
</script>

<style lang="scss" scoped>
.container_icon {
  position: absolute;
  background-color: rgb(0, 141, 87);
  width: 30px;
  height: 30px;
  right: -10px;
  border-radius: 100px;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
}
</style>
