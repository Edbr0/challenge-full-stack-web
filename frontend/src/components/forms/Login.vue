<template>
  <v-sheet
    class="pa-0 d-flex flex-column align-start"
    color="transparent"
    elevation="0"
    max-width="340"
    width="100%"
  >
    <v-form class="w-100" @submit.prevent="login">
      <div class="mb-2 text-secondary" style="font-size: 1.08rem; font-weight: 500; text-align: left;">
        Usuário
      </div>
      <v-text-field
        v-model="user"
        bg-color="secondary"
        class="mb-0"
        density="comfortable"
        flat
        hide-details
        placeholder="Seu usuário"
        style="border-radius: 6px;"
        type="text"
        variant="solo"
      />
      <div class="mt-4 mb-2 text-secondary" style="font-size: 1.08rem; font-weight: 500; text-align: left;">
        Senha
      </div>
      <v-text-field
        v-model="password"
        bg-color="secondary"
        class="mb-0"
        density="comfortable"
        flat
        hide-details
        placeholder="Sua senha"
        style="border-radius: 6px;"
        :type="showPassword ? 'text' : 'password'"
        variant="solo"
      >
        <template #append-inner>
          <v-icon
            class="mr-2"
            style="cursor: pointer;"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'mdi-eye-off' :'mdi-eye' }}
          </v-icon>
        </template>
      </v-text-field>
      <div class="d-flex align-center justify-space-between mt-2 mb-4 w-100">
        <v-checkbox
          v-model="remember"
          bg-color="secundary"
          class="ma-0 pa-0"
          color="white"
          density="compact"
          hide-details
          label="Lembrar acesso"
        />
      </div>
      <v-btn
        block
        class="mb-2"
        color="accent"
        dark
        size="large"
        style="font-weight: 600;"
        type="submit"
      >
        ENTRAR
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
  export default {
    name: 'LoginComponent',
    data () {
      return {
        user: '',
        password: '',
        remember: false,
        showPassword: false,
      }
    },
    methods: {
      login () {
        // Simulação de autenticação
        localStorage.setItem('authenticated', 'true')
        this.$router.push('/alunos')
      },
    },
  }
</script>

<style scoped>
@media (max-width: 960px) {
  /* Ajuste responsivo para altura mínima */
  .v-col {
    min-height: 40vh !important;
  }
}
</style>
