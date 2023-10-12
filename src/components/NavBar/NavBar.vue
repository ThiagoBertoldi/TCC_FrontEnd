<template>
   <div class="elevation-8 bg-white">
      <nav class="navbar-component pa-4">
         <h2>GAMINO</h2>
         <div class="navRoute d-flex align-center" style="gap: 20px;">
            <div v-if="routes?.home" @click="goToHome">
               Home
            </div>
            <div v-if="routes?.cadastrarMateria" @click="openCriaMateria">
               Cadastrar Matéria
            </div>
            <div v-if="routes?.cadastrarAula" @click="openCriaAula">
               Criar Aula
            </div>
            <div v-if="routes?.cadastraQuestao" @click="openCriaQuestao">
               Criar Questão
            </div>
            <div v-if="routes?.mercadoAula" @click="openMercado">
               Mercado
            </div>
            <div v-if="routes?.boardSave">
               <v-btn color="green" @click="salvarBoard">
                  Salvar
               </v-btn>
            </div>
            <div v-if="routes?.classSave">
               <v-btn color="green" @click="salvarAula">
                  Salvar
               </v-btn>
            </div>
            <div v-if="routes?.deleteBoard">
               <v-btn color="red" @click="deleteBoard">
                  Deletar
               </v-btn>
            </div>
         </div>
      </nav>
   </div>
   <CriaMateria 
      @success_snackbar="setMessageSnackBar" 
      @error_snackbar="setMessageSnackBar"
      @atualizaPagina="atualizaPagina" 
      ref="criarMateria" />

   <CriaAula @success_snackbar="setMessageSnackBar" @error_snackbar="setMessageSnackBar" @atualizaPagina="atualizaPagina"
      ref="criaAula" />

   <CriarQuestao
      ref="criaQuestao"
   />

   <MercadoAula
      ref="mercadoAula"
   />

   <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbar_success ? 'green' : 'red'">
      {{ snackbar_message }}
   </v-snackbar>
</template>

<script>
import CriaMateria from '../CriaMateria/CriaMateria.vue'
import CriaAula from '../CriaAula/CriaAula.vue'
import CriarQuestao from '../CriarQuestao/CriarQuestao.vue'
import MercadoAula from '../Mercado/MercadoAula.vue'

export default {
   data() {
      return {
         snackbar: false,
         snackbar_success: false,
         snackbar_message: null
      }
   },
   methods: {
      goToHome() {
         
      },
      openCriaMateria() {
         this.$refs.criarMateria.openModal()
      },
      openCriaAula() {
         this.$refs.criaAula.openModal()
      },
      openCriaQuestao() {
         this.$refs.criaQuestao.openModal()
      },
      openMercado() {
         this.$refs.mercadoAula.openModal()
      },
      setMessageSnackBar(message, success) {
         this.snackbar = true
         this.snackbar_success = success
         this.snackbar_message = message
      },
      atualizaPagina() {
         this.$emit('atualizaPagina', null)
      },
      salvarBoard() {
         this.$emit('salvarBoard', null)
      },
      salvarAula(){
         this.$emit('salvarAula', null)
      },
      deleteBoard() {
         this.$emit('confirmDeleteBoard', null)
      }
   },
   props: {
      routes: Object
   },
   components: {
      CriaMateria,
      CriaAula,
      CriarQuestao,
      MercadoAula
   },
   emits: [ 'atualizaPagina', 'salvarBoard', 'salvarAula', 'deleteBoard', 'salvaMercado' ]
}
</script>