<template>
  <v-app>
    <v-layout v-if="store.currentUser">
      <v-navigation-drawer width="400px" expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://wallpapers.com/images/hd/best-profile-pictures-xrona5c4apl7qvrj.jpg"
            :subtitle="store.currentUser?.email"
            :title="store.currentUser?.name"
          />
        </v-list>

        <v-divider />

        <v-list nav>
          <v-list-item prepend-icon="mdi-calendar-text" title="Events" color="#FF9149" :to="'/event'" router :active="$route.path === '/event'" />
          <v-list-item prepend-icon="mdi-trash-can" title="Trash" color="#FF9149" :to="'/trash'" router :active="$route.path === '/trash'" />
          <v-list-item prepend-icon="mdi-logout" title="Logout" color="#FF9149" @click="logoutUser" />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-layout>

    <v-main v-else >
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '../src/stores/useAppStore'

const router = useRouter()
const store = useAppStore()

const logoutUser = () => {
  store.logout()
  router.push('/login')
}
</script>

<style scoped>

</style>
