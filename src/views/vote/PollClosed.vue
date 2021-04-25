<template>
    <div class="root">
      <div id="center">
        <h1 class="title text-centered">
            Sesiunea de vot a fost inchisă!
        </h1>
        <p class="text-centered">Daca citit acest mesaj înseamnă ca sesiunea de vot la care incercati să participați a expirat sau a fost inchisă de către administrator.</p>
         <p class="text-centered"> <router-link style="text-align: center;" tag="a" to="/">Mergeți la lista sesiunilor de vot</router-link></p>
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