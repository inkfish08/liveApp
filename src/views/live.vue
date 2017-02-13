<template lang="html">
12321
</template>

<script>
export default {
  ready(){
    let titleName = this.$route.name
    this.$dispatch('changeTitle',titleName)
  }
}
</script>

<style lang="css">
</style>
