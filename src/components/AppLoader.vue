<template lang='pug'>
.lds-ring(:class='{big_loader: bigLoader, loader_color_black: loaderColorBlack}')
  div
  div
  div
  div
</template>

<script>
export default {
  props: {
    bigLoader: {
      type: Boolean,
      required: false
    },
    loaderColorBlack: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.lds-ring {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}
.big_loader {
  div {
    width: 54px !important;
    height: 54px !important;
  }
}
.loader_color_black {
  div {
    border: 3px solid #000 !important;
    border-color: #000 transparent transparent transparent !important;
  }
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 8px;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
div:nth-child(1) {
  animation-delay: -0.45s;
}
div:nth-child(2) {
  animation-delay: -0.3s;
}
div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
