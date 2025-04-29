<template>
  <v-container>
    <v-col style="display: flex; justify-content: end">
      <h1>Trashed Events</h1>
      <v-spacer />
      <v-text-field v-model="searchQuery" variant="outlined" prepend-inner-icon="mdi-magnify" density="compact"
        class="mr-4" style="width: 150px" placeholder="Search events..." />
      <v-btn color="error" @click="restoreAll">Restore All</v-btn>
    </v-col>

    <v-col>
      <div v-if="filteredTrashedEvents.length" class="events-grid">
        <v-card v-for="(event, index) in filteredTrashedEvents" :key="index" class="d-flex flex-column mb-4 event-card"
          height="300px" width="500px" style="box-shadow: 2px 2px 12px 2px #a9a9a9">
          <v-card-text>
            <h1 class="mb-5">{{ event.eventName }}</h1>
            <h4 class="mb-6">{{ event.description }}</h4>
            <h4 class="dateDesign">{{ formatDate(event.date) }}</h4>

          </v-card-text>

          <v-spacer />

          <v-card-actions class="justify-center">
            <v-btn class="mb-3" width="450px" style="background-color: red; color: white" @click="restoreEvent(event)">
              Restore
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div v-else style="display: flex; justify-content: center; align-items: center">
        <p>No trashed events...</p>
      </div>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useAppStore } from "../stores/useAppStore";
import Swal from "sweetalert2";

const useStore = useAppStore();
const trashedEvents = ref<any[]>([]);
const searchQuery = ref("");

const filteredTrashedEvents = computed(() => {
  return trashedEvents.value.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  trashedEvents.value = useStore.trashedEvents;
});

const restoreEvent = (event: any) => {
  useStore.restoreEvent(event);
  trashedEvents.value = useStore.trashedEvents;
};
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString(undefined, options);
};


const restoreAll = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will restore all trashed events.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, restore all!",
  });

  if (result.isConfirmed) {
    useStore.restoreAll();
    trashedEvents.value = [];

    Swal.fire({
      title: "Restored!",
      text: "All trashed events have been restored.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }
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

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.event-card {
  display: flex;
  flex-direction: column;
}
</style>
