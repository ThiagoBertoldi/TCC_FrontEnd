<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Mercado da Matéria</span>
         </v-card-title>

         <v-card-text>
            <template v-for="item in itensMercado" :key="item">
               <v-row class="perguntas">
                  <v-col cols="1" class="d-flex align-center">
                     <v-icon :style="{ cursor: 'pointer' }" @click="removerItemMercado(item)" >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                           <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                     </v-icon>
                  </v-col>
                  <v-col cols="8">
                     <v-text-field hide-details color="green" variant="outlined" label="Descrição troca"
                        v-model="item.descricao" />
                  </v-col>
                  <v-col cols="3">
                     <v-text-field hide-details color="green" variant="outlined" label="Moedas"
                        v-model="item.moedas" />
                  </v-col>
               </v-row>
            </template>
            <v-row>
               <v-col class="d-flex">
                  <v-btn color="blue" class="flex-grow-1" @click="modalAddItemMercado">
                     Adicionar item ao mercado
                  </v-btn>
               </v-col>
            </v-row>
         </v-card-text>

         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
            <v-btn color="green" variant="text" @click="salvarMercado">
               Salvar
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>

   <AddItemMercado ref="addItemMercado" @addItemMercado="addItemMercado" />
</template>

<script>
import AddItemMercado from './AddItemMercado.vue'

export default {
   data() {
      return {
         itensMercado: [],
         show: false
      }
   },
   methods: {
      async openModal() {
         this.itensMercado = []

         await this.$api.get('get-itens-mercado', { idMateria: this.$route.params.id })
            .then(response => {
               if (!response.data?.hasError) {
                  if (response.data.itensMercado instanceof Array) {
                     response.data.itensMercado.map(item => {
                        this.itensMercado.push(item)
                     })
                  }
               }
            })
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))

         this.show = true
      },
      modalAddItemMercado() {
         this.$refs.addItemMercado.openModal()
      },
      addItemMercado(model) {
         this.itensMercado.push(model)
      },
      removerItemMercado(remover) {
         let removerPos = this.itensMercado.indexOf(remover)

         if(removerPos > -1)
            this.itensMercado.splice(removerPos, 1)
      },
      salvarMercado(model) {
         let dto = {
            idMateria: this.$route.params.id,
            itensMercado: this.itensMercado
         }

         this.$api.post('att-mercado', dto)
         .then(() => {
            this.show = false
            this.itensMercado = []
            this.$emit('snackbar', 'Mercado atualizado com sucesso', true)
         })
         .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      }
   },
   components: {
      AddItemMercado
   },
   emits: ['snackbar']
}
</script>