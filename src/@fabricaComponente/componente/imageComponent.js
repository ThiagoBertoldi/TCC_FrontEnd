import { fabInsert } from "../metodo/insereComponente";
import { changeImageEvent } from "../metodo/trocaImagem";

export function createImageComponent(canvas) {
   let areaElement = document.createElement('div');
   let imageElement = document.createElement('img');
   let buttonAddImage = document.createElement('input');

   imageElement.classList.add('image-element')

   buttonAddImage.type = 'file'
   buttonAddImage.accept = 'image/*'

   areaElement.setAttribute('id', 'id' + new Date().getTime())
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

   changeImageEvent(buttonAddImage, imageElement)

   let stylesImage = imageElement.style
   stylesImage.maxWidth = '650px'
   stylesImage.maxHeight = '380px'

   areaElement.appendChild(buttonAddImage)
   areaElement.appendChild(imageElement)

   fabInsert.insereImageComponent(canvas, areaElement)
}