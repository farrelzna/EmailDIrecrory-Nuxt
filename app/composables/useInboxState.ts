import type { FolderType } from '@/types'

/**
 * Global inbox state composable for managing active folder
 * Active folder affects email filtering on pages like inbox.vue
 */
export function useActiveFolder() {
  return useState<FolderType>('activeFolder', () => 'inbox')
}

/**
 * Set the active folder
 */
export function setActiveFolder(folder: FolderType) {
  const active = useActiveFolder()
  active.value = folder
}
