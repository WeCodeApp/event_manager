<template>
  <v-container>
    <v-col style="display: flex; justify-content: end">
      <v-spacer></v-spacer>
      <v-text-field variant="outlined" density="compact" width="30px" />
      <v-btn @click="restoreAll">Restore All</v-btn>
    </v-col>

    <v-card
      v-for="(event, index) in trashedEvents"
      :key="index"
      class="d-flex flex-column mb-4"
      height="300px"
      width="500px"
      style="box-shadow: 2px 2px 12px 2px #a9a9a9"
    >
      <v-card-text>
        <h1 class="mb-5">{{ event.eventName }}</h1>
        <h4 class="mb-6">{{ event.description }}</h4>
        <h4 class="dateDesign">{{ event.date }}</h4>
      </v-card-text>

      <v-spacer />

      <v-card-actions class="justify-center">
        <v-btn class="mb-3" width="450px" style="background-color: red; color:white;" @click="restoreEvent(event)">
          Restore
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAppStore } from "../stores/useAppStore";

const useStore = useAppStore();
const trashedEvents = ref<any[]>([]);

onMounted(() => {
  trashedEvents.value = useStore.trashedEvents;
});

const restoreEvent = (event: any) => {
  useStore.restoreEvent(event);
  trashedEvents.value = useStore.trashedEvents;
};

const restoreAll = () => {
  useStore.restoreAll();
  trashedEvents.value = [];
};
</script>

<style scoped>
.dateDesign {
  background-color: gray;
  border-radius: 15px;
  display: inline-flex;
  justify-content: center;
  padding: 5px 10px;
  color: white;
  white-space: nowrap;
}
</style>
