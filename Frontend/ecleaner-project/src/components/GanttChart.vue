<template>
  <div class="gantt-chart" ref="chartContainer">
    <!-- Timeline Header -->
    <div class="gantt-header">
      <div class="gantt-row-labels-fixed" :style="{ width: rowLabelWidth }">
        <div class="header-label">Equipe</div>
      </div>
      <div class="gantt-timeline-wrapper" ref="timelineWrapper">
        <div class="gantt-timeline" :style="{ width: timelineWidth + 'px' }">
          <!-- Upper Timeline -->
          <div class="timeline-upper">
            <div v-for="(unit, idx) in upperTimeUnits" :key="`upper-${idx}`" class="time-unit upper"
              :style="{ width: unit.width + 'px', left: unit.left + 'px' }">
              {{ unit.label }}
            </div>
          </div>
          <!-- Lower Timeline -->
          <div class="timeline-lower">
            <div v-for="(unit, idx) in lowerTimeUnits" :key="`lower-${idx}`" class="time-unit lower"
              :style="{ width: unit.width + 'px', left: unit.left + 'px' }"
              :class="{ 'highlighted': unit.highlighted, 'today': unit.isToday, 'weekend': unit.isWeekend }">
              <template v-if="unit.dayOfWeek">
                <div class="day-of-week">{{ unit.dayOfWeek }}</div>
                <div class="day-number">{{ unit.dayNumber }}</div>
              </template>
              <template v-else>
                {{ unit.label }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gantt Body -->
    <div class="gantt-body-wrapper">
      <!-- Labels Column (Fixed) -->
      <div class="gantt-labels-column" :style="{ width: rowLabelWidth }" ref="labelsColumn">
        <div v-for="row in rows" :key="`label-${row.id}`" class="gantt-row-label-fixed" :class="{
          'row-hover': hoveredRow === row.id,
          'drop-target': dragState.isDragging && dragState.targetRow?.id === row.id
        }" @mouseenter="hoveredRow = row.id" @mouseleave="hoveredRow = null">
          <div class="row-label-content">
            <div class="equipe-cor" :style="{ backgroundColor: row.color }"></div>
            <span class="row-label-text">{{ row.label }}</span>
          </div>
        </div>
      </div>

      <!-- Timeline Column (Scrollable) -->
      <div class="gantt-timeline-column" ref="ganttBody" @scroll="syncScroll">
        <div class="gantt-rows">
          <div v-for="row in rows" :key="`timeline-${row.id}`" class="gantt-row-timeline-wrapper" :class="{
            'row-hover': hoveredRow === row.id,
            'drop-target': dragState.isDragging && dragState.targetRow?.id === row.id
          }" @mouseenter="hoveredRow = row.id" @mouseleave="hoveredRow = null">
            <div class="gantt-row-timeline" :style="{ width: timelineWidth + 'px' }">
              <!-- Grid Lines -->
              <div v-for="(unit, idx) in lowerTimeUnits" :key="`grid-${idx}`" class="grid-line"
                :style="{ left: unit.left + 'px' }" :class="{ 'highlighted': unit.highlighted }"></div>

              <!-- Current Time Indicator -->
              <div v-if="currentTimePosition >= 0" class="current-time-line"
                :style="{ left: currentTimePosition + 'px' }">
              </div>

              <!-- Gantt Bars -->
              <div v-for="bar in row.bars" :key="bar.id" class="gantt-bar" :class="{
                'is-dragging': dragState.isDragging && dragState.bar?.id === bar.id,
                'is-resizing': dragState.isResizing && dragState.bar?.id === bar.id
              }" :style="getBarStyle(bar)" @mousedown="startDrag($event, bar, row)" @click.stop="handleBarClick(bar)">
                <div class="bar-content">
                  <span class="bar-label">{{ bar.label }}</span>
                  <span class="bar-duration">{{ bar.duration }}h</span>
                </div>
                <!-- Resize Handles -->
                <div v-if="bar.resizable" class="resize-handle left"
                  @mousedown.stop="startResize($event, bar, row, 'left')"></div>
                <div v-if="bar.resizable" class="resize-handle right"
                  @mousedown.stop="startResize($event, bar, row, 'right')"></div>

                <!-- Tooltip -->
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 10]">
                  <div class="text-weight-medium">{{ bar.label }}</div>
                  <div class="text-caption">{{ bar.tooltipContent }}</div>
                </q-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'GanttChart',

  props: {
    rows: {
      type: Array,
      required: true,
      // Expected format: [{ id, label, color, bars: [{ id, label, start, end, status, tooltipContent, resizable }] }]
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    precision: {
      type: String,
      default: 'day',
      validator: (val) => ['day', 'week', 'month'].includes(val)
    },
    rowLabelWidth: {
      type: String,
      default: '250px'
    },
    zoomLevel: {
      type: Number,
      default: 1
    }
  },

  emits: ['bar-click', 'bar-updated', 'zoom-changed'],

  setup(props, { emit }) {
    const chartContainer = ref(null)
    const timelineWrapper = ref(null)
    const ganttBody = ref(null)
    const labelsColumn = ref(null)
    const hoveredRow = ref(null)
    const internalZoomLevel = ref(props.zoomLevel || 1)

    // Sync internal zoomLevel with prop changes
    watch(() => props.zoomLevel, (newZoom) => {
      if (newZoom !== undefined && newZoom !== internalZoomLevel.value) {
        internalZoomLevel.value = newZoom
      }
    })

    const dragState = ref({
      isDragging: false,
      isResizing: false,
      resizeDirection: null,
      bar: null,
      row: null,
      targetRow: null,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startWidth: 0,
      originalStart: null,
      originalEnd: null
    })

    const basePixelsPerHour = computed(() => {
      if (props.precision === 'day') return 80
      if (props.precision === 'week') return 12
      return 4
    })

    const pixelsPerHour = computed(() => basePixelsPerHour.value * internalZoomLevel.value)

    const totalHours = computed(() => {
      const start = dayjs(props.startDate)
      const end = dayjs(props.endDate)
      return end.diff(start, 'hour', true)
    })

    const timelineWidth = computed(() => totalHours.value * pixelsPerHour.value)

    const currentTimePosition = computed(() => {
      const now = dayjs()
      const start = dayjs(props.startDate)
      const end = dayjs(props.endDate)

      if (now.isBefore(start) || now.isAfter(end)) return -1

      const hoursPassed = now.diff(start, 'hour', true)
      return hoursPassed * pixelsPerHour.value
    })

    const upperTimeUnits = computed(() => {
      const units = []
      const start = dayjs(props.startDate)
      const end = dayjs(props.endDate)

      if (props.precision === 'day') {
        const currentDay = start.startOf('day')
        const width = 24 * pixelsPerHour.value
        units.push({
          label: currentDay.format('DD/MM/YYYY'),
          width: width,
          left: 0
        })
      } else if (props.precision === 'week') {
        let current = start.startOf('day')
        let offset = 0

        while (current.isSameOrBefore(end)) {
          const nextMonth = current.add(1, 'month').startOf('month')
          const until = nextMonth.isSameOrBefore(end) ? nextMonth : end
          const hours = until.diff(current, 'hour', true)
          const width = hours * pixelsPerHour.value

          units.push({
            label: current.format('MMMM YYYY'),
            width: width,
            left: offset
          })

          offset += width
          current = nextMonth
        }
      } else {
        // month
        const width = totalHours.value * pixelsPerHour.value
        units.push({
          label: start.format('MMMM YYYY'),
          width: width,
          left: 0
        })
      }

      return units
    })

    const lowerTimeUnits = computed(() => {
      const units = []
      const start = dayjs(props.startDate)
      const end = dayjs(props.endDate)
      const today = dayjs().startOf('day')

      if (props.precision === 'day') {
        // Hours
        for (let hour = 0; hour < 24; hour++) {
          const hourTime = start.add(hour, 'hour')
          const highlighted = hour >= 9 && hour <= 17

          units.push({
            label: hourTime.format('HH:mm'),
            width: pixelsPerHour.value,
            left: hour * pixelsPerHour.value,
            highlighted: highlighted,
            isToday: false
          })
        }
      } else if (props.precision === 'week') {
        // Days
        let current = start.startOf('day')
        let offset = 0

        while (current.isSameOrBefore(end)) {
          const nextDay = current.add(1, 'day').startOf('day')
          const until = nextDay.isSameOrBefore(end) ? nextDay : end
          const hours = until.diff(current, 'hour', true)
          const width = hours * pixelsPerHour.value
          const isWeekday = current.day() >= 1 && current.day() <= 5

          units.push({
            label: current.format('ddd DD'),
            width: width,
            left: offset,
            highlighted: isWeekday,
            isToday: current.isSame(today, 'day')
          })

          offset += width
          current = nextDay
        }
      } else {
        // Month - Days
        let current = start.startOf('day')
        let offset = 0

        while (current.isSameOrBefore(end)) {
          const nextDay = current.add(1, 'day').startOf('day')
          const until = nextDay.isSameOrBefore(end) ? nextDay : end
          const hours = until.diff(current, 'hour', true)
          const width = hours * pixelsPerHour.value
          const isWeekend = current.day() === 0 || current.day() === 6

          units.push({
            label: current.format('ddd DD'),
            dayOfWeek: current.format('ddd'),
            dayNumber: current.format('DD'),
            width: width,
            left: offset,
            highlighted: isWeekend,
            isWeekend: isWeekend,
            isToday: current.isSame(today, 'day')
          })

          offset += width
          current = nextDay
        }
      }

      return units
    })

    function getBarStyle(bar) {
      const start = dayjs(bar.start)
      const end = dayjs(bar.end)
      const chartStart = dayjs(props.startDate)

      const hoursFromStart = start.diff(chartStart, 'hour', true)
      const duration = end.diff(start, 'hour', true)

      const left = hoursFromStart * pixelsPerHour.value
      const width = duration * pixelsPerHour.value

      const colors = {
        'ABERTA': '#2196F3',
        'EM_ANDAMENTO': '#FF9800',
        'CONCLUIDA': '#4CAF50',
        'CANCELADA': '#F44336'
      }

      return {
        left: left + 'px',
        width: Math.max(width, 40) + 'px',
        backgroundColor: colors[bar.status] || '#9E9E9E'
      }
    }

    function handleBarClick(bar) {
      if (!dragState.value.isDragging && !dragState.value.isResizing) {
        emit('bar-click', bar)
      }
    }

    function startDrag(event, bar, row) {
      if (event.button !== 0) return // Only left click

      dragState.value = {
        isDragging: true,
        isResizing: false,
        resizeDirection: null,
        bar: bar,
        row: row,
        targetRow: row,
        startX: event.clientX,
        startY: event.clientY,
        startLeft: parseFloat(getBarStyle(bar).left),
        startWidth: 0,
        originalStart: bar.start,
        originalEnd: bar.end
      }

      document.addEventListener('mousemove', handleDrag)
      document.addEventListener('mouseup', endDrag)
      event.preventDefault()
    }

    function startResize(event, bar, row, direction) {
      dragState.value = {
        isDragging: false,
        isResizing: true,
        resizeDirection: direction,
        bar: bar,
        row: row,
        startX: event.clientX,
        startLeft: parseFloat(getBarStyle(bar).left),
        startWidth: parseFloat(getBarStyle(bar).width),
        originalStart: bar.start,
        originalEnd: bar.end
      }

      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', endResize)
      event.preventDefault()
    }

    function handleDrag(event) {
      if (!dragState.value.isDragging) return

      const deltaX = event.clientX - dragState.value.startX
      const deltaHours = deltaX / pixelsPerHour.value

      const newStart = dayjs(dragState.value.originalStart).add(deltaHours, 'hour')
      const duration = dayjs(dragState.value.originalEnd).diff(dayjs(dragState.value.originalStart), 'hour', true)
      const newEnd = newStart.add(duration, 'hour')

      dragState.value.bar.start = newStart.toISOString()
      dragState.value.bar.end = newEnd.toISOString()

      // Detectar mudança de linha baseado na posição Y
      const timelineElement = ganttBody.value
      if (timelineElement) {
        const rect = timelineElement.getBoundingClientRect()
        const relativeY = event.clientY - rect.top + timelineElement.scrollTop
        const rowHeight = 55 // min-height das linhas
        const rowIndex = Math.floor(relativeY / rowHeight)

        if (rowIndex >= 0 && rowIndex < props.rows.length) {
          dragState.value.targetRow = props.rows[rowIndex]
        }
      }
    }

    function endDrag() {
      if (dragState.value.isDragging) {
        const movedSignificantly = Math.abs(
          dayjs(dragState.value.bar.start).diff(dayjs(dragState.value.originalStart), 'minute')
        ) > 15

        const changedRow = dragState.value.targetRow && dragState.value.targetRow.id !== dragState.value.row.id

        if (movedSignificantly || changedRow) {
          emit('bar-updated', {
            bar: dragState.value.bar,
            row: dragState.value.row,
            targetRow: dragState.value.targetRow,
            type: changedRow ? 'move-team' : 'move'
          })
        } else {
          // Revert if moved less than 15 minutes and no row change
          dragState.value.bar.start = dragState.value.originalStart
          dragState.value.bar.end = dragState.value.originalEnd
        }
      }

      dragState.value.isDragging = false
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', endDrag)
    }

    function handleResize(event) {
      if (!dragState.value.isResizing) return

      const deltaX = event.clientX - dragState.value.startX
      const deltaHours = deltaX / pixelsPerHour.value

      if (dragState.value.resizeDirection === 'left') {
        const newStart = dayjs(dragState.value.originalStart).add(deltaHours, 'hour')
        const end = dayjs(dragState.value.originalEnd)

        if (newStart.isBefore(end)) {
          dragState.value.bar.start = newStart.toISOString()
        }
      } else {
        const newEnd = dayjs(dragState.value.originalEnd).add(deltaHours, 'hour')
        const start = dayjs(dragState.value.originalStart)

        if (newEnd.isAfter(start)) {
          dragState.value.bar.end = newEnd.toISOString()
        }
      }

      // Update duration
      const duration = dayjs(dragState.value.bar.end).diff(dayjs(dragState.value.bar.start), 'hour', true)
      dragState.value.bar.duration = Math.round(duration * 10) / 10
    }

    function endResize() {
      if (dragState.value.isResizing) {
        emit('bar-updated', {
          bar: dragState.value.bar,
          row: dragState.value.row,
          type: 'resize'
        })
      }

      dragState.value.isResizing = false
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', endResize)
    }

    function syncScroll() {
      if (timelineWrapper.value && ganttBody.value) {
        timelineWrapper.value.scrollLeft = ganttBody.value.scrollLeft
      }
      // Sync vertical scroll between labels and timeline
      if (labelsColumn.value && ganttBody.value) {
        labelsColumn.value.scrollTop = ganttBody.value.scrollTop
      }
    }
    watch(() => props.precision, () => {
      emit('zoom-changed', 1)
    })

    onMounted(() => {
      if (timelineWrapper.value && ganttBody.value) {
        timelineWrapper.value.scrollLeft = ganttBody.value.scrollLeft
      }
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', endDrag)
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', endResize)
    })

    return {
      chartContainer,
      timelineWrapper,
      ganttBody,
      labelsColumn,
      hoveredRow,
      internalZoomLevel,
      dragState,
      timelineWidth,
      upperTimeUnits,
      lowerTimeUnits,
      currentTimePosition,
      getBarStyle,
      handleBarClick,
      startDrag,
      startResize,
      syncScroll
    }
  }
})
</script>

<style lang="sass" scoped>
.gantt-chart
  position: relative
  width: 100%
  background: white
  border-radius: 8px
  overflow: hidden
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08)

.gantt-header
  display: flex
  position: sticky
  top: 0
  z-index: 10
  background: white
  border-bottom: 2px solid rgba(0, 0, 0, 0.12)
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

.gantt-row-labels-fixed
  flex-shrink: 0
  background: linear-gradient(to right, #fafafa, #ffffff)
  border-right: 2px solid rgba(0, 0, 0, 0.12)
  z-index: 11

.header-label
  height: 80px
  display: flex
  align-items: center
  justify-content: center
  font-weight: 600
  font-size: 14px
  color: #444
  text-transform: capitalize
  letter-spacing: 0.5px

.gantt-timeline-wrapper
  flex: 1
  overflow: hidden
  position: relative

.gantt-timeline
  position: relative
  min-width: 100%

.timeline-upper,
.timeline-lower
  position: relative
  height: 40px
  border-bottom: 1px solid rgba(0, 0, 0, 0.08)

.timeline-upper
  background: linear-gradient(to bottom, #f5f5f5, #ffffff)

.time-unit
  position: absolute
  top: 0
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  border-right: 1px solid rgba(0, 0, 0, 0.08)
  font-size: 13px
  font-weight: 500
  color: #555

.time-unit.upper
  font-weight: 600
  color: #333

.time-unit.lower.highlighted
  background: rgba(33, 150, 243, 0.05)

.time-unit.lower.today
  background: rgba(233, 30, 99, 0.1)
  font-weight: 600
  color: #E91E63

.gantt-body-wrapper
  display: flex
  position: relative

.gantt-labels-column
  flex-shrink: 0
  max-height: 500px
  overflow-y: auto
  overflow-x: hidden
  background: linear-gradient(to right, #fafafa, #ffffff)
  border-right: 2px solid rgba(0, 0, 0, 0.12)

  &::-webkit-scrollbar
    width: 0
    height: 0

.gantt-timeline-column
  flex: 1
  max-height: 500px
  overflow: auto
  position: relative

.gantt-row-label-fixed
  display: flex
  align-items: center
  padding: 0 12px
  min-height: 55px
  border-bottom: 1px solid rgba(0, 0, 0, 0.06)
  transition: background-color 0.2s ease

  &.row-hover
    background-color: rgba(0, 0, 0, 0.02)

  &.drop-target
    background-color: rgba(33, 150, 243, 0.12)
    font-weight: 700

    .equipe-cor
      box-shadow: 0 0 8px rgba(33, 150, 243, 0.6)
      transform: scale(1.2)

.gantt-rows
  position: relative
  width: max-content
  min-width: 100%

.gantt-row-timeline-wrapper
  border-bottom: 1px solid rgba(0, 0, 0, 0.06)
  transition: background-color 0.2s ease
  min-height: 55px
  width: 100%
  display: flex

  &.row-hover
    background-color: rgba(0, 0, 0, 0.02)

  &.drop-target
    background-color: rgba(33, 150, 243, 0.08)
    border: 2px dashed rgba(33, 150, 243, 0.4)
    border-left: none
    border-right: none

.row-label-content
  display: flex
  align-items: center
  gap: 8px
  width: 100%
  transition: all 0.2s ease

.equipe-cor
  width: 12px
  height: 12px
  border-radius: 50%
  border: 1px solid rgba(0, 0, 0, 0.15)
  flex-shrink: 0
  transition: all 0.2s ease

.row-label-text
  font-weight: 600
  font-size: 13px
  color: #444
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  transition: all 0.2s ease

.gantt-row-timeline
  position: relative
  min-height: 55px
  width: 100%

.grid-line
  position: absolute
  top: 0
  bottom: 0
  width: 1px
  background: rgba(0, 0, 0, 0.06)
  pointer-events: none

  &.highlighted
    background: rgba(33, 150, 243, 0.1)

.current-time-line
  position: absolute
  top: 0
  bottom: 0
  width: 2px
  background: #E91E63
  pointer-events: none
  z-index: 5
  box-shadow: 0 0 4px rgba(233, 30, 99, 0.5)

  &::before
    content: ''
    position: absolute
    top: -4px
    left: -3px
    width: 8px
    height: 8px
    background: #E91E63
    border-radius: 50%

.gantt-bar
  position: absolute
  top: 50%
  transform: translateY(-50%)
  height: 36px
  border-radius: 6px
  cursor: move
  transition: opacity 0.1s ease, box-shadow 0.1s ease
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15)
  user-select: none

  &:hover
    opacity: 0.95
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)
    z-index: 2

  &.is-dragging
    opacity: 0.8
    transform: translateY(-50%) scale(1.05)
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3)
    z-index: 100
    cursor: grabbing
    transition: none

  &.is-resizing
    opacity: 0.9
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25)
    z-index: 50
    cursor: ew-resize
    transition: none

.bar-content
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 10px
  height: 100%
  color: white
  font-size: 12px
  font-weight: 600
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2)
  overflow: hidden

.bar-label
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  flex: 1

.bar-duration
  margin-left: 8px
  opacity: 0.9
  font-size: 11px

.resize-handle
  position: absolute
  top: 0
  bottom: 0
  width: 8px
  cursor: ew-resize
  background: rgba(255, 255, 255, 0.3)
  opacity: 0
  transition: opacity 0.2s ease

  &.left
    left: 0
    border-left: 2px solid rgba(255, 255, 255, 0.6)

  &.right
    right: 0
    border-right: 2px solid rgba(255, 255, 255, 0.6)

.gantt-bar:hover .resize-handle
  opacity: 1

.gantt-zoom-controls
  position: absolute
  bottom: 16px
  right: 16px
  background: white
  border-radius: 24px
  padding: 6px 12px
  display: flex
  align-items: center
  gap: 8px
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15)
  border: 1px solid rgba(0, 0, 0, 0.08)
  z-index: 8

.zoom-level-text
  font-size: 12px
  font-weight: 600
  color: #666
  min-width: 45px
  text-align: center

// Estilos para dia da semana / dia do mês
.time-unit.lower
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 2px

  .day-of-week
    font-size: 10px
    font-weight: 600
    text-transform: uppercase
    color: #666
    letter-spacing: 0.5px

  .day-number
    font-size: 14px
    font-weight: 700
    color: #333

  &.weekend
    background-color: #f5f5f5

    .day-of-week
      color: #999

    .day-number
      color: #666

  &.today
    background-color: #e3f2fd

    .day-of-week
      color: #1976d2

    .day-number
      color: #1976d2
      font-weight: 900
</style>
