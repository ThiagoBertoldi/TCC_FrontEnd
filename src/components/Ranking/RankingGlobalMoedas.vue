<template>
  <v-dialog v-model="show" max-width="1000px">
    <v-card>
      <v-card-title class="ma-4 d-flex flex-column">
        <span class="text-h5">Ranking da Matéria</span>
        <small><i>O ranking é definido com base na quantidade de moedas que o aluno tem em todas as matérias juntas</i></small>
      </v-card-title>

      <v-card-text class="d-flex flex-column">
        <v-col cols="12">
          <v-row class="ga-2">
            <template v-for="(item, index) in podio" :key="item">
              <v-col cols="4" class="d-flex align-stretch">
                <v-card class="d-flex justify-center align-center w-100" @click="openPerfilAluno(item._id)">

                  <v-col cols="3">
                    <v-img :src="getMedalha(index)" />
                  </v-col>
                  <v-col cols="9" class="d-flex flex-column">
                    <div>
                      <p>{{ item?.nome[0] }}</p>
                      <i style="font-size: 14px">{{ item?.titulo[0] ?? 'Novato' }}</i>
                    </div>
                    <div class="d-flex justify-end">
                      <p>{{ item.total }} moedas </p>
                    </div>
                  </v-col>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-col>

        <v-col cols="12">
          <template v-for="(item, index) in ranking" :key="item">
            <v-card class="mt-2 d-flex justify-between" @click="openPerfilAluno(item._id)">
              <v-col cols="1" class="d-flex justify-center align-center">
                <p> {{ index + 4 }}° </p>
              </v-col>
              <v-col cols="9" class="d-flex justify-center flex-column">
                <p>{{ item?.nome[0] }}</p>
                <i style="font-size: 14px">{{ item?.titulo[0] ?? 'Novato' }}</i>
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-center">
                <p>{{ item.total }} moedas</p>
              </v-col>
            </v-card>
          </template>
        </v-col>
      </v-card-text>

      <v-card-actions class="ma-4">
        <v-spacer></v-spacer>
        <v-btn color="blue" variant="text" @click="show = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      ranking: [],
      podio: []
    }
  },
  methods: {
    openModal(sender) {
      this.buscaRanking()

      this.show = true
    },
    getMedalha(index) {
      switch (index) {
        case 0:
          return new URL('../../../public/medalha-de-ouro.png', import.meta.url).href
        case 1:
          return new URL('../../../public/medalha-de-prata.png', import.meta.url).href
        case 2:
          return new URL('../../../public/medalha-de-bronze.png', import.meta.url).href
        default:
          return ''
      }
    },
    openPerfilAluno(aluno) {
      this.$router.push({ name: 'BuscaPerfilAluno', params: { id: aluno } })
    },
    buscaRanking() {
      this.$api.get('get-ranking-global-moedas', {})
        .then(response => {
          this.podio = response.data.filter((item, index) => {
            if (index < 3)
              return item
          })

          this.ranking = response.data.filter((item, index) => {
            if (index >= 3)
              return item
          })
        })
        .catch(err => { })
    }
  }
}
</script>