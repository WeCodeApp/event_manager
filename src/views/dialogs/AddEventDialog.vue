<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <div v-if="isLoading" class="overlay">
        <loader />
      </div>

      <v-card-title
        style="
          background-color: #ffb74d;
          justify-content: space-between;
          display: flex;
          height: 60px;
          align-items: center;
        "
      >
        Add Event
        <v-icon color="error" @click="dialog = false" class="cursor-pointer"
          >mdi-close</v-icon
        >
      </v-card-title>

      <v-card-text>
        <v-text-field label="Event Name" variant="outlined" v-model="eventName" required />
        <v-textarea label="Description" variant="outlined" v-model="description" required />

        <!-- DATE PICKER -->
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              prepend-inner-icon="mdi-calendar"
              label="Select Dates"
              variant="outlined"
              readonly
              :model-value="formattedDates"
            />
          </template>

          <v-date-picker
            color="#FFB74D"
            v-model="dates"
            multiple
            @update:model-value="menu = false"
            scrollable
          />
        </v-menu>

        <!-- COLOR PICKER -->
        <v-menu
          v-model="colorMenu"
          :close-on-content-click="false"
          offset-y
          max-width="300"
        >
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              label="Event Color"
              variant="outlined"
              prepend-inner-icon="mdi-eyedropper"
              readonly
              :model-value="selectedColor"
              :color="selectedColor"
              :style="{ cursor: 'pointer' }"
            />
          </template>

          <v-color-picker
            v-model="selectedColor"
            hide-canvas
            show-swatches
            mode="hexa"
            @update:model-value="colorMenu = false"
          />
        </v-menu>

        <v-btn @click="createEvent" width="500px" class="mt-4" color="#FFB74D">
          Create Event
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import loader from "../loader/loader.vue";

const emit = defineEmits(["event-created"]);

const isLoading = ref(false);
const dialog = ref(false);
const menu = ref(false);
const colorMenu = ref(false);

const eventName = ref("");
const description = ref("");
const selectedColor = ref("");
const dates = ref<string[]>([]);

const formattedDates = computed(() =>
  dates.value
    .map((dateStr) => {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return `${day}/${month}/2025`;
    })
    .join(", ")
);

const createEvent = () => {
  if (!eventName.value || !description.value || !dates.value.length) {
    Swal.fire("Please fill in all required fields");
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    emit("event-created", {
      eventName: eventName.value,
      description: description.value,
      date: dates.value,
      color: selectedColor.value,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Event Created!",
      showConfirmButton: false,
      timer: 1500,
    });

    // Reset form
    eventName.value = "";
    description.value = "";
    selectedColor.value = "";
    dates.value = [];

    isLoading.value = false;
    dialog.value = false;
  }, 2000);
};

defineExpose({
  open: () => (dialog.value = true),
});
</script>

<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 999;
}
</style>
