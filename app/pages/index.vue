<script setup>
// Simple redirect from `/` to `/inbox`.
// navigateTo works on both server and client in Nuxt and will issue
// a proper redirect during SSR or client-side navigation.

navigateTo('/inbox')
</script>
