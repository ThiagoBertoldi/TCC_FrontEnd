<template>
   <div>
      <NavBar :routes="rotasNavBar" />
      <v-col class="text-white ma-4">
         <p style="font-size: 24px;">
            Suas Matérias
         </p>
      </v-col>

      <v-row class="ma-4">
         <template v-for="materia in materias" :key="materia">
            <v-col xs="12" sm="6" md="4" lg="2" xl="2">
               <v-card class="card-materia" @click="goToMateriaAluno(materia._id)">
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

      <v-snackbar v-model="snackbar" :timeout="5000" :color="error ? 'red' : 'green'">
         {{ mensagem ?? '' }}
      </v-snackbar>
   </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue';

export default {
   data() {
      return {
         user: null,
         rotasNavBar: {
            perfil: true,
            perfilAluno: true,
            rankingGlobalMoedas: true,
            rankingGlobalXP: true
         },
         materias: [],
         snackbar: false,
         mensagem: null,
         error: false
      }
   },
   methods: {
      goToMateriaAluno(id_materia) {
         if (!id_materia)
            return;

         let params = { id: id_materia }

         this.$router.push({ name: 'AulaAluno', params })
      }
   },
   mounted() {
      this.user = this.$store.getters.getUser

      this.$api.get('get-materias-aluno', {})
         .then(response => {
            this.materias = response.data
         })
         .catch(err => {
            this.error = true
            this.message = err.response.data.data.message
            this.snackbar = true
         })
   },
   components: {
      NavBar
   }
}
</script>