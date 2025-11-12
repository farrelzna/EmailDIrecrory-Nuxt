<script setup>
import { SidebarTrigger } from '@/components/ui/sidebar'
import InboxSearch from '@/components/inbox/InboxSearch.vue'
import { setSearch } from '@/composables/useInboxSearch'

// Current user data
const currentUser = {
	name: 'John Doe',
	email: 'john.doe@example.com',
	photo: ''
}

function onSearch(payload) {
	setSearch(payload)
}
</script>

<template>
	<header class="sticky top-0 z-20 flex h-14 items-center gap-3 bg-background p-4">
		<SidebarTrigger class="md:hidden" />
		<div class="flex-1">
			<InboxSearch 
				:user-name="currentUser.name"
				:user-email="currentUser.email"
				:user-photo="currentUser.photo"
				@search="onSearch"
				@settings-click="onSettingsClick"
				@user-menu-toggle="onUserMenuToggle"
			/>
		</div>
	</header>
</template>