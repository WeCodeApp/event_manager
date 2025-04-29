import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    userAccount: [
      {
        username: '1',
        email: 'firstpersonnel@gmail.com',
        name: 'Name',
        password: '1',
      },
      {
        username: '2',
        email: 'secondpersonnel@gmail.com',
        name: 'queenie',
        password: '2',
      },
    ],
    events: [
      {
        eventName: 'sample',
        description:
          'loremExercitation nulla velit nisi eiusmod voluptate dolor ea laborum aliqua ex officia consectetur id. Elit magna voluptate aliquip laboris velit dolor consectetur qui anim ullamco ex. Id id eiusmod commodo eiusmod incididunt amet sint tempor consequat laboris.',
        date: 'November 25, 2025',
      },
    ],
    trashedEvents: [] as { eventName: string; description: string; date: string }[],
    currentUser: null as null | { username: string; email: string; name: string },
  }),

  actions: {
    login(username: string, password: string) {
      const user = this.userAccount.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        this.currentUser = user;
        return true;
      }
      return false;
    },

    logout() {
      this.currentUser = null;
    },

    addEvent(newEvent: { eventName: string; description: string; date: string }) {
      this.events.push(newEvent);
    },

    trashEvent(event: { eventName: string; description: string; date: string }) {
      this.trashedEvents.push(event);
    },

    removeEvent(event: { eventName: string; description: string; date: string }) {
      this.events = this.events.filter(
        (e) =>
          e.eventName !== event.eventName ||
          e.description !== event.description ||
          e.date !== event.date
      );
    },

    restoreEvent(event: { eventName: string; description: string; date: string }) {
      this.trashedEvents = this.trashedEvents.filter(
        (e) =>
          e.eventName !== event.eventName ||
          e.description !== event.description ||
          e.date !== event.date
      );
      this.events.push(event);
    },

    restoreAll() {
      this.events.push(...this.trashedEvents);
      this.trashedEvents = [];
    },

    updateEvent(updatedEvent: { eventName: string; description: string; date: string }) {
      const eventIndex = this.events.findIndex((event) => event.eventName === updatedEvent.eventName);
      if (eventIndex !== -1) {
        this.events[eventIndex] = updatedEvent;
      }
    },
  },
});
