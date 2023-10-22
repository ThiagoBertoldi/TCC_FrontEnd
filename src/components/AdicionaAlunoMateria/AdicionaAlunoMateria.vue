<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Adicionar aluno(s) a essa matéria</span>
         </v-card-title>
         <v-card-text>
            <v-select multiple chips color="green" label="Aluno" variant="outlined" :items="alunos" :item-props="alunoProps" v-model="model.alunos" />
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Cancelar
            </v-btn>
            <v-btn color="green" variant="text" @click="addAluno">
               Adicionar
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
export default {
   data() {
      return {
         show: false,
         model: {},
         alunos: []
      }
   },
   methods: {
      openModal(sender) {

         this.$api.get('get-alunos', {})
         .then(response => {
            if(!response.data?.hasError) {
               this.alunos = response.data.listaAlunos
            }
         })
         .catch(err => console.log(err))

         this.show = true;
      },
      alunoProps(aluno) {
         return {
            title: aluno.username,
            subtitle: aluno.email
         }
      },
      addAluno() {
         let idAlunos = this.model.alunos.map(item => { return item._id  })
         let dto = {
            idMateria: this.$route.params.id,
            alunos: idAlunos
         }

         this.$api.post('adicionar-aluno-materia', dto)
         .then(response => {
            this.show = false
            this.model = {}
         })
         .catch(err => {})
      }
   }
}
</script>