// Global inbox state composable (plain JavaScript version)
// activeFolder: current folder key affecting filtering on pages like inbox.vue

export function useActiveFolder() {
  return useState('activeFolder', () => 'inbox')
}

export function setActiveFolder(folder) {
  const active = useActiveFolder()
  active.value = folder
}
