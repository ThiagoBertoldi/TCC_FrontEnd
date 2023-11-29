<template>
   <v-dialog v-model="show" max-width="600px">
      <v-card>
         <v-card-title class="ma-4">
            <span class="text-h5">Criando uma questão...</span>
         </v-card-title>
         <v-card-text>
            <v-row>
               <v-col>
                  <v-textarea rows="2" color="green" label="Descrição da questão" variant="outlined"
                     v-model="model.descricaoQuestao" hide-details></v-textarea>
               </v-col>
            </v-row>
            <v-card-text>
               <template v-for="(resposta, index) in listaRespostas" :key="resposta">
                  <div class="d-flex justify-center align-center">
                     <v-col cols="1" class="d-flex align-center">
                        <v-icon :style="{ cursor: 'pointer' }" @click="removerResposta(resposta)">
                           <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                              viewBox="0 0 30 30">
                              <path
                                 d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z">
                              </path>
                           </svg>
                        </v-icon>
                     </v-col>
                     <v-col cols="1">
                        <input type="checkbox" v-model="resposta.respostaCorreta" hide-details />
                     </v-col>
                     <v-col cols="10">
                        <v-text-field :label="'Resposta ' + (index + 1)" variant="outlined" v-model="resposta.descricao"
                           hide-details />
                     </v-col>
                  </div>
               </template>
            </v-card-text>
         </v-card-text>
         <v-card-text>
            <v-row>
               <v-col class="d-flex">
                  <v-btn color="blue" class="flex-grow-1" @click="addResposta">
                     Adicionar Resposta
                  </v-btn>
               </v-col>
            </v-row>
         </v-card-text>
         <v-card-text>
            <v-row>
               <v-col>
                  <v-text-field variant="outlined" label="Quantidade de Moedas por acerto" v-model="model.moedas" />
               </v-col>
            </v-row>
         </v-card-text>
         <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="show = false">
               Voltar
            </v-btn>
            <v-btn color="green" variant="text" @click="salvaQuestao">
               Salvar
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>

   <v-snackbar v-model="snackbar" :timeout="3000" :color="error ? 'red' : 'green'">
      {{ messageSnackBar }}
   </v-snackbar>
</template>

<script>
export default {
   data() {
      return {
         model: {},
         typeButton: false,
         show: false,
         listaRespostas: [],
         snackbar: false,
         messageSnackBar: null,
         error: false
      }
   },
   watch: {
      'error': function (data) {
         this.snackbar = true
      }
   },
   methods: {
      openModal(sender) {
         this.model = {}
         this.listaRespostas = []

         if (sender) {
            this.typeButton = true

            this.$api.get('get-questao', { idAula: sender._id })
               .then(response => {
                  this.model = {
                     idAula: sender._id,
                     descricaoQuestao: response.data.descricaoQuestao,
                     moedas: response.data.moedas
                  }

                  response.data.listaRespostas.map(item => {
                     this.listaRespostas.push({ descricao: item.descricao, respostaCorreta: item.respostaCorreta })
                  })

                  this.show = true;
               })
               .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
         } else {
            this.show = true
         }

      },
      addResposta() {
         if (this.listaRespostas.length >= 5)
            return

         this.listaRespostas.push({ respostaCorreta: false, descricao: '' })
      },
      removerResposta(resposta) {
         let indexResposta = this.listaRespostas.indexOf(resposta)

         if (indexResposta > -1)
            this.listaRespostas.splice(indexResposta, 1)
      },
      async salvaQuestao() {
         let { descricaoQuestao, moedas, idAula } = this.model

         moedas = parseFloat(moedas)

         let dto = {
            idAula: idAula ?? null,
            descricaoQuestao,
            listaRespostas: this.listaRespostas,
            idMateria: this.$route.params.id,
            moedas: isNaN(moedas) ? 0 : moedas > 100 ? 100 : moedas
         }

         this.typeButton ? this.salvaExistente(dto) : this.criarQuestao(dto)
      },
      criarQuestao(dto) {
         this.$api.post('create-questao', dto)
            .then(() => {
               this.show = false
               this.$emit('snackbar', 'Questão criada com sucesso!', true)
            })
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      },
      salvaExistente(dto) {
         this.$api.post('update-questao', dto)
            .then(() => {
               this.show = false
               this.$emit('snackbar', 'Questão atualizada com sucesso!', true)
            })
            .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
      }
   },
   emits: ['snackbar', 'atualizaPagina']
}
</script>