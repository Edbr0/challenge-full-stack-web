<template>
  <transition name="fade-alert">
    <div
      v-if="visible"
      class="alert-wrapper"
    >
      <v-alert
        class="ma-4"
        density="compact"
        dismissible
        :model-value="visible"
        style="min-width: 300px; max-width: 400px; pointer-events: auto;"
        :type="type"
        @update:model-value="onClose"
      >
        {{ message }}
      </v-alert>
    </div>
  </transition>
</template>

<script setup>
  import { ref } from 'vue'

  const visible = ref(false)
  const message = ref('')
  const type = ref('success')
  let timeoutId = null

  function showAlert (msg, alertType = 'success') {
    message.value = msg
    type.value = alertType
    visible.value = true
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  function onClose (val) {
    visible.value = val
    if (!val && timeoutId) clearTimeout(timeoutId)
  }

  defineExpose({ showAlert })
</script>

<style scoped>
.alert-wrapper {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  /* pointer-events: none; removido daqui */
}

/* Animação fade */
.fade-alert-enter-active,
.fade-alert-leave-active {
  transition: opacity 0.4s;
}
.fade-alert-enter-from,
.fade-alert-leave-to {
  opacity: 0;
}
</style>
