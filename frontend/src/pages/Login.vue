<template>
  <v-app>
    <v-main>
      <v-container class="pa-0 fill-height bg-secundary" fluid style="min-height: 100vh;">
        <v-row class="fill-height" no-gutters>
          <!-- Lado esquerdo: Logo e nome -->
          <v-col
            class="d-flex flex-column align-center justify-center text-center bg-secundary"
            cols="12"
            md="6"
            style="min-height: 100vh;"
          >
            <img
              alt="Logo"
              class="mb-4"
              contain
              height="90"
              src="/src/assets/logo.svg"
            >
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 mb-2 text-dark">
              Bem-vindo à plataforma +a Educação.
            </v-card-title>
            <v-card-subtitle class="text-primary">Expandindo os horizontes do conhecimento.</v-card-subtitle>
          </v-col>
          <!-- Lado direito: Formulário -->
          <v-col
            class="d-flex align-center justify-center bg-dark"
            cols="12"
            md="6"
            style="min-height: 100vh;"
          >
            <Login />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
  import Login from '@/components/forms/Login.vue'

</script>

<style scoped>
/* Removido CSS customizado, usando apenas utilitários do Vuetify e estilos inline */
@media (max-width: 960px) {
  /* Ajuste responsivo para altura mínima */
  .v-col {
    min-height: 40vh !important;
  }
}
</style>
