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
                v-for="item in filteredMenus"
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
  import { useAuthStore } from '@/store'

  const store = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  const isAdmin = store.isAdmin()

  const menus = [
    { title: 'Alunos', route: '/students', text: 'Consulta de alunos', isAdmin: true },
  ]

  const filteredMenus = computed(() => {
    return menus.filter(item => isAdmin || !item.isAdmin)
  })

  const currentMenuText = computed(() => {
    const menu = menus.find(item => item.route === route.path)
    return menu ? menu.text : ''
  })

  function goTo (route) {
    router.push(route)
  }
</script>