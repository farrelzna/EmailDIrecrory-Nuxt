<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import InboxSearch from '@/components/inbox/InboxSearch.vue'
import { setSearch } from '@/composables/useInboxSearch'

// Current user data
const currentUser = {
	name: 'John Doe',
	email: 'john.doe@example.com',
	photo: ''
}

function onSearch(payload: any) {
	setSearch(payload)
}

function onSettingsClick() {
	console.log('Settings clicked')
	// TODO: Implement settings dialog
}

function onUserMenuToggle() {
	console.log('User menu toggled')
	// TODO: Implement user menu dropdown
}
</script>

<template>
	<header class="sticky top-0 z-20 flex h-14 items-center gap-3 bg-background border-b px-4">
		<!-- Mobile Sidebar Trigger -->
		<SidebarTrigger class="md:hidden" />
		
		<!-- Search Bar with User Profile -->
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
