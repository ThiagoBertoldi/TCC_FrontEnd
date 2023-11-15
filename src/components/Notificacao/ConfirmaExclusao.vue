<template>
   <v-dialog v-model="show" max-width="400px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Confirmação de Exclusão</span>
         </v-card-title>
         <v-card-text>
            Ao clicar em confirmar, você <b>GARANTE</b> que a recompensa '<b>{{ model.itemComprado }}</b>' foi entregue a <b>{{ model.nomeAluno }}</b>?
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="show = false">
               Cancelar
            </v-btn>
            <v-btn color="green" variant="text" @click="confirmaEntrega">
               Confirmar
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
         this.model = sender
      },
      confirmaEntrega() {
         this.$emit('confirmaEntrega', this.model)
         this.show = false
         setTimeout(() => this.model = {}, 400)
      }
   }
}
</script>