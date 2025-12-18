<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          id="menu"
          flat
          round
          icon="menu"
          dense
          size="lg"
          class="q-ml-sm"
          @click="toggleLeftDrawer"
        ></q-btn>
        <q-toolbar-title class="title">Controle Financeiro</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250">
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <q-item v-for="item in menuList" :key="item.title" clickable v-ripple :to="item.link" exact>
          <q-item-section avatar>
            <q-icon :name="item.icon"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-btn
            label="Sair"
            icon="logout"
            @click="doLogout"
            color="negative"
            style="width: 100px"
            class="q-mt-md"
          />
        </q-item>

        <div class="absolute-bottom">
          <q-separator />
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{
                  userName
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-medium">{{userName}}</q-item-label>
              <q-item-label caption>Meu Perfil</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn flat round dense icon="more_vert" />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { Notify } from 'quasar'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const leftDrawerOpen = ref(false)

const { logout } = useAuthStore()

const authStore = useAuthStore()

const { userName } = storeToRefs(authStore)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(()=> {
  console.log(userName.value)
})

function doLogout() {
  logout()
  router.push('/auth')
  Notify.create({
    message: 'Logout realizado com sucesso',
    color: 'positive',
    icon: 'check',
  })
}
const menuList = [
  {
    title: 'Home',
    icon: 'ti-home',
    link: '/',
  },
  {
    title: 'Despesas',
    icon: 'ti-money',
    link: '/despesas',
  },
  {
    title: 'Perfil',
    icon: 'ti-user',
    link: '/perfil',
  },
  {
    title: 'Categorias',
    icon: 'ti-agenda',
    link: '/categorias',
  },
]
</script>

<style lang="scss">
:deep(.q-toolbar) {
  background-color: #62929e;
}
</style>
