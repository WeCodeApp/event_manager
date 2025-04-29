<template>
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title
          style="
            background-color: #ffb74d;
            justify-content: space-between;
            display: flex;
            height: 60px;
            align-items: center;
          "
        >
          Edit Event
          <v-icon color="error" @click="dialog = false" class="cursor-pointer">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Event Name"
            variant="outlined"
            required
            v-model="eventData.eventName"
          />
          <v-textarea
            label="Description"
            variant="outlined"
            required
            v-model="eventData.description"
          />
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
              v-model="eventData.dates"
              multiple
              @update:model-value="menu = false"
              scrollable
            />
          </v-menu>
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
          <v-btn @click="saveEvent" width="500px" class="mt-4" color="#FFB74D">
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watchEffect } from "vue";
  import { defineProps, defineEmits, defineExpose } from "vue";
  
  interface EventData {
    eventName: string;
    description: string;
    dates: string[];
    color?: string; 
  }
  
  const props = defineProps({
    event: Object as () => EventData,
  });
  
  const emit = defineEmits(["event-edited"]);
  
  const dialog = ref(false);
  const menu = ref(false);
  const colorMenu = ref(false);
  const eventData = ref<EventData>(props.event || { eventName: "", description: "", dates: [], color: "#FFFFFF" });
  
  
  const selectedColor = ref(eventData.value.color || "#FFFFFF");
  const formattedDates = computed(() => {
    return Array.isArray(eventData.value.dates) && eventData.value.dates.length
      ? eventData.value.dates.join(", ")
      : "";
  });
  
  watchEffect(() => {
    if (props.event) {
      eventData.value = { ...props.event };
      selectedColor.value = eventData.value.color || "#FFFFFF";
    }
  });
  
  defineExpose({
    open: (event: EventData) => {
      eventData.value = { ...event };
      selectedColor.value = event.color || "#FFFFFF";
      dialog.value = true;
    }
  });
  
  const saveEvent = () => {
    
    eventData.value.color = selectedColor.value;
    emit("event-edited", eventData.value);
    dialog.value = false;
  };
  </script>
  
  <style scoped>
  .v-dialog .v-card {
    background-color: #fff;
  }
  </style>
  