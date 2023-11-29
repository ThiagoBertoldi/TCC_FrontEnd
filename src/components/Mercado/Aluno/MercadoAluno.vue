<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Mercado da Matéria</span>
         </v-card-title>

         <v-card-text v-if="itensMercado.length > 0">
            <template v-for="item in itensMercado" :key="item">
               <v-col>
                  <v-row>
                     <v-col cols="9">
                        <v-text-field variant="outlined" color="green" readonly :value="item.descricao" hide-details />
                     </v-col>
                     <v-col cols="3" class="d-flex align-center justify-center">
                        <v-btn color="green" class="flex-grow-1" style="height: 100%;" @click="comprarItem(item)"
                           :disabled="$store.getters.getMoedas < item.moedas">
                           R$ {{ item.moedas }}
                        </v-btn>
                     </v-col>
                  </v-row>
               </v-col>
            </template>
         </v-card-text>

         <v-card-text v-else>
            <v-col>
               <v-row>
                  Não tem nenhum item para ser comprado :/
               </v-row>
            </v-col>
         </v-card-text>

         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>

   <ConfirmaCompra ref="confirmaCompra" @confirmaCompra="confirmaCompra" />
</template>

<script>
import ConfirmaCompra from './ConfirmaCompra.vue'

export default {
   data() {
      return {
         show: false,
         itensMercado: []
      }
   },
   methods: {
      openModal(sender) {
         this.show = true

         this.$api.get('get-itens-mercado', { idMateria: sender })
            .then(response => {
               this.itensMercado = response.data.itensMercado
            })
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      },
      comprarItem(item) {
         this.$refs.confirmaCompra.openModal(item)
      },
      confirmaCompra(model) {
         let item = this.itensMercado.find(x => x.descricao == model.descricao && x.moedas == model.moedas)

         let dto = {
            idMateria: this.$route.params.id,
            descricaoItem: item.descricao,
            moedasItem: item.moedas
         }

         this.$api.post('comprar-item', dto)
            .then(() => this.show = false)
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      }
   },
   components: {
      ConfirmaCompra
   },
   emits: ['snackbar']
}
</script>