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

        <q-item class="absolute-bottom">
          <q-btn label="Sair" icon="logout" @click="doLogout" color="negative"/>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { Notify } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const leftDrawerOpen = ref(false)

const { logout } = useAuthStore()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

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
