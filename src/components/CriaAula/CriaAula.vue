<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Adicionar uma Aula</span>
         </v-card-title>
         <v-card-text>
            <v-row>
               <v-col>
                  <v-text-field color="green" label="Nome da Aula" variant="outlined" v-model="model.nomeAula"
                     hide-details></v-text-field>
               </v-col>
            </v-row>
            <v-row>
               <v-col>
                  <v-text-field color="green" label="Conteúdo da Aula" variant="outlined" v-model="model.conteudoAula"
                     hide-details></v-text-field>
               </v-col>
            </v-row>
            <v-row>
               <v-col>
                  <v-text-field color="green" label="Data da Aula" variant="outlined" type="datetime-local" :min="new Date()" v-model="model.dataAula"
                     hide-details></v-text-field>
               </v-col>
            </v-row>
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
            <v-btn color="green" variant="text" @click="criarAula">
               Criar
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
         model: {}
      }
   },
   methods: {
      openModal(sender) {
         this.show = true;
      },
      async criarAula() {
         const { nomeAula, conteudoAula, dataAula } = this.model
         const { id } = this.$route.params

         let newAula = {
            nomeAula,
            conteudoAula,
            idMateria: id,
            dataAula
         }

         await this.$api.post('create-aula', newAula)
         .then(() => {
            this.show = false
            this.$emit('success_snackbar', 'Aula criada com sucesso!', true)
            this.$emit('atualizaPagina', null)
         })
         .catch(() => {
            this.$emit('error_snackbar', 'Não foi possível criar a aula', false)
         })
      }
   }
}
</script>