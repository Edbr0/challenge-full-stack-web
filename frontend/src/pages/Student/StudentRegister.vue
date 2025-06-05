<template>
  <v-container class="d-flex align-center justify-center" fluid style="min-height: 90vh;">
    <v-card elevation="3" max-width="600" width="100%">
      <v-card-title class="justify-center grey lighten-4 font-weight-bold" />
      <v-card-text>
        <v-form ref="formRef">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="student.nome"
                class="mb-3"
                dense
                :error-messages="errors.nome"
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
                outlined
                placeholder="Informe o número do documento"
                prepend-inner-icon="mdi-card-account-details-outline"
              />
            </v-col>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn class="mr-2" color="primary" depressed @click="resetForm">
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
  import { reactive, ref } from 'vue'

  const student = reactive({
    nome: '',
    email: '',
    ra: '',
    cpf: '',
  })

  const errors = reactive({
    nome: '',
    email: '',
    ra: '',
    cpf: '',
  })

  const formRef = ref(null)

  function validateFields () {
    let valid = true
    errors.nome = student.nome ? '' : 'Nome é obrigatório'
    errors.email = student.email ? '' : 'E-mail é obrigatório'
    errors.ra = student.ra ? '' : 'RA é obrigatório'
    errors.cpf = student.cpf ? '' : 'CPF é obrigatório'

    if (!student.nome || !student.email || !student.ra || !student.cpf) {
      valid = false
    }
    return valid
  }

  function handleSubmit () {
    if (validateFields()) {
      // Aqui você pode enviar os dados
      alert('Dados válidos!')
    }
  }

  function resetForm () {
    student.nome = ''
    student.email = ''
    student.ra = ''
    student.cpf = ''
    errors.nome = ''
    errors.email = ''
    errors.ra = ''
    errors.cpf = ''
    if (formRef.value) formRef.value.resetValidation()
  }
</script>
