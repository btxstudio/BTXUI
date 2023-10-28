<template>
  <div>
      <p>{{ name }}</p>
      <p><button @click="name = 'btx'">change</button></p>
  </div>
</template>

<script setup>
  useHead({
    title: "最新文章"
  })
  const user = reactive({
    name: "neo",
    age: 34
  })
</script>