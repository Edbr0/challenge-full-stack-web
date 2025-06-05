<template>
  <v-app>
    <v-app-bar color="secondary" flat>
      <v-row align="center" class="w-100">
        <v-col cols="auto">
          <img
            alt="Logo"
            class="mt-5 ml-5 mb-5 mr-2"
            contain
            height="50"
            max-width="100"
            src="/src/assets/logo.svg"
          >
        </v-col>
        <v-col>
          <span class="text-h6 font-weight-bold text-dark">
            Módulo Acadêmico
          </span>
        </v-col>
        <v-col>
          <span class="text-h6 font-weight-bold text-dark">
            {{ currentMenuText }}
          </span>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container class="pa-0" fluid>
        <v-row no-gutters>
          <v-navigation-drawer class="pa-0" color="dark" permanent width="220">
            <v-list>
              <v-list-item
                v-for="item in menus"
                :key="item.title"
                color="primary"
                variant="tonal"
                @click="goTo(item.route)"
              >
                {{ item.title }}
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const menus = [
    { title: 'Alunos', route: '/students', isAdmin: true },
  ]

  const titles = [
    { route: '/students', title: 'Consulta de alunos' },
    { route: '/students/register', title: 'Cadastro de aluno' },
  ]

  const currentMenuText = computed(() => {
    const menu = titles.find(item => item.route === route.path)
    return menu ? menu.title : ''
  })

  function goTo (route) {
    router.push(route)
  }
</script>
