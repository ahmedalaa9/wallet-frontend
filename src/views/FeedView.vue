<template>
  <section>
    <h1 class="text-2xl font-semibold text-slate-900">Live transactions</h1>
    <p class="mt-2 text-slate-600">Part 1 — the merged StreamCo + LedgerAPI feed goes here.</p>
  </section>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let ws: WebSocket | null = null
const wsArray: string[] = []

function wsData() {
  ws = new WebSocket('ws://localhost:4000/ws')
  ws.onopen = () => {
    console.log('WebSocket connection established')
  }
  ws.onmessage = (event) => {
    const data: string = event.data
    wsArray.push(data)
    console.log('Received data:', wsArray)
  }
  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
  ws.onclose = () => {
    console.log('WebSocket connection closed')
  }
}

function restData() {
  fetch('http://localhost:4000/api/feed')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error('Error fetching transactions:', error)
    })
}
onMounted(() => {
  // restData()
  wsData()
})

onUnmounted(() => ws?.close())
</script>
