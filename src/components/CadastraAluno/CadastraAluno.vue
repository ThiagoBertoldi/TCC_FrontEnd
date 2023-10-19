<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Adicionar um Aluno</span>
         </v-card-title>
         <v-card-text>
            <v-text-field 
               label="Nome do Aluno"
               v-model="model.nomeAluno"
               variant="outlined"
               color="green"
            />
            <v-text-field 
               label="Email do Aluno"
               v-model="model.emailAluno"
               variant="outlined"
               color="green"
            />
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
            <v-btn color="green" variant="text" @click="cadastrarAluno">
               Cadastrar
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>

export default {
   data() {
      return {
         model: {},
         show: false
      }
   },
   methods: {
      openModal(sender) {
         this.show = true
      },
      cadastrarAluno() {
         let dto = {
            email: this.model.emailAluno,
            username: this.model.nomeAluno
         }

         this.$api.post('create-aluno', { ...dto })
         .then(response => {
            this.show = false
            this.model = {}
         })
         .catch(err => console.log(err))
      }
   }
}

</script>
