<template>
  <div>
      <logo />
      <function />
      <h1 class="title">
        demo
      </h1>
      <h2 class="subtitle">
        My fantabulous Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Function from '~/components/Function.vue'

export default {
  components: {
    Logo,
    Function
  }
}
</script>
