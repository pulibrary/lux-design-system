<template>
  <path
    stroke="currentColor"
    stroke-width="3.3"
    stroke-linecap="round"
    d="M2 2
  L22 22
  M22 2
  L2 22"
  />
</template>

<script setup>
import { defineOptions } from "vue"
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
defineOptions({
  name: "LuxIconClose",
  status: "ready",
  release: "1.0.0",
  type: "Element",
})
</script>
