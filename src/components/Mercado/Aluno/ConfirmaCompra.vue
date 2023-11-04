<template>
   <v-dialog v-model="show" max-width="400px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Confirmação de Compra</span>
         </v-card-title>

         <v-card-text>
            Você deseja mesmo comprar o item <b>{{ item.descricao }}</b> por <b>{{ item.moedas }}</b> moedas?
         </v-card-text>

         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="show = false">
               Cancelar
            </v-btn>
            <v-btn color="green" variant="text" @click="continuar">
               Comprar
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
         item: null
      }
   },
   methods: {
      openModal(sender) {
         this.show = true

         this.item = sender
      },
      continuar() {
         this.show = false
         this.$emit('confirmaCompra', this.item)
         setTimeout(() => this.item = {}, 400)
      }
   }
}
</script>