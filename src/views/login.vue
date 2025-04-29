<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <!-- <v-card class="pa-6" width="500px">
      <v-card-title class="text-h5 text-center">Login</v-card-title>

      <v-card-text>
        

        
      </v-card-text>
    </v-card> -->
    <v-card width="700px" height="500px" style="box-shadow: 2px 2px 12px 2px #BF6871; border-radius: 20px; ">
      <v-row class="pa-0 ma-0" no-gutters>
        <v-col cols="6" class="pa-0">
          <v-card flat class="pa-4" height="100%" style="background-color:#fbedec; align-items:center;">
            <v-form @submit.prevent="handleLogin" style="margin-top: 100px;" class="ml-9">
              <h1 class="mb-5" style="margin-left: 80px;">Login</h1>
              <v-text-field v-model="username" label="Username" prepend-inner-icon="mdi-account" required
                variant="outlined" density="compact" width="250px" />
              <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password"
                prepend-inner-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" required variant="outlined" density="compact"
                width="250px" />

              <v-btn width="190px" style="background-color: #FF9149; color:white;" type="submit"
                class="ml-6">Login</v-btn>
            </v-form>
            <v-alert v-if="error" type="error" class="mt-4">
              {{ error }}
            </v-alert>
          </v-card>
        </v-col>

        <v-col cols="6" class="pa-0">
          <v-card flat height="100%" class="overflow-hidden">
            <img src="/login.jpg" style="height: 100%; width: 100%; object-fit: cover;" />
          </v-card>
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/useAppStore";

const router = useRouter();
const store = useAppStore();

const username = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);


const handleLogin = () => {
  const success = store.login(username.value, password.value);
  if (success) {
    error.value = "";
    router.push("/event");
  } else {
    error.value = "Invalid credentials. Please try again.";
  }
};
</script>

<style scoped></style>
