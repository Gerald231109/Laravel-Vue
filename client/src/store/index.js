import { createStore } from "vuex";
import DataServices from "@/services/DataServices";

export default createStore({
  state: {
    allComments: {},
    name: "",
    text: "",
    robotCheck: false,
  },
  mutations: {
      dateFormat(state) {
          for (let i of state.allComments) {
              i.created_at = (new Date(i.created_at).toLocaleString())
          }
      },
      imaMAN(state){
          state.robotCheck = true
      },
      whoAreYou(state){
          state.robotCheck = false
      }
  },
  actions: {
    getComments(context) {
      console.log('get')
      DataServices.getAll()
          .then(response => {
            context.state.allComments = response.data;
            context.commit('dateFormat')
            console.log(response.data)
          })
          .catch(e => {
              console.log(e);
          })
    },

    addComment(context) {
        console.log('add')
        let comment = {
            name: context.state.name,
            text: context.state.text
        }
        DataServices.createComment(comment)
            .then(response => {
                context.dispatch('getComments')
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },

    deleteComment(context, payload) {
        console.log('delete', payload)
        DataServices.deleteComment(payload)
            .then(response => {
                context.dispatch('getComments')
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

  },
});
