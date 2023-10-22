<template>
   <div>
      <NavBar @atualizaPagina="atualizaPagina" :routes="rotasNavBar" />
      <h1>Aluno</h1>
      <div>{{ user?.username ?? 'User não logado' }}</div>
      {{ this.$store.getters.getUser }}
   </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue';

export default {
   data() {
      return {
         user: null,
         rotasNavBar: {
            perfil: true
         }
      }
   },
   methods: {
      atualizaPagina() {

      }
   },
   mounted() {
      this.user = this.$store.getters.getUser

      this.$api.post('busca-aulas-aluno', { alunoId: this.user })
   },
   components: {
      NavBar
   }
}
</script>