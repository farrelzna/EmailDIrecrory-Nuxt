<script setup>
import { SidebarTrigger } from '@/components/ui/sidebar'
import InboxSearch from '@/components/inbox/InboxSearch.vue'
import { setSearch } from '@/composables/useInboxSearch'

function onSearch(payload) {
	setSearch(payload)
}
</script>

<template>
	<header class="sticky top-0 z-20 flex h-14 items-center gap-3 bg-background">
		<SidebarTrigger class="md:hidden" />
		<div class="flex-1 max-w-[600px] ml-4 mt-3">
			<InboxSearch @search="onSearch" />
		</div>
	</header>
</template>