<template>
   <NavBar :routes="rotasNavBar" />
   <div style="width: 100%; height: 88vh; margin-top: 4vh" class="m-4">
      <v-row>
         <v-col cols="12">
            <v-row class="d-flex justify-center">
               <v-col cols="5" class="d-flex justify-center align-center flex-column">
                  <div style="width: 250px; height: 250px; background-color: white; border-radius: 50%; padding: 20px">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24">
                        <path
                           d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8L8.11 7.06L5 5.5L12 2L19 5.5V10.5H18V6L15.89 7.06L16 8M12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" />
                     </svg>
                  </div>
                  <v-col style="color: #fff; margin-top: 20px" class="d-flex align-center flex-column">
                     <p>{{ $store.getters.getUser.username }}</p>
                     <i>{{ $store.getters.getUser.email }}</i>
                     <div class="levelBar">
                        Lvl 5   
                     </div>
                     <p>{{ titulo }}</p>
                  </v-col>
               </v-col>
               <v-col cols="5" class="d-flex align-center flex-column">
                  <h2 style="color: white">Títulos</h2>
                  <div style="width: 100%; max-height: 300px; overflow: auto">
                     <template v-for="item in titulos" :key="item">
                        <v-card class="ma-2">
                           <v-card-text @click="selecTitulo(item)">
                              {{ item.descricao }}
                           </v-card-text>
                        </v-card>
                     </template>
                  </div>
               </v-col>
            </v-row>
         </v-col>
         <v-col class="my-4">
            <v-row class="my-2 d-flex justify-center">
               <v-col cols="10" class="d-flex justify-center align-center flex-column">
                  <h2 style="color: white" class="mb-4">Extrato dos Itens comprados</h2>
                  <template v-for="item in extratos" :key="item.nomeMateria">
                     <v-col>
                        <v-card class="pa-2 d-flex justify-between">
                           <v-col>
                              <td>Item: {{ item.nomeItem }}</td>
                           </v-col>
                           <v-col>
                              <td>Preço: {{ item.moedas }} moedas</td>
                           </v-col>
                           <v-col>
                              <td>Matéria: {{ item.nomeMateria }}</td>
                           </v-col>
                           <v-col>
                              <td>Turma: {{ item.turma }}</td>
                           </v-col>
                           <v-col>
                              <td>Data da compra: {{ new Date(item.created_at).toLocaleDateString('pt-BR') }}</td>
                           </v-col>
                        </v-card>
                     </v-col>
                  </template>
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import NavBar from '../../../components/NavBar/NavBar.vue'

export default {
   data() {
      return {
         rotasNavBar: {
            homeAluno: true,
         },
         titulos: [],
         titulo: 'Título',
         extratos: []
      }
   },
   methods: {
      selecTitulo(titulo) {
         this.$api.post('define-titulo', { titulo: titulo.descricao })
            .then(() => {
               this.getTitulo()
            })
            .catch(err => console.log(err))
      },
      getTitulo() {
         this.$api.get('get-titulo', {})
            .then(response => { this.titulo = response.data.titulo })
            .catch(err => { return 'Error' })
      },
      getTitulos() {
         this.$api.get('get-titulos', null)
            .then(response => this.titulos = response.data)
            .catch(err => console.log(err))
      },
      getExtrato() {
         this.$api.get('get-extrato', {})
            .then(response => this.extratos = response.data.objetosFinais)
            .catch(err => console.log(err))
      }
   },
   async mounted() {

      await this.getTitulo()
      await this.getTitulos()
      await this.getExtrato()

   },
   components: {
      NavBar
   }
}
</script>

<style scoped>
.levelBar{
   width: 100%;
   height: 30px;
   background-color: aqua;
   color: black;
   margin: 10px;
   padding: 6px;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 15px;
}

</style>
