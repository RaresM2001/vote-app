<template>
    <div class="root">
      <div id="center">
        <h1 class="title text-centered">
            Multumim pentru votul dumneavoastra!
        </h1>
        <p class="text-centered">In cazul intampinarilor unor probleme tehnice va rugam sa ne contactati la support-vot@mrv-it.com</p>
        <p class="text-centered"> <router-link style="text-align: center;" tag="a" to="/">Mergeti la Lsta Poll-urilor</router-link></p>
      </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
p {
    color: grey;
    text-align: center;
}

#center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}
</style>