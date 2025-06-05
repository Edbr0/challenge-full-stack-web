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
        <v-col class="d-flex justify-end mr-5" cols="auto">
          <v-btn color="error" variant="tonal" @click="showDialog = true">
            <v-icon left>mdi-logout</v-icon>
            Sair
          </v-btn>
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
          <ConfirmDialog
            v-model="showDialog"
            cancel-text="Cancelar"
            confirm-text="Sim, sair"
            message="Tem certeza que deseja sair do sistema?"
            title="Logout"
            @cancel="handleCancel"
            @confirm="handleConfirm"
          />
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
  import { useAuthStore } from '@/store/index'

  const router = useRouter()
  const route = useRoute()
  const showDialog = ref(false)
  const authStore = useAuthStore()

  const menus = [
    { title: 'Alunos', route: '/students', isAdmin: true },
  ]

  const titles = [
    { route: '/students', title: 'Consulta de alunos' },
    { route: '/students/register', title: 'Cadastro de aluno' },
    { route: '/students/update', title: 'Cadastro de aluno' },
  ]

  const currentMenuText = computed(() => {
    const menu = titles.find(item => item.route === route.path)
    return menu ? menu.title : ''
  })

  function goTo (route) {
    router.push(route)
  }

  async function handleConfirm () {
    authStore.logout()
    showDialog.value = false
    router.push('/')
  }

  function handleCancel () {
    showDialog.value = false
  }

</script>
