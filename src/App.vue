<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const links = [
  { to: '/', label: 'Live feed' },
  { to: '/send', label: 'Send money' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <nav class="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <span class="font-semibold text-slate-900">Digital Wallet</span>
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-slate-600 hover:text-slate-900"
          exact-active-class="font-medium text-indigo-600"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
