<template>
  <GlobalAlert ref="globalAlert" />
  <router-view />
</template>

<script lang="ts" setup>
  import { provide, ref } from 'vue'
  import GlobalAlert from './components/ui/Alert.vue'

  const globalAlert = ref(null)
  provide('showGlobalAlert', (msg, type) => {
    globalAlert.value?.showAlert(msg, type)
  })
</script>
