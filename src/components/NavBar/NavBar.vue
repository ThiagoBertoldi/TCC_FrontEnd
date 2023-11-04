<template>
   <div class="elevation-8 bg-white">
      <nav class="navbar-component pa-4">
         <h2>GAMINO</h2>
         <div class="navRoute d-flex align-center" style="gap: 20px;">
            <div v-if="routes?.home && this.$store.getters.getUser.type == 1" @click="goToHome">
               Home
            </div>
            <div v-if="routes?.cadastrarMateria && this.$store.getters.getUser.type == 1" @click="openCriaMateria">
               Cadastrar Matéria
            </div>
            <div v-if="routes?.cadastrarAula && this.$store.getters.getUser.type == 1" @click="openCriaAula">
               Criar Aula
            </div>
            <div v-if="routes?.cadastraQuestao && this.$store.getters.getUser.type == 1" @click="openCriaQuestao">
               Criar Questão
            </div>
            <div v-if="routes?.adicionaAlunoMateria && this.$store.getters.getUser.type == 1" @click="openAdicionaAluno">
               Adicionar Aluno
            </div>
            <div v-if="routes?.mercadoAula && this.$store.getters.getUser.type == 1" @click="openMercado">
               Mercado
            </div>
            <div v-if="routes?.boardSave && this.$store.getters.getUser.type == 1">
               <v-btn color="green" @click="salvarBoard">
                  Salvar
               </v-btn>
            </div>
            <div v-if="routes?.classSave && this.$store.getters.getUser.type == 1">
               <v-btn color="green" @click="salvarAula">
                  Salvar
               </v-btn>
            </div>
            <div v-if="routes?.deleteBoard && this.$store.getters.getUser.type == 1">
               <v-btn color="red" @click="deleteBoard">
                  Deletar
               </v-btn>
            </div>
            <div v-if="routes?.cadastraAluno && this.$store.getters.getUser.type == 1" @click="openCadastraAluno">
               Cadastrar Aluno
            </div>
            <div v-if="routes?.perfilProfessor && this.$store.getters.getUser.type == 1" @click="goToPerfil">
               Perfil
            </div>

            <div v-if="routes?.homeAluno && this.$store.getters.getUser.type == 2" @click="goToHomeAluno">
               Home
            </div>
         </div>
         <div v-if="$router.currentRoute.value.name == 'AulaAluno' && this.$store.getters.getUser.type == 2"
            style="color: gold;">
            Moedas: {{ $store.getters.getMoedas }}
         </div>
      </nav>
   </div>
   <CriaMateria @success_snackbar="setMessageSnackBar" @error_snackbar="setMessageSnackBar"
      @atualizaPagina="atualizaPagina" ref="criarMateria" />

   <CriaAula @success_snackbar="setMessageSnackBar" @error_snackbar="setMessageSnackBar" @atualizaPagina="atualizaPagina"
      ref="criaAula" />

   <AdicionaAlunoMateria ref="adicionaAlunoMateria" />

   <CriarQuestao ref="criaQuestao" />

   <MercadoAula ref="mercadoAula" />

   <CadastraAluno ref="cadastraAluno" />

   <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbar_success ? 'green' : 'red'">
      {{ snackbar_message }}
   </v-snackbar>
</template>

<script>
import CriaMateria from '../CriaMateria/CriaMateria.vue'
import CriaAula from '../CriaAula/CriaAula.vue'
import CriarQuestao from '../CriarQuestao/CriarQuestao.vue'
import MercadoAula from '../Mercado/MercadoAula.vue'
import CadastraAluno from '../CadastraAluno/CadastraAluno.vue'
import AdicionaAlunoMateria from '../AdicionaAlunoMateria/AdicionaAlunoMateria.vue'
import { useStore } from 'vuex'

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
         this.$router.push('/home-professor')
      },
      goToHomeAluno() {
         this.$router.push('/home-aluno')
      },
      goToPerfil() {
         this.$router.push('/perfil-professor')
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
      openCadastraAluno() {
         this.$refs.cadastraAluno.openModal()
      },
      openMercado() {
         this.$refs.mercadoAula.openModal()
      },
      openAdicionaAluno() {
         this.$refs.adicionaAlunoMateria.openModal()
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
      salvarAula() {
         this.$emit('salvarAula', null)
      },
      deleteBoard() {
         this.$emit('confirmDeleteBoard', null)
      },
      getMoedasAluno() {
         if (this.$router.currentRoute.value.name == 'AulaAluno') {
            this.$api.get('get-moedas', { idMateria: this.$route.params.id })
               .then(response => {
                  this.$store.dispatch('setMoedas', response.data.moedas)
               })
         }
      }
   },
   mounted() {
      this.getMoedasAluno()
   },
   props: {
      routes: Object
   },
   components: {
      CriaMateria,
      CriaAula,
      CriarQuestao,
      MercadoAula,
      CadastraAluno,
      AdicionaAlunoMateria
   },
   emits: ['atualizaPagina', 'salvarBoard', 'salvarAula', 'deleteBoard', 'salvaMercado']
}
</script>