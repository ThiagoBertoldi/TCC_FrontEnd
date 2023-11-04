<template>
   <v-dialog v-model="show" max-width="400px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Adicionar item ao mercado</span>
         </v-card-title>

         <v-card-text>

            <v-row>
               <v-col>
                  <v-text-field variant="outlined" color="green" label="Descrição do Item" v-model="model.descricao" />
               </v-col>
            </v-row>

            <v-row>
               <v-col>
                  <v-text-field variant="outlined" color="green" label="Valor do Item" v-model="model.moedas" />
               </v-col>
            </v-row>

         </v-card-text>

         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
            <v-btn color="green" variant="text" @click="addItem">
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
         model: {},
         show: false
      }
   },
   methods: {
      openModal() {
         this.show = true
      },
      addItem() {
         this.$emit('addItemMercado', this.model)
         this.show = false
         this.model = {}
      }
   }
}
</script>