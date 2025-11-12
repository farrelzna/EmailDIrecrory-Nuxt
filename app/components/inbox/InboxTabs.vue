<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  label: string
  value: string
}

const tabs: Tab[] = [
  { label: 'Primary', value: 'primary' },
  { label: 'Promotions', value: 'promotions' },
  { label: 'Social', value: 'social' },
  { label: 'Updates', value: 'updates' },
  { label: 'Forums', value: 'forums' }
]

interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'primary'
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeTab = ref(props.modelValue)

function handleTabChange(value: string) {
  activeTab.value = value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="border-b bg-background">
    <div class="flex items-center px-4">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="[
          'px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
          activeTab === tab.value
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
        ]"
        @click="handleTabChange(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>
