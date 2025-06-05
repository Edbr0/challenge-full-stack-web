<template>
  <v-dialog v-model="modelValue" :max-width="maxWidth">
    <template #default="{ isActive }">
      <v-card>
        <v-card-title>
          <slot name="title">Título do Diálogo</slot>
        </v-card-title>
        <v-card-text>
          <slot>
            Conteúdo do diálogo.
          </slot>
        </v-card-text>
        <v-card-actions>
          <slot :close="() => isActive.value = false" name="actions">
            <v-spacer />
            <v-btn color="primary" variant="text" @click="isActive.value = false">
              Fechar
            </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: { type: Boolean, default: false },
    maxWidth: { type: [String, Number], default: 500 },
  })
  const emit = defineEmits(['update:modelValue'])

  const modelValue = ref(props.modelValue)
  watch(() => props.modelValue, val => modelValue.value = val)
  watch(modelValue, val => emit('update:modelValue', val))
</script>
