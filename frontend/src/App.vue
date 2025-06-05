<template>
  <GlobalAlert ref="globalAlert" />
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { provide, ref } from 'vue'
  import GlobalAlert from './components/ui/Alert.vue'

  const globalAlert = ref(null)
  provide('showGlobalAlert', (msg, type) => {
    globalAlert.value?.showAlert(msg, type)
  })
</script>
