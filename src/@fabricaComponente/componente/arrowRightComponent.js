import { addRemoveButton } from "../metodo/adicionaRemoveButton"
import { adicionaEfeitoArrastar } from "../metodo/arrastaComponente"

export function createArrowRightComponent(canvas) {
   let div = document.createElement('div')
   let image = document.createElement('img')

   div.classList.add('board-component')
   div.classList.add('board-component-arrowRight')

   image.setAttribute('src', './../../../arrowRight.png')

   let style = div.style
   style.position = 'absolute'
   style.width = '160px'
   style.height = '80px'

   let styleImg = image.style
   styleImg.width = '160px'
   styleImg.height = '80px'

   div.appendChild(image)

   adicionaEfeitoArrastar(div)
   addRemoveButton(div)

   canvas.appendChild(div)
}