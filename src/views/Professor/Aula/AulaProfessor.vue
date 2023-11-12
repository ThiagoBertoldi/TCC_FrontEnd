<template>
   <div>
      <NavBar @atualizaPagina="atualizaPagina" @salvarAula="salvarAula" :routes="rotasNavBar" />
      <input class="btn-troca-bg" type="file" @change="getImage" />
      <div class="canvas" :style="{ backgroundImage: 'url(' + classBg + ')', backgroundSize: '100% 100%' }"></div>
      <CriarQuestao 
         ref="attQuestao"
      />
   </div>
</template>

<script>
import { adicionaEfeitoArrastar } from '@/@fabricaComponente/Metodo/draggableComponente'
import NavBar from '@/components/NavBar/NavBar.vue'
import CriarQuestao from '@/components/CriarQuestao/CriarQuestao.vue'

export default {
   data() {
      return {
         rotasNavBar: {
            home: true,
            cadastrarAula: true,
            cadastraQuestao: true,
            mercadoAula: true,
            classSave: true,
            adicionaAlunoMateria: true
         },
         classBg: null,
         montado: false
      }
   },
   methods: {
      buscaAulas(id) {
         this.$api.get('get-aulas', { idMateria: id })
            .then(response => {
               var canvas = document.getElementsByClassName('canvas');

               while (canvas.firstChild)
                  canvas.removeChild(canvas.firstChild);

               if(response.data instanceof Array) {
                  response.data.map((aula, index) => {
                     this.criaElementClass(index, aula)
                  })

                  this.setBackground()
                  this.salvarAula()
               }
            })
            .catch(err => { })
      },
      atualizaPagina() {
         const { id } = this.$route.params

         this.buscaAulas(id)
      },
      getImage(event) {
         let file = event.target.files[0];

         if (file) {
            const reader = new FileReader();

            reader.onload = () => {
               this.classBg = reader.result;
            }
            reader.readAsDataURL(file);
         }
      },
      async setBackground() {
         let canvas = document.querySelector('.canvas')

         let dto = { idMateria: this.$route.params.id }

         await this.$api.post('get-background', dto)
         .then(response => {
            canvas.style.backgroundImage = `url('${response.data.backgroundBase64}')`
         })
         .catch(err => console.log(err))
      },
      criaElementClass(num, aula) {
         let canvas = document.querySelector('.canvas')

         let element = document.createElement('div')
         element.classList.add('class-component')
         element.setAttribute('id_aula', aula._id)
         let style = element.style
         style.width = '50px'
         style.height = '50px'
         style.backgroundColor = aula.tipoAula == 1 ? 'blue' : 'orange'
         style.color = '#fff'
         style.borderRadius = '25px'
         style.display = 'flex'
         style.justifyContent = 'center'
         style.alignItems = 'center'
         style.position = 'absolute'
         style.left = `${aula?.posicaoX ?? 0}px`
         style.top = `${aula?.posicaoY ?? 0}px`
         style.cursor = 'pointer'
         style.userSelect = 'none'

         let numElement = document.createElement('p')
         numElement.innerText = num + 1

         element.appendChild(numElement)

         if(aula.tipoAula === 1) {
            element.addEventListener('dblclick', () => this.$router.push({ name: 'BoardProfessor', params: { id: aula.idBoard } }))
         } else {
            element.addEventListener('dblclick', () => this.$refs.attQuestao.openModal(aula))
         }

         adicionaEfeitoArrastar(element)

         canvas.appendChild(element)
      },
      async salvarAula() {
         let canvas = document.querySelector('.canvas')
         let elements = canvas.querySelectorAll('[id_aula]')

         let elementsSave = []

         for await (var element of elements) {
            let id_aula = element.getAttribute('id_aula')
            let posicaoX = element.offsetLeft
            let posicaoY = element.offsetTop

            let dto = {
               id_aula,
               posicaoX,
               posicaoY
            }

            elementsSave.push(dto)
         }

         let backgroundBase64 = window.getComputedStyle(canvas).backgroundImage.replace('url("', '').replace('")', '') ?? null
         
         let dto = {
            elementsSave,
            backgroundBase64: this.classBg ?? backgroundBase64,
            id_materia: this.$route.params.id
         }

         this.$api.post('salva-aulas', dto)
         .then(resp => console.log(resp))
         .catch(err => console.log(err))

      }
   },
   mounted() {
      const { id } = this.$route.params

      this.buscaAulas(id)
   },
   components: {
      NavBar,
      CriarQuestao
   }
}
</script>

<style scoped>
.canvas {
   height: calc(100vh - 68px);
}

.btn-troca-bg {
   position: absolute;
   right: 16px;
   top: 100px;
}
</style>