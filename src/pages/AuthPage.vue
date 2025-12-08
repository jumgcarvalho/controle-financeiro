<template>
  <q-layout>
    <q-page-container class="fullscreen flex justify-end items-center bg-cover bg-center q-pr-xl" style="padding-right: 300px; background-image: url('../src/assets/fundo-login-register.jpg');">
     
        <AuthForm/>
      
    </q-page-container>
  </q-layout>
</template>

<script setup>

import AuthForm from '../components/AuthForm.vue';


</script>
