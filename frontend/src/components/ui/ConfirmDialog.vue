<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" text @click="cancel">
          {{ cancelText }}
        </v-btn>
        <v-btn color="primary" text @click="confirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { defineEmits, defineProps, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: 'Confirmação' },
    message: { type: String, default: 'Tem certeza que deseja continuar?' },
    confirmText: { type: String, default: 'Confirmar' },
    cancelText: { type: String, default: 'Cancelar' },
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

  const dialogVisible = ref(props.modelValue)

  watch(() => props.modelValue, val => {
    dialogVisible.value = val
  })

  watch(dialogVisible, val => {
    if (val !== props.modelValue) {
      emit('update:modelValue', val)
    }
  })

  function confirm () {
    emit('confirm')
    dialogVisible.value = false
  }

  function cancel () {
    emit('cancel')
    dialogVisible.value = false
  }
</script>
