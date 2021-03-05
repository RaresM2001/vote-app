<template>
    <div class="root">
        <side-navigation></side-navigation>
       <div class="content">
            <navigation></navigation>
            <router-view></router-view>
       </div>
    </div>
  </template>

    </div>
</template>

<script>
import Navigation from '../../components/navigation/Navigation'
import SideNavigation from '../../components/navigation/SideNavigation'

export default {
    components: {
        Navigation,
        'side-navigation': SideNavigation
    }
}
</script>

<style scoped>
.content {
    width: calc(100% - 300px);
    min-height: 100vh;
    position: absolute;
    right: 0;
}
</style>

