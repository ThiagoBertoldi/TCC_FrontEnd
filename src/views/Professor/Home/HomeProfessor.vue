<template>
   <div>
      <NavBar @atualizaPagina="atualizaPagina" :routes="rotasNavBar" />
      <div>
         <v-row class="ma-4">
            <template v-for="materia in materias">
               <v-col xs="12" sm="6" md="4" lg="2" xl="1">
                  <v-card class="card-materia" @click="goToAulaProfessor(materia._id)">
                     <v-card-title>
                        {{ materia.nomeMateria }}
                     </v-card-title>
                     <v-card-subtitle>
                        {{ materia.turma }}
                     </v-card-subtitle>
                     <v-card-text>
                        {{ new Date(materia.created_at).toLocaleDateString('pt-BR') }}
                     </v-card-text>
                  </v-card>
               </v-col>
            </template>
         </v-row>
      </div>

      <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbar_success ? 'green' : 'red'">
         {{ snackbar_message }}
      </v-snackbar>
   </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'

export default {
   data() {
      return {
         user: null,
         rotasNavBar: {
            cadastrarMateria: true,
            perfilProfessor: true,
            cadastraAluno: true,
            notificacoes: true
         },
         materias: [],
         snackbar: false,
         snackbar_success: false,
         snackbar_message: null
      }
   },
   methods: {
      async atualizaPagina() {
         this.buscaMaterias()
      },
      async buscaMaterias() {
         await this.$api.get('get-materias', {})
            .then(response => {
               this.materias = response.data
            })
            .catch(err => {
               this.snackbar = true
               this.snackbar_message = err.response.data.data.message
               setTimeout(() => this.$router.back(), 1500)
            })
      },
      goToAulaProfessor(id_materia) {
         if (!id_materia)
            return;

         let params = { id: id_materia }

         this.$router.push({ name: 'AulaProfessor', params })
      }
   },
   async mounted() {
      this.user = this.$store.getters.getUser

      await this.buscaMaterias()
   },
   components: {
      NavBar
   }
}
</script>

<style scoped>
.card-materia {
   cursor: pointer;
   transition: .07s linear;
}

.card-materia:hover {
   scale: 1.03;
   opacity: .95;
}
</style>