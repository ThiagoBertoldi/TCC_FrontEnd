import { addRemoveButton } from "../../Metodo/removeButton";
import { adicionaEfeitoArrastar } from "../../Metodo/draggableComponente";

export const fabImageComponent = {
   createComponent(canvas, element) {
      let areaElement = document.createElement('div');
      let imageElement = document.createElement('img');
      let buttonAddImage = document.createElement('input');

      imageElement.src = element?.component?.imageBase64 ?? ''

      imageElement.classList.add('image-element')

      buttonAddImage.type = 'file'
      buttonAddImage.accept = 'image/*'

      areaElement.classList.add('board-component-image')
      areaElement.classList.add('board-component')

      let area = areaElement.style;
      area.minWidth = '150px'
      area.minHeight = '50px'
      area.maxWidth = '650px'
      area.maxHeight = '400px'
      area.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)'
      area.margin = '10px'
      area.color = '#fff'
      area.backgroundColor = '#252525';
      area.display = 'flex';
      area.alignItems = 'start';
      area.flexDirection = 'column'
      area.position = 'absolute';
      area.padding = '10px';
      area.border = '1px solid #3e3e3e'
      area.borderRadius = '10px';
      area.top = (element?.component?.posicaoX - 10) + 'px' ?? '25px'
      area.left = (element?.component?.posicaoY - 10) + 'px' ?? '25px'

      let stylesImage = imageElement.style
      stylesImage.maxWidth = '650px'
      stylesImage.maxHeight = '380px'

      this.changeImage(buttonAddImage, imageElement)

      areaElement.appendChild(buttonAddImage)
      areaElement.appendChild(imageElement)

      this.addElementCanvas(canvas, areaElement)
   },
   addElementCanvas(canvas, element) {
      addRemoveButton(element)
      adicionaEfeitoArrastar(element)

      canvas.appendChild(element)
   },
   changeImage(buttonElement, imageElement) {
      buttonElement.addEventListener('change', function (event) {
         const selectedFile = event.target.files[0];

         if (selectedFile)
            imageElement.src = URL.createObjectURL(selectedFile);

         event.target.value = '';
      })
   }
}