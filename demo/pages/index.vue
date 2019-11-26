<template>
  <div>
      <logo />
      <function />

      <div class="links">
        <nuxt-link
          to="/apollo"
          class="button--green"
        >
          Check Out Apollo
        </nuxt-link>
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
