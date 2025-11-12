<script setup lang="ts">
import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import InboxSidebar from '@/components/inbox/InboxSidebar.vue'
import { useActiveFolder, setActiveFolder } from '@/composables/useInboxState'

const activeFolder = useActiveFolder()

function onChangeFolder(folder: string) {
	setActiveFolder(folder)
}
</script>

<template>
	<Sidebar collapsible="icon" class="border-r">
		<!-- Sidebar Header -->
		<SidebarHeader class="px-2 py-2">
			<div class="flex items-center gap-2 px-1">
				<SidebarTrigger />
				<span class="font-semibold">Mail</span>
			</div>
		</SidebarHeader>

		<!-- Sidebar Content -->
		<SidebarContent>
			<InboxSidebar 
				:active-folder="activeFolder" 
				@change-folder="onChangeFolder" 
			/>
		</SidebarContent>
	</Sidebar>
</template>
