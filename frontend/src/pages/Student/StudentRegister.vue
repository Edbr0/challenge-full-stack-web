<template>
  <v-container class="d-flex align-center justify-center" fluid style="min-height: 90vh;">
    <v-card elevation="3" max-width="600" width="100%">
      <v-card-title class="justify-center grey lighten-4 font-weight-bold" />
      <v-card-text>
        <v-form ref="formRef">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="student.name"
                class="mb-3"
                dense
                :error-messages="errors.name"
                label="Nome"
                outlined
                placeholder="Informe o nome completo"
                prepend-inner-icon="mdi-account"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="student.email"
                class="mb-3"
                dense
                :error-messages="errors.email"
                label="E-mail"
                outlined
                placeholder="Informe apenas um e-mail"
                prepend-inner-icon="mdi-email"
                type="email"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="student.ra"
                class="mb-3"
                dense
                :error-messages="errors.ra"
                label="RA"
                outlined
                placeholder="Informe o registro acadêmico"
                prepend-inner-icon="mdi-card-account-details"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="student.cpf"
                class="mb-6"
                dense
                :error-messages="errors.cpf"
                label="CPF"
                maxlength="11"
                outlined
                placeholder="Informe o número do documento"
                prepend-inner-icon="mdi-card-account-details-outline"
              />
            </v-col>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn class="mr-2" color="primary" depressed @click="closeForm">
                Cancelar
              </v-btn>
              <v-btn class="white--text font-weight-bold" color="accent" depressed @click="handleSubmit">
                Salvar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { inject, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore, useStudentStore } from '@/store/index'

  const router = useRouter()
  const alert = inject('showGlobalAlert')
  const loading = ref(false)
  const studentStore = useStudentStore()
  const authStore = useAuthStore()

  const student = reactive({
    name: '',
    email: '',
    ra: '',
    cpf: '',
  })

  const errors = reactive({
    name: '',
    email: '',
    ra: '',
    cpf: '',
  })

  const formRef = ref(null)

  function validateFields () {
    let valid = true
    errors.name = student.name ? '' : 'Nome é obrigatório'
    errors.email = student.email ? '' : 'E-mail é obrigatório'
    errors.ra = student.ra ? '' : 'RA é obrigatório'
    errors.cpf = student.cpf ? '' : 'CPF é obrigatório'

    if (!student.name || !student.email || !student.ra || !student.cpf) {
      valid = false
    }
    return valid
  }

  async function handleSubmit () {
    if (validateFields()) {
      loading.value = true
      try {
        const { status, message, statusCode } = await studentStore.createStudent({ ...student, createdBy: authStore.user.userName })

        if (!status) {
          alert(message, statusCode >= 500 ? 'error' : 'warning')
          return
        }
        alert('Aluno cadastrado com sucesso')
        closeForm()
      } catch (error) {
        alert('Erro ao buscar alunos: ' + error.message, 'error')
        console.error('Erro ao buscar alunos:', error)
      } finally {
        loading.value = false
      }
    }
  }

  function resetForm () {
    student.name = ''
    student.email = ''
    student.ra = ''
    student.cpf = ''
    errors.name = ''
    errors.email = ''
    errors.ra = ''
    errors.cpf = ''
    if (formRef.value) formRef.value.resetValidation()
  }

  function closeForm () {
    resetForm()
    router.push('/students')
  }
</script>
