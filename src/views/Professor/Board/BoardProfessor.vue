<template>
   <div>
      <ConfirmDialog ref="deleteBoard" @confirmDeleteBoard="deleteBoard" />
      <NavBar @salvarBoard="salvarBoard" @confirmDeleteBoard="confirmDeleteBoard" :routes="rotasNavBar" />
      <div>
         <v-row class="ma-2">
            <v-col cols="2">
               <v-card class="bg-white d-flex align-center flex-column" cols="2" style="min-height: 86vh">
                  <v-col cols="12" class="d-flex align-center flex-column">
                     <h2>Componentes</h2>
                     <v-col>
                        <v-card class="d-flex justify-center mt-4 pa-4" @click="criarComponente('text')">
                           <p>Texto</p>
                        </v-card>
                     </v-col>
                     <v-col>
                        <v-card class="d-flex justify-center pa-4" @click="criarComponente('image')">
                           <p>Imagem</p>
                        </v-card>
                     </v-col>
                     <v-col>
                        <v-card class="d-flex justify-center pa-4" @click="criarComponente('arrowDown')">
                           <p>Seta para Baixo</p>
                        </v-card>
                     </v-col>
                     <v-col>
                        <v-card class="d-flex justify-center pa-4" @click="criarComponente('arrowUp')">
                           <p>Seta para Cima</p>
                        </v-card>
                     </v-col>
                     <v-col>
                        <v-card class="d-flex justify-center pa-4" @click="criarComponente('arrowRight')">
                           <p>Seta para Direita</p>
                        </v-card>
                     </v-col>
                     <v-col>
                        <v-card class="d-flex justify-center pa-4" @click="criarComponente('arrowLeft')">
                           <p>Seta para Esquerda</p>
                        </v-card>
                     </v-col>
                  </v-col>
               </v-card>
            </v-col>
            <v-col cols="10">
               <v-card ref="canvas" class="bg-white canvas" min-height="86vh"></v-card>
            </v-col>
         </v-row>
      </div>
   </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue';
import ConfirmDialog from '../../../components/ConfirmMessage/Confirmation.vue'

export default {
   data() {
      return {
         rotasNavBar: {
            home: true,
            boardSave: true,
            deleteBoard: true
         }
      }
   },
   methods: {
      criarComponente(type) {
         let canvas = this.$refs.canvas.$el

         this.getElementMethods(type, canvas, null)
      },
      async salvarBoard() {
         let canvas = this.$refs.canvas.$el.querySelectorAll(".board-component")
         let listElements = []
         let dto = { idBoard: this.$route.params.id }

         for await (var element of canvas) {
            let endElement = null

            if (element.classList.contains('board-component-text'))
               endElement = await this.salvaTextComponent(element)

            if (element.classList.contains('board-component-image'))
               endElement = await this.salvaImageComponent(element)

            if (element.classList.contains('board-component-arrowRight'))
               endElement = await this.salvaArrowComponent(element, 'Right')

            if (element.classList.contains('board-component-arrowLeft'))
               endElement = await this.salvaArrowComponent(element, 'Left')

            if (element.classList.contains('board-component-arrowUp'))
               endElement = await this.salvaArrowComponent(element, 'Up')

            if (element.classList.contains('board-component-arrowDown'))
               endElement = await this.salvaArrowComponent(element, 'Down')

            listElements.push(endElement)
         }

         let board = Object.assign(dto, { components: listElements })
         this.gravaComponentsBoard(board)
      },
      async confirmDeleteBoard() {
         this.$refs.deleteBoard.openModal()
      },
      async deleteBoard() {
         let idBoard = this.$route.params.id

         this.$api.post('delete-board', { idBoard })
         .then(() => {
            this.$router.back()
         })
         .catch(err => console.log(err))
      },
      async salvaArrowComponent(element, side) {
         let posicaoX = element.offsetTop;
         let posicaoY = element.offsetLeft;

         return {
            type: `arrow${side}`,
            posicaoX,
            posicaoY
         }
      },
      async salvaTextComponent(element) {
         let title = element.childNodes[0].value
         let text = element.childNodes[1].value

         let posicaoX = element.offsetTop;
         let posicaoY = element.offsetLeft;

         return {
            title,
            text,
            type: 'text',
            posicaoX,
            posicaoY
         }
      },
      async salvaImageComponent(element) {
         let blob = element.childNodes[1].src

         return new Promise(async (resolve, reject) => {
            await fetch(blob)
               .then(response => response.blob())
               .then(blob => {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                     let imageBase64 = reader.result
                     let posicaoX = element.offsetTop;
                     let posicaoY = element.offsetLeft;

                     const dto = {
                        type: 'image',
                        posicaoX,
                        posicaoY,
                        imageBase64
                     }
                     resolve(dto)
                  }

                  reader.readAsDataURL(blob)
               })
               .catch(err => console.log(err))
         })
      },
      gravaComponentsBoard(dto) {
         this.$api.post('save-board', dto).finally(() => { })
      },
      getElementMethods(type, canvas, element) {
         switch (type) {
            case 'text':
               this.$element.TextComponent.createComponent(canvas, element)
               break;
            case 'image':
               this.$element.ImageComponent.createComponent(canvas, element)
               break;
            case 'arrowRight':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Right')
               break;
            case 'arrowLeft':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Left')
               break;
            case 'arrowUp':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Up')
               break;
            case 'arrowDown':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Down')
               break;
            default:
               break;
         }
      }
   },
   mounted() {
      let idBoard = this.$route.params.id

      this.$api.get('get-components', { idBoard })
         .then(response => {
            let canvas = this.$refs.canvas.$el

            response.data.response.map(element => {
               this.getElementMethods(element.component.type, canvas, element)
            })
         })
         .catch(err => { })
   },
   components: {
      NavBar,
      ConfirmDialog
   }
}
</script>