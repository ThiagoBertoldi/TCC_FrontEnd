import { addRemoveButton } from "../metodo/adicionaRemoveButton"
import { adicionaEfeitoArrastar } from "../metodo/arrastaComponente"

export function createArrowLeftComponent(canvas) {
   let div = document.createElement('div')
   let image = document.createElement('img')

   div.classList.add('board-component')
   div.classList.add('board-component-arrowLeft')

   image.setAttribute('src', './../../../arrowLeft.png')

   let style = div.style
   style.position = 'absolute'
   style.width = '160px'
   style.height = '80px'

   let styleImage = image.style
   styleImage.width = '160px'
   styleImage.height = '80px'

   div.appendChild(image)

   adicionaEfeitoArrastar(div)
   addRemoveButton(div)

   canvas.appendChild(div)
}