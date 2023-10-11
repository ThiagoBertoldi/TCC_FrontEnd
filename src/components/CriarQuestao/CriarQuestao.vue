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
               <template v-for="(questao, index) in listaRespostas" :key="questao">
                  <div class="d-flex">
                     <v-col cols="2">
                        <v-checkbox v-model="model.respostaCorreta" color="red" :value="questao.desc"
                           hide-details></v-checkbox>
                     </v-col>
                     <v-col cols="10">
                        <v-text-field :label="questao.id" variant="outlined" v-model="model[questao.desc]" />
                     </v-col>
                  </div>
               </template>
            </v-card-text>
         </v-card-text>
         <v-card-text>
            <v-row>
               <v-col class="d-flex">
                  <v-btn color="blue" class="flex-grow-1" @click="addQuestao">
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
               {{ typeButton ? 'Salvar' : 'Criar' }}
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
export default {
   data() {
      return {
         model: {

         },
         typeButton: false,
         show: false,
         listaRespostas: []
      }
   },
   methods: {
      openModal(sender) {
         this.model = {}
         this.listaRespostas = []

         if(sender) {
            this.typeButton = true

            this.$api.get('get-questao', { idAula: sender._id })
            .then(response => {
               this.model = {
                  idAula: sender._id,
                  descricaoQuestao: response.data.descricaoQuestao,
                  moedas: response.data.moedas,
                  respostaCorreta: response.data.respostaCorreta
               }

               const { resposta1, resposta2, resposta3, resposta4, resposta5 } = response.data

               if(resposta1) {
                  this.listaRespostas.push({ desc: 'resposta1', id: 'Questão 1' })
                  this.model['resposta1'] = resposta1
               }

               if(resposta2) {
                  this.listaRespostas.push({ desc: 'resposta2', id: 'Questão 2' })
                  this.model['resposta2'] = resposta2
               }

               if(resposta3) {
                  this.listaRespostas.push({ desc: 'resposta3', id: 'Questão 3' })
                  this.model['resposta3'] = resposta3
               }

               if(resposta4) {
                  this.listaRespostas.push({ desc: 'resposta4', id: 'Questão 4' })
                  this.model['resposta4'] = resposta4
               }

               if(resposta5) {
                  this.listaRespostas.push({ desc: 'resposta5', id: 'Questão 5' })
                  this.model['resposta5'] = resposta5
               }

               this.show = true;
            })
            .catch(err => console.log(err))
         } else {
            this.show = true
         }

      },
      addQuestao() {
         if (this.listaRespostas.length >= 5)
            return

         this.listaRespostas.push({ desc: `resposta${this.listaRespostas.length + 1}`, id: 'Questão ' + (this.listaRespostas.length + 1) })
      },
      async salvaQuestao() {
         let { descricaoQuestao, respostaCorreta, moedas, idAula } = this.model
         const { id } = this.$route.params

         moedas = parseFloat(moedas)

         if(!respostaCorreta || !descricaoQuestao)
            return

         if(!this.model['resposta1'] || !this.model['resposta2'])
            return

         let dto = {
            idAula: idAula ?? null,
            descricaoQuestao,
            respostaCorreta,
            resposta1: this.model['resposta1'] ?? null,
            resposta2: this.model['resposta2'] ?? null,
            resposta3: this.model['resposta3'] ?? null,
            resposta4: this.model['resposta4'] ?? null,
            resposta5: this.model['resposta5'] ?? null,
            idMateria: this.$route.params.id,
            moedas: isNaN(moedas) ? 0 : moedas
         }

         this.typeButton ? this.salvaExistente(dto) : this.criarQuestao(dto) 
      },
      criarQuestao(dto) {
         this.$api.post('create-questao', dto)
         .then(resp => console.log(resp))
         .catch(err => console.log(err))
      },
      salvaExistente(dto) {
         this.$api.post('update-questao', dto)
         .then(resp => console.log(resp))
         .catch(err => console.log(err))
      }
   }
}
</script>