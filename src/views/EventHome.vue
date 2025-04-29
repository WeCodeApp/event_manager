<template>
  <v-col style="display: flex; justify-content: end">
    <h1 class="ml-5">Events Manager</h1>
    <v-spacer />
    <v-text-field
      v-model="searchQuery"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      class="mr-4"
      style="width: 150px"
      placeholder="Search events..."
    />

    <v-btn color="primary" @click="addEvent">Add Event</v-btn>

    <EventDialog ref="eventDialogRef" @event-created="handleEventCreated" />
    <EditDialog ref="editEventRef" @event-edited="saveEditedEvent" />
  </v-col>

  <v-col>
    <div v-if="filteredEvents.length" class="events-grid">
      <v-card
        v-for="(event, index) in filteredEvents"
        :key="index"
        class="ml-4 d-flex flex-column mb-4 event-card"
        height="300px"
        width="500px"
        style="box-shadow: 2px 2px 12px 2px #a9a9a9"
      >
        <v-card-title :style="{ backgroundColor: event.color }">
          <!-- <h5>Participants: </h5> -->
          <div style="display: flex; justify-content: end; width: 100%">
            <h6
              @click="editEvent(event)"
              class="mr-4 editevent"
              style="color: green"
            >
              Edit
            </h6>
            <h6
              @click="deleteEvent(event)"
              class="eventdelete"
              style="color: red"
            >
              Delete
            </h6>
          </div>
        </v-card-title>

        <v-card-text>
          <h1 class="mt-4">{{ event.eventName }}</h1>

          <div
            ref="descriptionRefs"
            class="description-box mt-2"
            :class="{ 'has-shadow': overflowStates[index] }"
          >
            <p>{{ event.description }}</p>
          </div>

          <div class="mt-3" style="display: flex; gap: 8px; flex-wrap: wrap">
            <span
              v-for="(date, i) in getFormattedDates(event.date)"
              :key="i"
              class="dateDesign"
            >
              {{ date }}
            </span>
          </div>
        </v-card-text>

        <v-spacer />

        <v-card-actions class="justify-center">
          <v-btn
            class="mb-3"
            width="450px"
            style="background-color: green; color: white"
            >Join</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>

    <div
      v-else
      style="display: flex; justify-content: center; align-items: center"
    >
      <p>No events created...</p>
    </div>
  </v-col>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import EventDialog from "../views/dialogs/AddEventDialog.vue";
import EditDialog from "../views/dialogs/EditEventDialog.vue";
import { useAppStore } from "../stores/useAppStore";

const useStore = useAppStore();
const eventDialogRef = ref<InstanceType<typeof EventDialog> | null>(null);
const editEventRef = ref<InstanceType<typeof EditDialog> | null>(null);
const events = ref<any[]>([]);
const descriptionRefs = ref<HTMLElement[]>([]);
const overflowStates = ref<boolean[]>([]);

const searchQuery = ref("");

const filteredEvents = computed(() => {
  return events.value.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getFormattedDates = (input: string[] | string): string[] => {
  const dateArray = Array.isArray(input) ? input : input.split(", ");
  return dateArray
    .map((dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return `${day}/${month}/2025`;
    })
    .filter((d): d is string => d !== null);
};

const refreshEvents = async () => {
  events.value = useStore.events;
  await nextTick();
  checkOverflow();
};

const addEvent = () => {
  eventDialogRef.value?.open();
};

const handleEventCreated = (newEvent: any) => {
  useStore.addEvent(newEvent);
  refreshEvents();
};

const editEvent = (event: any) => {
  if (editEventRef.value) {
    editEventRef.value.open(event);
  }
};

const saveEditedEvent = (updatedEvent: any) => {
  const index = events.value.findIndex((e) => e.id === updatedEvent.id);
  if (index !== -1) {
    events.value[index] = updatedEvent;
    useStore.updateEvent(updatedEvent);
    refreshEvents();
  }
};

const deleteEvent = (eventToDelete: any) => {
  useStore.trashEvent(eventToDelete);
  useStore.removeEvent(eventToDelete);
  refreshEvents();
};

const checkOverflow = () => {
  overflowStates.value = descriptionRefs.value.map((el) => {
    return el.scrollHeight > el.clientHeight;
  });
};

onMounted(() => {
  refreshEvents();
});
</script>

<style scoped>
.editevent,
.eventdelete {
  cursor: pointer;
}

.dateDesign {
  background-color: gray;
  border-radius: 15px;
  display: inline-flex;
  justify-content: center;
  padding: 5px 10px;
  color: white;
  white-space: nowrap;
}

.description-box {
  max-height: 70px;
  overflow: hidden;
  position: relative;
}

.has-shadow::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30px;
  width: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #f0f0f0);
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
