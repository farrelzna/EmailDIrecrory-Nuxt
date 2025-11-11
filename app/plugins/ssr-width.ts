export default defineNuxtPlugin(async (nuxtApp) => {
  // Dynamically import @vueuse/core so the plugin doesn't crash if the
  // package is not installed (useful during initial setup).
  try {
    const mod = await import('@vueuse/core')
    const provideSSRWidth = mod.provideSSRWidth
    if (typeof provideSSRWidth === 'function') {
      provideSSRWidth(1024, nuxtApp.vueApp)
    }
  } catch (e) {
    // If @vueuse/core isn't installed, skip SSR width provisioning.
    // This keeps the app running and avoids a hard crash during dev.
    // You can install it with: npm install @vueuse/core --save
    // or restore the static import if you prefer.
    // console.warn('provideSSRWidth skipped:', e)
  }
})