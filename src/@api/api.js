import userStore from "@/store/userStore"
import axios from "axios"

const api = {
   post: (controller, dto) => {
      return new Promise(async (resolve, reject) => {
         let token = userStore.getters?.getUser?.token ?? null
      
         await axios.post(
            `http://localhost:3000/${controller}`,
            dto,
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               }
            })
            .then(response => resolve(response))
            .catch(err => reject(err))
      })
   },
   get: (controller, dto) => {
      return new Promise(async (resolve, reject) => {
         let token = userStore.getters?.getUser?.token ?? null
         
         await axios.get(
            `http://localhost:3000/${controller}`,
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
               params: dto
            })
            .then(response => resolve(response))
            .catch(err => reject(err))
      })
   },
   put: () => {

   },
   delete: () => {

   }
}

export { api }