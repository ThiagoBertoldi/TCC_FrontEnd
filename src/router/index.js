import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import HomeProfessor from '../views/Professor/Home/HomeProfessor.vue'
import HomeAluno from '../views/Aluno/Home/HomeAluno.vue'
import userStore from '@/store/userStore'
import AulaProfessor from '../views/Professor/Aula/AulaProfessor.vue'
import BoardProfessor from '../views/Professor/Board/BoardProfessor.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Cadastro
  },
  {
    path: '/home-professor',
    name: 'HomeProfessor',
    component: HomeProfessor,
    meta: {
      requiresAuth: true,
      typeUser: 1
    }
  },
  {
    path: '/aula-professor/:id',
    name: 'AulaProfessor',
    component: AulaProfessor,
    meta: {
      requiresAuth: true,
      typeUser: 1
    }
  },
  {
    path: '/board-professor/:id',
    name: 'BoardProfessor',
    component: BoardProfessor,
    meta: {
      requiresAuth: true,
      typeUser: 1
    }
  },
  {
    path: '/home-aluno',
    name: 'HomeAluno',
    component: HomeAluno,
    meta: {
      requiresAuth: true,
      typeUser: 2
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = userStore.getters.getUser

  if(to.meta.requiresAuth)
    if(!user?.token || user?.type !== to.meta.typeUser)
      return next('/')

  next()
})


export default router
