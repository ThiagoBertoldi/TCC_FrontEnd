<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Notificações</span>
         </v-card-title>
         <v-card-text>
            <template v-for="item in notificacoes" :key="item">
               <v-card class="ma-2 pa-4">
                  <v-row>
                     <v-col>
                        <h3><b>Aluno: {{ item.nomeAluno }}</b></h3>
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col>
                        Item: {{ item.itemComprado }}
                     </v-col>
                     <v-col class="d-flex justify-end">
                        Moedas: {{ item.preco }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col>
                        Matéria: {{ item.materia }}
                     </v-col>
                     <v-col class="d-flex justify-end">
                        Turma: {{ item.turma }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col>
                        Data da compra: {{ new Date(item?.created_at ?? new Date()).toLocaleDateString('pt-BR') }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-btn class="flex-grow-1 ma-2" color="red" @click="confirmarRemoverNotificação(item)">
                        Remover
                     </v-btn>
                  </v-row>
               </v-card>
            </template>
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>

   <ConfirmaExclusao ref="confirmaExclusao" @confirmaEntrega="confirmaEntrega" />
</template>

<script>
import ConfirmaExclusao from './ConfirmaExclusao.vue'

export default {
   data() {
      return {
         model: {},
         show: false,
         notificacoes: []
      }
   },
   methods: {
      openModal(sender) {
         this.show = true

         this.buscaNotificacoes()
      },
      buscaNotificacoes() {
         this.$api.get('notificacoes-professor', {})
            .then(response => {
               this.notificacoes = response.data
            })
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      },
      confirmarRemoverNotificação(item) {
         this.$refs.confirmaExclusao.openModal(item)
      },
      confirmaEntrega(model) {
         this.$api.post('exclusao-notificacao', { idNotificacao: model._id })
            .then(() => this.buscaNotificacoes())
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      }
   },
   components: {
      ConfirmaExclusao
   },
   emits: ['snackbar']
}
</script>