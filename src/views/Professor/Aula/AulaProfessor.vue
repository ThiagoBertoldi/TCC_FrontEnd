<template>
   <div>
      <NavBar @atualizaPagina="atualizaPagina" :routes="rotasNavBar" />
      <div>
         <v-row class="ma-4">
            <template v-if="aulas instanceof Array" v-for="aula in aulas">
               <v-col xs="12" sm="6" md="4" lg="2" xl="1">
                  <v-card class="card-materia" @click="goToBoardProfessor(aula.idBoard)">
                     <v-card-title>
                        {{ aula.nomeAula }}
                     </v-card-title>
                     <v-card-text>
                        {{ aula.conteudoAula }}
                     </v-card-text>
                     <v-card-text>
                        Data da aula: {{ formataData(aula.dataAula) }}
                     </v-card-text>
                     <v-card-text>
                        Criado em: {{ formataData(aula.created_at) }}
                     </v-card-text>
                  </v-card>
               </v-col>
            </template>
         </v-row>
      </div>
   </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'

export default {
   data() {
      return {
         aulas: [],
         rotasNavBar: {
            home: true, 
            cadastrarAula: true
         }
      }
   },
   methods: {
      buscaAulas(id) {
         this.$api.get('get-aulas', { id })
         .then(response => {
            this.aulas = response.data ?? []
         })
         .catch(err => {})
      },
      atualizaPagina() {
         const { id } = this.$route.params

         this.buscaAulas(id)
      },
      goToBoardProfessor(idBoard) {
         if(!idBoard)
            return;
         
         this.$router.push({ name: 'BoardProfessor', params: { id: idBoard } })
      },
      formataData(data) {
         let newDate = new Date(data)

         let dia = newDate.getDate()
         let invalidMonth = newDate.getMonth() + 1
         let mes = invalidMonth.toString().length == 1 
            ? `0${invalidMonth}` 
            : invalidMonth
         let ano = newDate.getFullYear()
         let hora = newDate.getHours()
         let minute = newDate.getMinutes()

         return `${dia}/${mes}/${ano} - ${hora}:${minute}`
      }
   },
   mounted() {
      const { id } = this.$route.params

      this.buscaAulas(id)
   },
   components: {
      NavBar
   }
}
</script>