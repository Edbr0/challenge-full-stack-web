<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    class="elevation-1"
    density="comfortable"
    :items-length="items.length"
    :loading="loading"
    loading-text="Carregando..."
  >
    <thead>
      <tr class="bg-dark text-secundary">
        <th v-for="col in columns" :key="col.key">
          {{ col.label }}
        </th>
        <th v-if="$slots.actions">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="col in columns" :key="col.key">
          {{ item[col.key] }}
        </td>
        <td v-if="$slots.actions">
          <slot :item="item" name="actions" />
        </td>
      </tr>
    </tbody>
  </v-data-table-server>
</template>

<script setup>
  import { ref } from 'vue'

  defineProps({
    items: { type: Array, required: true },
    columns: { type: Array, required: true },
    loading: { type: Boolean, default: false },
  })

  const itemsPerPage = ref(10)
</script>
