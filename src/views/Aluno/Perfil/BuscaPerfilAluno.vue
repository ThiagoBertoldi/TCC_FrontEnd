<template>
  <NavBar :routes="rotasNavBar" />
  <div style="width: 100%; height: 90vh;" class="m-4 d-flex justify-center align-center">
    <v-row>
      <v-col cols="12">
        <v-row class="d-flex justify-center">
          <v-col cols="12" class="d-flex justify-center align-center flex-column">
            <div style="width: 250px; height: 250px; background-color: white; border-radius: 50%; padding: 20px">
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24">
                <path
                  d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8L8.11 7.06L5 5.5L12 2L19 5.5V10.5H18V6L15.89 7.06L16 8M12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" />
              </svg>
            </div>
            <v-col style="color: #fff; margin-top: 20px" class="d-flex align-center flex-column">
              <p style="font-size: 30px">{{ nome }}</p>

              <p style="font-size: 20px">Lvl {{ nivelAtual }}</p>
              <div class="xp-bar">
                <div class="xp-bar-inner" :style="{ backgroundColor: sorteiaCor(), width: porcentagemBarraXp + '%' }">
                  <div class="xp-bar-level">{{ porcentagemBarraXp.toFixed(0) }}%</div>
                </div>
              </div>
              <small>{{ nome }} tem {{ xpTotal }} de XP, ele precisa mais {{ xpFaltante }} de
                XP para o próximo nível</small>
              <p v-if="titulo != 'Nenhum título'" class="mt-4">Conhecido como <i>"{{ titulo }}"</i></p>
              <p v-else class="mt-4">{{ nome }} não selecionou nenhum título</p>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>

  <v-snackbar v-model="snackbar" :timeout="3000" color="red">
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
      nome: '',
      titulo: 'Título',
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
        if (xp < 0)
          continua = false

        this.nivelAtual++
        qntdXpUltimoLvl = totalXpProximoNivel
        totalXpProximoNivel += qntdXp
        qntdXp += 10
      } while (continua)

      this.porcentagemBarraXp = (qntdXpFaltante * 100) / (totalXpProximoNivel - qntdXpUltimoLvl)
      this.xpFaltante = totalXpProximoNivel - this.xpTotal
    }
  },
  async mounted() {
    let dto = { idAmigo: this.$route.params.id }

    this.$api.get('get-infos-amigo', dto)
      .then(async response => {
        this.nome = response.data.nome
        this.titulo = response.data.titulo
        this.calculaXp(response.data?.xp ?? 0)   
      })
      .catch(err => {
        console.log(err)
        this.snackbar = true
        this.error.message = err.response.data.data.message
      })
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.xp-bar {
  width: 35%;
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
