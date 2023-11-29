<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Questão</span>
         </v-card-title>
         <v-card-text>
            <v-row>
               <v-col>
                  <v-textarea rows="2" color="green" label="Descrição da questão" variant="outlined"
                     v-model="model.descricaoQuestao" hide-details readonly></v-textarea>
               </v-col>
            </v-row>
            <v-card-text>
               <template v-for="(resposta, index) in listaRespostas" :key="resposta">
                  <div class="d-flex justify-center align-center" @click="selecionaQuestao(resposta, $event)">
                     <v-col cols="12">
                        <v-text-field :label="'Resposta ' + (index + 1)" color="green" variant="outlined" v-model="resposta.descricao"
                           hide-details readonly />
                     </v-col>
                  </div>
               </template>
            </v-card-text>
         </v-card-text>
         <v-card-actions class="ma-4" v-if="!respondida">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn> 
            <v-btn color="green" @click="responderQuestao">
               Responder
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
         show: false,
         listaRespostas: [],
         questaoSelecionada: null,
         idAula: null,
         questao: null,
         respondida: true
      }
   },
   methods: {
      openModal(sender, respondida) {
         this.model = {}

         this.idAula = sender._id
         this.respondida = respondida

         this.$api.get('get-questao', { idAula: sender._id })
            .then(response => {
               this.questao = response.data
               this.model.descricaoQuestao = response.data.descricaoQuestao
               this.listaRespostas = response.data.listaRespostas
               this.show = true;
            })
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      },
      selecionaQuestao(resposta, e) {
         this.questaoSelecionada = resposta
      },
      responderQuestao(){
         if(!this.questaoSelecionada?.respostaCorreta && this.questaoSelecionada?.respostaCorreta != false)
            return

         const { respostaCorreta } = this.questaoSelecionada

         let dto = {
            idAula: this.idAula,
            idQuestao: this.questao._id,
            idMateria: this.questao.idMateria,
            qntdMoedas: this.questao.moedas,
            respostaCorreta: respostaCorreta
         }

         this.$api.post('valida-questao', dto)
         .then(() => {
            this.show = false
            this.model = {}
            this.$emit('refresh', null)
         })
         .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      }
   }
}
</script>