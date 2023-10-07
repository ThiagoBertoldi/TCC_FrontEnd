export function montaArrowLeftComponent(element) {
   const { posicaoX, posicaoY } = element.component

   let div = document.createElement('div')
   let image = document.createElement('img')

   div.classList.add('board-component')
   div.classList.add('board-component-arrowLeft')

   image.setAttribute('src', './../../../arrowLeft.png')

   let style = div.style
   style.position = 'absolute'
   style.top = `${posicaoX}px`
   style.left = `${posicaoY}px`
   
   let styleImg = image.style
   styleImg.width = '160px'
   styleImg.height = '80px'

   div.appendChild(image)
   
   return div
}