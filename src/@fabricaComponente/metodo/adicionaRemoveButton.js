function addEventRemoveElement(element) {
   element.addEventListener('click', (e) => {
      e.target.parentElement.remove()
   })
}

export function addRemoveButton(element) {
   let removeButton = document.createElement('button');

   addEventRemoveElement(removeButton)

   let removeBtn = removeButton.style
   removeBtn.right = '10px'
   removeBtn.top = '10px'
   removeBtn.cursor = 'pointer'
   removeBtn.position = 'absolute'
   removeBtn.fontSize = '20px'
   
   removeButton.addEventListener('mouseenter', () => {
      removeBtn.color = '#fff'
   })

   removeButton.addEventListener('mouseleave', () => {
      removeBtn.color = 'red'
   })

   removeButton.innerText = 'x'

   element.appendChild(removeButton)
}