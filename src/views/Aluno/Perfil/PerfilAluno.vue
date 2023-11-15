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

                     <p>Lvl {{ nivelAtual }}</p>
                     <div class="xp-bar">
                        <div class="xp-bar-inner"
                           :style="{ backgroundColor: sorteiaCor(), width: porcentagemBarraXp + '%' }">
                           <div class="xp-bar-level">{{ porcentagemBarraXp.toFixed(0) }}%</div>
                        </div>
                     </div>
                     <small>Você tem {{ xpTotal }} de XP, necessário mais {{ xpFaltante }} de XP para o próximo nível</small>
                     <p class="mt-4">Conhecido como <i>"{{ titulo }}"</i></p>
                  </v-col>
               </v-col>
               <v-col cols="5" class="d-flex align-center flex-column">
                  <h2 style="color: white">Títulos</h2>
                  <div style="width: 100%; max-height: 300px; overflow: auto">
                     <template v-for="(item, index) in titulos" :key="item">
                        <v-card class="ma-2">
                           <v-card-text @click="selecTitulo(item, index + 1)">
                              <div>{{ item.descricao }}</div>
                              <small>Você precisa ser Lvl {{ index + 1 }} para usar esse título</small>
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

   <v-snackbar
         v-model="snackbar"
         :timeout="3000"
         color="red"
      >
         {{ error?.message }}
      </v-snackbar>
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
         extratos: [],
         nivelAtual: 0,
         xpFaltante: 0,
         porcentagemBarraXp: 0,
         xpTotal: 0,
         snackbar: false,
         error: { message: null }
      }
   },
   methods: {
      sorteiaCor() {
         let numero = Math.floor(Math.random() * (10)) + 1;

         return {
            1: 'orange',
            2: 'green',
            3: 'pink',
            4: 'blue',
            5: 'cyan',
            6: 'amber',
            7: 'purple',
            8: 'red',
            9: 'brown',
            10: 'grey'
         }[numero] || 'black'
      },
      selecTitulo(titulo, lvl) {
         if(this.nivelAtual >= lvl) {
            this.$api.post('define-titulo', { titulo: titulo.descricao })
               .then(() => {
                  this.getTitulo()
               })
               .catch(err => console.log(err))
         } else {
            this.snackbar = true
            this.error.message = "Você não tem nível suficiente para usar esse título"
         }
      },
      async getTitulo() {
         this.$api.get('get-titulo', {})
            .then(response => { this.titulo = response.data.titulo })
            .catch(err => { console.log(err) })
      },
      async getTitulos() {
         this.$api.get('get-titulos', null)
            .then(response => this.titulos = response.data)
            .catch(err => console.log(err))
      },
      async getExtrato() {
         this.$api.get('get-extrato', {})
            .then(response => this.extratos = response.data.objetosFinais)
            .catch(err => console.log(err))
      },
      async getXpAluno() {
         this.$api.get('get-xp', {})
            .then(response => this.calculaXp(response.data.xp))
            .catch(err => console.log(err))
      },
      calculaXp(xp = 0) {
         this.xpTotal = xp

         let qntdXp = 50
         let totalXpProximoNivel = 0
         let qntdXpUltimoLvl = 0
         let continua = true
         let qntdXpFaltante = 0

         do {
            xp = xp - qntdXp
            qntdXpFaltante = xp - (qntdXp * -1)
            if(xp < 0)
               continua = false
            
            this.nivelAtual++
            qntdXpUltimoLvl = totalXpProximoNivel
            totalXpProximoNivel += qntdXp
            qntdXp += 10
         }while(continua)

         this.porcentagemBarraXp = (qntdXpFaltante * 100) / (totalXpProximoNivel - qntdXpUltimoLvl)
         this.xpFaltante = totalXpProximoNivel - this.xpTotal
      }
   },
   async mounted() {

      await this.getTitulo()
      await this.getTitulos()
      await this.getExtrato()
      await this.getXpAluno()

   },
   components: {
      NavBar
   }
}
</script>

<style scoped>
.xp-bar {
   width: 60%;
   height: 30px;
   background-color: #ccc;
   border-radius: 15px;
   display: flex;
   align-items: center;
}

.xp-bar-inner {
   min-width: 50px;
   height: 100%;
   background-color: #000;
   border-radius: 15px;
   display: flex;
   align-items: center;
   justify-content: center;
}

.xp-bar-level {
   align-self: center;
   text-align: center;
   font-size: 16px;
   color: #fff;
}
</style>
