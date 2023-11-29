<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Adicionar uma Matéria</span>
         </v-card-title>
         <v-card-text>
            <v-row>
               <v-col>
                  <v-text-field color="green" label="Nome da Matéria" variant="outlined" v-model="model.nomeMateria"
                     hide-details></v-text-field>
               </v-col>
            </v-row>
            <v-row>
               <v-col>
                  <v-text-field color="green" label="Turma" variant="outlined" v-model="model.turma"
                     hide-details></v-text-field>
               </v-col>
            </v-row>
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
            <v-btn color="green" variant="text" @click="criarMateria">
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
      async criarMateria() {
         const { nomeMateria, turma } = this.model

         let newMateria = {
            nomeMateria,
            turma
         }

         await this.$api.post('create-materia', newMateria)
            .then(() => {
               this.show = false
               this.$emit('snackbar', 'Matéria criada com sucesso!', true)
               this.$emit('atualizaPagina', null)
            })
            .catch(() => {
               this.$emit('snackbar', 'Não foi possível criar a matéria', false)
            })
      }
   },
   emits: ['snackbar']
}
</script>