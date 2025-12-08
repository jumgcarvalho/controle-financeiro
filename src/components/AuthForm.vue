<template>
  <q-card style="min-width: 450px">
    <div>
      <q-tabs class="text-primary" v-model="tab">
        <q-tab name="login" label="Login" class="q-py-md"></q-tab>
        <q-tab name="register" label="Register" class="q-py-md"></q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="q-pa-md">
        <q-tab-panel name="login">
          <q-form>
            <q-input outlined type="text" label="Email" v-model="formLogin.email" class="q-pt-lg" />
            <q-input
              outlined
              type="password"
              label="Senha"
              v-model="formLogin.password"
              class="q-pt-lg"
            />
            <q-btn
              type="button"
              class="q-my-lg q-py-sm full-width bg-primary text-white"
              @click="fazerLogin"
              :loading="loading"
              :disable="loading"
              >Entrar</q-btn
            >
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="register">
          <q-form>
            <q-input
              outlined
              type="text"
              label="Nome"
              v-model="formRegister.name"
              class="q-pt-lg"
            />
            <q-input
              outlined
              type="text"
              label="Email"
              v-model="formRegister.email"
              class="q-pt-lg"
            />
            <q-input
              outlined
              type="password"
              label="Senha"
              v-model="formRegister.password"
              class="q-pt-lg"
            />
            <q-btn
              class="q-my-lg q-py-sm full-width bg-primary text-white"
              @click="fazerRegister"
              :loading="loading"
              :disable="loading"
              >Cadastrar</q-btn
            >
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

const router = useRouter()
const tab = ref('login')
const { login, register } = useAuthStore()
const loading = ref(false)

// LOGIN
const formLogin = ref({
  email: '',
  password: '',
})

const formRegister = ref({
  name: '',
  email: '',
  password: '',
})

async function fazerLogin() {
  loading.value = true

  try {
    const token = await login(formLogin.value.email, formLogin.value.password)

    if (!token) {
      Notify.create({
        message: 'E-mail ou senha incorretos',
        color: 'negative',
        position: 'top',
      })
      return
    }

    localStorage.setItem('token', token)

    const payload = JSON.parse(atob(token.split('.')[1]))
    localStorage.setItem('nomeUsuario', payload.name)
    localStorage.setItem('emailUsuario', payload.email)

    Notify.create({
      message: 'Login realizado com sucesso',
      color: 'green',
      position: 'top',
    })

    router.push('/')
  } catch (err) {
    console.error(err)
    Notify.create({
      message: 'Erro ao fazer login',
      color: 'negative',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}

async function fazerRegister() {
  loading.value = true

  try {
    const newUser = await register(
      formRegister.value.name,
      formRegister.value.email,
      formRegister.value.password,
    )
    if (newUser) {
      Notify.create({
        message: 'Cadastro realizado com sucesso!',
        color: 'green',
        position: 'bottom',
      })
      router.push('/')
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
