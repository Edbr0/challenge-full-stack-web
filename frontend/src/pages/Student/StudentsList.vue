<template>
  <v-sheet class="pa-4" color="secondary" elevation="0">
    <!-- Barra de busca e botões -->
    <v-row align="end" class="mb-4">
      <v-col cols="12" lg="4" md="6">
        <v-text-field
          v-model="search"
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
          @click="handleSearch"
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

    <Table :columns="columns" :items="filteredStudents">
      <template #actions="{ item }">
        <v-btn color="accent" size="small" variant="text" @click="editStudent(item)">Editar</v-btn>
        <v-btn color="primary" size="small" variant="text" @click="deleteStudent(item)">Excluir</v-btn>
      </template>
    </Table>
    <ConfirmDialog
      v-model="showDialog"
      cancel-text="Cancelar"
      confirm-text="Sim, excluir"
      message="Tem certeza que deseja excluir este aluno?"
      title="Excluir aluno"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </v-sheet>
</template>

<script setup>
  import { computed, inject, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
  import Table from '@/components/ui/Table.vue'
  import { useStudentStore } from '@/store/index'

  const router = useRouter()
  const alert = inject('showGlobalAlert')
  const loading = ref(false)
  const studentStore = useStudentStore()
  const students = ref([])
  const search = ref('')
  const showDialog = ref(false)

  const columns = [
    { label: '▼ Registro Acadêmico', key: 'ra' },
    { label: '▼ Nome', key: 'name' },
    { label: '▼ CPF', key: 'cpf' },
  ]

  async function fetchStudents () {
    loading.value = true
    try {
      const { status, message, statusCode } = await studentStore.getAllStudents()

      if (!status) {
        alert(message, statusCode >= 500 ? 'error' : 'warning')
        return
      }

      students.value = studentStore.students || []
    } catch (error) {
      alert('Erro ao buscar alunos: ' + error.message, 'error')
      console.error('Erro ao buscar alunos:', error)
    } finally {
      loading.value = false
    }
  }

  function editStudent (item) {
    studentStore.student = item
    goToFormUpdate()
  }

  function deleteStudent (item) {
    studentStore.student = item
    showDialog.value = true
  }

  function goToFormRegister () {
    router.push('/students/register')
  }

  function goToFormUpdate () {
    router.push('/students/update')
  }

  const filteredStudents = computed(() => {
    if (!search.value) return students.value
    return students.value.filter(student =>
      student.name.toLowerCase().includes(search.value.toLowerCase()),
    )
  })

  function handleSearch () {
    if (!search.value) return students.value
    filteredStudents.value = students.value.filter(student =>
      student.name.toLowerCase().includes(search.value.toLowerCase()),
    )
  }

  async function handleConfirm () {
    loading.value = true
    try {
      const { status, message, statusCode } = await studentStore.deleteStudent(studentStore.student.id)

      if (!status) {
        alert(message, statusCode >= 500 ? 'error' : 'warning')
        return
      }
      alert('Aluno excluido com sucesso')
      students.value = studentStore.students || []
    } catch (error) {
      alert('Erro ao excluir aluno: ' + error.message, 'error')
      console.error('Erro ao excluir aluno:', error)
    } finally {
      loading.value = false
    }
  }

  function handleCancel () {
    showDialog.value = false
  }

  onMounted(async () => {
    await fetchStudents()
  })
</script>
