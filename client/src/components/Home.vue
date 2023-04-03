<template>
  <v-parallax src="../static/background.jpg">
    <v-sheet color="transparent" class="ma-10">
      <v-img class="picture" src="../static/David.jpg"></v-img>
      <v-divider class="my-10 border-opacity-50" color="white"></v-divider>
      <v-form @submit.prevent>
        <v-sheet rounded max-width="600" class="mx-auto">
          <v-text-field
              label="Имя"
              color="yellow-lighten-3"
              v-model="this.$store.state.name"
              maxlength="35"
              :rules="[v => (v || '' ).length > 0 || 'Для добавления комментария введите имя']">

          </v-text-field>
          <v-textarea
              label="Комментарий"
              color="yellow-lighten-3"
              maxlength="255"
              v-model="this.$store.state.text"
              :rules="[v => (v || '' ).length > 0 || 'Комментарий не может быть пустым']"
          >
          </v-textarea>
          <v-btn class="ma-2" @click="addComment()" v-if="this.$store.state.robotCheck && this.$store.state.name && this.$store.state.text" color="yellow-lighten-3">Добавить комментарий</v-btn>
          <v-btn class="ma-2" disabled="true" v-if="!this.$store.state.name || !this.$store.state.text || !this.$store.state.robotCheck" color="yellow-lighten-3">Добавить комментарий</v-btn>
          <vue-recaptcha
                         class="pa-2"
                         sitekey="6Ldw2VYlAAAAAGLhvspISYPh0y8NnODrQTWVCT8H"
                         size="normal"
                         theme="light"
                         hl="ru"
                         @verify="man"
                         @expire="who"
                         ref="vueRecaptcha">
          </vue-recaptcha>
        </v-sheet>
      </v-form>
      <v-divider class="my-10 border-opacity-50" color="white"></v-divider>
      <v-card max-width="600" class="mx-auto">
        <v-list lines="three">
          <v-list-item
          v-for="comment in this.$store.state.allComments"
          :key="comment.id"
          :title="comment.name + ' опубликовано: ' + comment.created_at.toLocaleString()"
          :subtitle="comment.text"
          >
            <v-btn @click="deleteComment(comment.id)" class="ma-1" width="30" height="30" color="red" icon="mdi-cancel"></v-btn>
            <v-divider class="border-opacity-50" color="blue-grey-darken-1"></v-divider>
          </v-list-item>
        </v-list>
      </v-card>
    </v-sheet>

  </v-parallax>
</template>

<script>
import vueRecaptcha from 'vue3-recaptcha2';
import { mapActions, mapMutations } from 'vuex'
export default {
  name: "HomePage",
  components: {
    vueRecaptcha
  },


  methods: {
    ...mapActions({
      getComments: "getComments",
      addComment: "addComment",
      deleteComment: "deleteComment"
    }),

    ...mapMutations({
      man: "imaMAN",
      who: "whoAreYou"
    }),

  },
  mounted() {
    this.getComments()
  }
};
</script>

<style>
.picture {
  border-width: 5px;
  border-style: solid;
  border-image: linear-gradient(to right, #000000, #FFD700 ) 2;
}
</style>