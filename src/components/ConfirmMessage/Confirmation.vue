<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Excluir este board?</span>
         </v-card-title>
         <v-card-text>
            Tem certeza que você deseja excluir este board?
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Não
            </v-btn>
            <v-btn color="green" variant="text" @click="deleteBoard">
               Sim
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
      async deleteBoard() {
         this.$emit('confirmDeleteBoard')
         this.show = false
      }
   },
   emits: [ 'confirmDeleteBoard' ]
}
</script>