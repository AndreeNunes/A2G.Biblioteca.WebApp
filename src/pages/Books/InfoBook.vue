<template>
  <q-page class="q-mr-md q-ml-md q-mb-md">
    <div class="fit row q-mt-md">
      <div class="container_img row justify-center items-center">
        <i class="las la-camera" style="font-size: 100px; color: #fff"></i>
      </div>
      <div class="col">
        <div class="row">
          <div class="container_info_book">
            <div>
              <div class="info_book_title">
                {{ book.name ?? "Carregando..." }}
              </div>

              <div class="info_book_subtitle">
                Genêro: {{ book.gender?.name ?? "" }}
                <br />
                Autor: {{ book.author?.name ?? "" }}
                <br />
                Editora: {{ book.editor?.name ?? "" }}
                <br />
                Ano de lançamento: {{ book.launch_year ?? "" }}
              </div>
            </div>
          </div>

          <div class="container_available" v-if="loading">
            <div :class="book.rentedQuantity - book.stock == 0 ? 'text_not_available': 'text_available'">
              {{ book.rentedQuantity - book.stock == 0 ? 'Indisponível' : 'Disponível'}}
              </div>
            <div class="text_available_quantity">
              Quantidade: {{ (book.stock - book.rentedQuantity) ?? 'Caregando...'}}
            </div>

            <div
              class="row justify-center items-center q-mt-sm"
              v-if="book.reviewedComments?.length ?? 0 < 0"
            >
              <q-rating size="2em" color="warning" disable v-model="scoreMedia"/>
              <div class="text_available_rating q-ml-sm">{{ scoreMedia }} </div>
            </div>

            <div v-else class="text_available_rating">Não avaliado</div>
          </div>
        </div>

        <div class="q-mt-md container_sinopse">
          <div>
            <q-img src="~assets/icons/icons8-bookmark-64.png" width="20px" />
            Sinopse
          </div>

          <div class="text_sinpose">Não há sinpose.</div>
        </div>
      </div>
    </div>

    <div class="fit q-mt-xl">
      <div class="row items-center justify-between">
        <div class="row items-center info_book_title">
          <i
            class="las la-comments q-mr-md"
            style="font-size: 40px; color: #777777"
          />
          Avaliações
        </div>

        <div class="row items-center">
          <q-btn outline dense round color="dark" icon="add" class="q-mr-md" @click="() => addDialogVisible = true"/>
        </div>
      </div>

      <q-separator class="q-mt-md q-mb-lg" />


      <div v-if="comments.length == 0">
        <div class="text_mid_bold">Ainda não há avaliações</div>

      </div>

      <CardComment
        v-for="comment in comments ?? []"
        :key="comment._id"
        :comment="comment"
      />
    </div>
  </q-page>

  <DialogCommentAdd v-model="addDialogVisible" title="Deixe a sua avaliação" :idBook="book._id"/>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import CardComment from "../../components/comments/CardComment.vue";
import DialogCommentAdd from '../../components/comments/DialogCommentAdd.vue';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");
const moduleComments = createNamespacedHelpers("comments");

export default {
  data() {
    return {
      book: {},
      comments: [],
      idBookParam: this.$route.params.id,
      addDialogVisible: false,
      loading: false,
      scoreMedia: 0,
    };
  },
  components: {
    CardComment,
    DialogCommentAdd
  },
  async mounted() {
    this.loading = false
    this.book = await this.actionGetBookById({
      apollo: this.$apollo,
      id: this.idBookParam,
    });

    let email = localStorage.getItem("email");

    this.book.reviewedComments.forEach((item) => {
      let c;
      this.scoreMedia = this.scoreMedia + item.score
      if (item.author.email == email) {
        c = {
          ...item,
          ofUser: true,
        };
      } else {
        c = {
          ...item,
          ofUser: false,
        };
      }

      this.comments.push(c);
    });

    this.scoreMedia = this.scoreMedia / this.book.reviewedComments.length

    this.comments.sort(function (x, y) {
      return x === y ? 0 : x ? -1 : 1;
    });

    this.loading = true
  },
  methods: {
    ...mapActions(["actionGetBookById"]),
  },
};
</script>

<style scoped>
.container_img {
  width: 150px;
  height: 220px;
  background-color: #888;
}

.container_info_book {
  flex-grow: 1;
  margin-left: 20px;
}

.container_available {
  margin-right: 30px;
  margin-left: 20px;
}

.container_sinopse {
  margin-left: 20px;
}

.info_book_title {
  font-size: 25px;
  font-weight: 500;
  color: #333;
}

.text_available {
  color: #2a7923;
  font-weight: 400;
  font-size: 26px;
}

.text_not_available{
  color: #df1b14;
  font-weight: 400;
  font-size: 26px;
}

.text_available_quantity {
  font-size: 16px;
  font-weight: 300;
  color: #777;
}

.text_available_rating {
  font-size: 20px;
  font-weight: 300;
  color: #777;
  margin-top: 5px;
}

.info_book_subtitle {
  color: #777;
  font-weight: 300;
  font-size: 14px;
}

.text_sinpose {
  max-width: 1200px;
  padding: 10px 10px 0 0;
  color: #555;
}
</style>
