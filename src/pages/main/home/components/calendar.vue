<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      inline-label
      class="bg-grey-3 q-mb-sm"
      active-bg-color="primary"
      indicator-color="primary"
      active-color="white"
      :breakpoint="0"
    >
      <q-tab name="tabOne" label="Задачи" />
      <q-tab name="tabTwo" label="Документы" />
      <q-tab name="tabThree" label="Финансы" />
      <q-tab name="tabFour" label="Блокнот" />
      <q-tab name="tabFive" label="Заметки" />
    </q-tabs>
    <!-- <q-calendar locale="ru" />     -->

    <q-calendar v-model="selectedDate" view="month" locale="en-us" :day-height="100">
      <template #week="{ week, weekdays, miniMode }">
        <template v-if="!miniMode">
          <template v-for="(computedEvent, index) in getWeekEvents(week, weekdays)">
            <q-badge
              :key="index"
              class="q-row-event"
              :class="badgeClasses(computedEvent, 'day')"
              :style="badgeStyles(computedEvent, 'day', week.length)"
            >
              <template v-if="computedEvent.event">
                <q-icon :name="computedEvent.event.icon" class="q-mr-xs"></q-icon>
                <span class="ellipsis">{{ computedEvent.event.title }}</span>
              </template>
            </q-badge>
          </template>
        </template>
      </template>
    </q-calendar>
  </div>
</template>

<script>
import axios from "axios";
import QCalendar from "@quasar/quasar-ui-qcalendar";

const CURRENT_DAY = new Date();

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY);
  newDay.setDate(day);
  const tm = QCalendar.parseDate(newDay);
  return tm.date;
}

export default {
  data() {
    return {
      tab: "tabOne",
      selectedDate: "",
      events: [
        {
          title: "входящие (10)",
          color: "blue",
          start: getCurrentDay(1),
          end: getCurrentDay(1),
          icon: "arrow_downward"
        },
        {
          title: "исходящие (5)",
          color: "red",
          start: getCurrentDay(1),
          end: getCurrentDay(1),
          icon: "arrow_upward"
        },
        {
          title: "входящие (10)",
          color: "blue",
          start: getCurrentDay(3),
          end: getCurrentDay(4),
          icon: "arrow_downward"
        },
        {
          title: "исходящие (5)",
          color: "red",
          start: getCurrentDay(3),
          end: getCurrentDay(3),
          icon: "arrow_upward"
        },
        {
          title: "исходящие (2)",
          color: "red",
          start: getCurrentDay(4),
          end: getCurrentDay(4),
          icon: "arrow_upward"
        },
        {
          title: "входящие (10)",
          color: "blue",
          start: getCurrentDay(7),
          end: getCurrentDay(7),
          icon: "arrow_downward"
        },
        {
          title: "исходящие (5)",
          color: "red",
          start: getCurrentDay(7),
          end: getCurrentDay(7),
          icon: "arrow_upward"
        }
      ]
    };
  },
  created() {
    const arr = [];
    axios
      .get("/tasks/calendar")
      .then(response => {
        response.data.forEach(el => {
          const obj = {
            title: "",
            color: "blue",
            start: null,
            end: null,
            icon: "arrow_downward"
          };
          if (el.type === "vx") {
            obj.title = el.title;
            obj.start = getCurrentDay(el.start);
            obj.end = getCurrentDay(el.end);
          } else {
            obj.title = el.title;
            obj.start = getCurrentDay(el.start);
            obj.end = getCurrentDay(el.end);
            obj.color = "red";
            obj.icon = "arrow_upward";
          }
          arr.push(obj);
        });

        this.events = arr;
      })
      .catch(error => {
        console.log("error");
      });
  },
  methods: {
    isCssColor(color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
    },

    badgeClasses(infoEvent, type) {
      const color =
        infoEvent.event !== void 0 ? infoEvent.event.color : "transparent";
      const cssColor = this.isCssColor(color);
      const isHeader = type === "header";

      return {
        [`text-white bg-${color}`]: !cssColor,
        "full-width":
          !isHeader && (!infoEvent.side || infoEvent.side === "full"),
        "left-side": !isHeader && infoEvent.side === "left",
        "right-side": !isHeader && infoEvent.side === "right",
        "cursor-pointer": infoEvent.event !== void 0,
        "event-void": infoEvent.event === void 0 // height: 0, padding: 0
      };
    },

    badgeStyles(infoEvent, type, weekLength, timeStartPos, timeDurationHeight) {
      const s = {};
      if (timeStartPos) {
        s.top = timeStartPos(infoEvent.event.time) + "px";
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(infoEvent.event.duration) + "px";
      }
      if (infoEvent.size !== void 0) {
        s.width = (100 / weekLength) * infoEvent.size + "% !important";
      }
      // s['align-items'] = 'flex-start'
      return s;
    },

    getWeekEvents(week, weekdays) {
      const tsFirstDay = QCalendar.parsed(week[0].date + " 00:00");
      const tsLastDay = QCalendar.parsed(week[week.length - 1].date + " 23:59");
      const firstDay = QCalendar.getDayIdentifier(tsFirstDay);
      const lastDay = QCalendar.getDayIdentifier(tsLastDay);

      const eventsWeek = [];
      this.events.forEach((event, id) => {
        const tsStartDate = QCalendar.parsed(event.start + " 00:00");
        const tsEndDate = QCalendar.parsed(event.end + " 23:59");
        const startDate = QCalendar.getDayIdentifier(tsStartDate);
        const endDate = QCalendar.getDayIdentifier(tsEndDate);

        if (this.isBetweenDatesWeek(startDate, endDate, firstDay, lastDay)) {
          const left = QCalendar.daysBetween(tsFirstDay, tsStartDate, true);
          const right = QCalendar.daysBetween(tsEndDate, tsLastDay, true);

          eventsWeek.push({
            id, // index event
            left, // Position initial day [0-6]
            right, // Number days available
            size: week.length - (left + right), // Size current event (in days)
            event // Info
          });
        }
      });

      const events = [];
      if (eventsWeek.length > 0) {
        const infoWeek = eventsWeek.sort((a, b) => a.left - b.left);
        infoWeek.forEach((event, i) => {
          this.insertEvent(events, week.length, infoWeek, i, 0, 0);
        });
      }

      return events;
    },

    insertEvent(events, weekLength, infoWeek, index, availableDays, level) {
      const iEvent = infoWeek[index];
      if (iEvent !== void 0 && iEvent.left >= availableDays) {
        // If you have space available, more events are placed
        if (iEvent.left - availableDays) {
          // It is filled with empty events
          events.push({ size: iEvent.left - availableDays });
        }
        // The event is built
        events.push({ size: iEvent.size, event: iEvent.event });

        if (level !== 0) {
          // If it goes into recursion, then the item is deleted
          infoWeek.splice(index, 1);
        }

        const currentAvailableDays = iEvent.left + iEvent.size;

        if (currentAvailableDays < weekLength) {
          const indexNextEvent = QCalendar.indexOf(
            infoWeek,
            e => e.id !== iEvent.id && e.left >= currentAvailableDays
          );

          this.insertEvent(
            events,
            weekLength,
            infoWeek,
            indexNextEvent !== -1 ? indexNextEvent : index,
            currentAvailableDays,
            level + 1
          );
        } // else: There are no more days available, end of iteration
      } else {
        events.push({ size: weekLength - availableDays });
        // end of iteration
      }
    },

    isBetweenDates(date, start, end) {
      return date >= start && date <= end;
    },

    isBetweenDatesWeek(dateStart, dateEnd, weekStart, weekEnd) {
      return (
        (dateEnd < weekEnd && dateEnd >= weekStart) ||
        dateEnd === weekEnd ||
        (dateEnd > weekEnd && dateStart <= weekEnd)
      );
    }
  }
};
</script>

<style lang="sass" scoped>

</style>