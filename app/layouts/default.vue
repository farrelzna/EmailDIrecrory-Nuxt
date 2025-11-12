<script setup>
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
	<SidebarProvider>
		<!-- App Sidebar -->
		<AppSidebar />

		<!-- Main content area -->
		<SidebarInset>
			<div class="flex h-svh flex-col">
				<!-- App Header -->
				<AppHeader />
				
				<!-- Page Content -->
				<div class="flex-1 min-h-0 px-4">
					<slot />
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</template>
