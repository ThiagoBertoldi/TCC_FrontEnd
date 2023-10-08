export function adicionaEfeitoArrastar(elemento) {
   elemento.addEventListener("mousedown", (event) => {
      const initialX = event.clientX;
      const initialY = event.clientY;

      const initialLeft = parseInt(getComputedStyle(elemento).left, 10);
      const initialTop = parseInt(getComputedStyle(elemento).top, 10);

      const positionX = initialX - initialLeft;
      const positionY = initialY - initialTop;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      function onMouseMove(event) {
         const newPosX = event.clientX;
         const newPosY = event.clientY;

         elemento.style.left = newPosX - positionX + 'px';
         elemento.style.top = newPosY - positionY + 'px';
      }

      function onMouseUp() {
         document.removeEventListener("mousemove", onMouseMove);
         document.removeEventListener("mouseup", onMouseUp);
      }
   });
}