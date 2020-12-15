<template>
    <div class="root">
      <div id="center">
        <h1 class="title text-centered">
           Votul dumneavoastra a fost deja depus!
        </h1>
        <p class="text-centered">In cazul in care nu dumneavoastra ati depus votul va rugam sa ne contactati aici <span style="color: var(--primary)">support@mrv-it.com</span></p>
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