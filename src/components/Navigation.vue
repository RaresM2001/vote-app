<template>
    <nav>
        <unicon name="car-wash" fill="limegreen"></unicon>
         <vs-avatar dark id="avatar">
            <template #text>
                Evan You
            </template>
        </vs-avatar>
    </nav>
</template>
<script>
export default {
    
}
</script>

<style scoped>
nav {
    width: 100%;
    height: 60px;
    position: relative;
}

#avatar {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
}

.icon iframe {
    color: red;
   
   
}
</style>