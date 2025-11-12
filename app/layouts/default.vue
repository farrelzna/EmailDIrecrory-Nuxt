<script setup>
import {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarInset,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import InboxSidebar from '@/components/inbox/InboxSidebar.vue'
import NavHeader from '@/components/Nav/Header.vue'
import { useActiveFolder, setActiveFolder } from '@/composables/useInboxState'

const activeFolder = useActiveFolder()
function onChangeFolder(folder) {
	setActiveFolder(folder)
}
</script>

<template>
	<SidebarProvider>
		<!-- App Sidebar -->
		<Sidebar collapsible="icon" class="border-r">
			<SidebarHeader class="px-2 py-2">
				<div class="flex items-center gap-2 px-1">
					<SidebarTrigger />
					<span class="font-semibold">Mail</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<InboxSidebar :active-folder="activeFolder" @change-folder="onChangeFolder" />
			</SidebarContent>
		</Sidebar>

		<!-- Main content area -->
		<SidebarInset>
			<div class="flex h-svh flex-col">
				<NavHeader />
				<div class="flex-1 min-h-0 px-4">
					<slot />
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</template>

<style scoped>
</style>
