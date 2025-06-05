<template>
  <v-sheet class="pa-4" color="secondary" elevation="0">
    <!-- Barra de busca e botões -->
    <v-row align="end" class="mb-4">
      <v-col cols="12" lg="4" md="6">
        <v-text-field
          color="dark"
          density="compact"
          hide-details
          placeholder="Digite sua busca"
          variant="outlined"
        />
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="mr-2"
          color="dark"
          prepend-icon="mdi-magnify"
          style="color: #FFF;"
          variant="flat"
        >
          Pesquisar
        </v-btn>
      </v-col>
      <v-col class="d-flex align-end flex-column">
        <v-btn
          class="text-secundary"
          color="accent"
          prepend-icon="mdi-account-plus"
          variant="flat"
          @click="goToFormRegister"
        >
          Cadastrar Aluno
        </v-btn>
      </v-col>
    </v-row>

    <Table :columns="columns" :items="students">
      <template #actions="{ item }">
        <v-btn color="accent" size="small" variant="text" @click="editStudent(item)">Editar</v-btn>
        <v-btn color="primary" size="small" variant="text">Excluir</v-btn>
      </template>
    </Table>
  </v-sheet>
</template>

<script setup>
  import { inject, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Table from '@/components/ui/Table.vue'
  import { useStudentStore } from '@/store/index'

  const router = useRouter()
  const alert = inject('showGlobalAlert')
  const loading = ref(false)
  const studentStore = useStudentStore()
  const students = ref([])

  const columns = [
    { label: '▼ Registro Acadêmico', key: 'ra' },
    { label: '▼ Nome', key: 'name' },
    { label: '▼ CPF', key: 'cpf' },
  ]

  async function fetchStudents () {
    loading.value = true
    try {
      const { status, message, statusCode, data } = await studentStore.getAllStudents()

      if (!status) {
        alert(message, statusCode >= 500 ? 'error' : 'warning')
        return
      }

      students.value = data || []
    } catch (error) {
      alert('Erro ao buscar alunos: ' + error.message, 'error')
      console.error('Erro ao buscar alunos:', error)
    } finally {
      loading.value = false
    }
  }

  function editStudent (item) {
    // Implementar lógica de edição
    console.log('Editando aluno:', item)
  }

  function goToFormRegister () {
    router.push('/students/register')
  }

  onMounted(async () => {
    await fetchStudents()
  })
</script>
