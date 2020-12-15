<template>
    <div id="side-bar">
        <h1 class="title text-centered">Sindicatul National Solidaritatea</h1>
        <ul id="side-nav-list">
            <router-link tag="li" :to="{name: 'dash-home'}" class="side-li"><unicon name="home-alt" class="icon"></unicon><p>Acasa</p></router-link>
            <router-link tag="li" :to="{name: 'add-member'}" class="side-li"><unicon name="plus" class="icon"></unicon><p>Adauga Membru</p></router-link>
            <router-link tag="li" :to="{name: 'dash-members'}" class="side-li"><unicon name="users-alt" class="icon"></unicon><p>Membrii Sindicat</p></router-link>
            <router-link tag="li" :to="{name: 'dash-create-poll'}" class="side-li"><unicon name="thumbs-down" class="icon"></unicon><p>Creaza Poll</p></router-link>
            <router-link tag="li" :to="{name: 'send-message'}" class="side-li"><unicon name="envelope-add" class="icon"></unicon><p>Trimite Mesaj</p></router-link>
            <router-link tag="li" :to="{name: 'polls-list'}" class="side-li"><unicon name="archive-alt" class="icon"></unicon><p>Poll-uri</p></router-link>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#side-bar {
    height: 100%;
    height: 100%;
    min-height: 100vh;
    width: 300px;
    float: left;
    background-color: var(--dark);
    padding: 0 20px 0 20px;
    position: fixed;
    top: 0;
    left: 0;
}

.title {
    color: white;
    font-size: 1.4em;
    margin-top: 50px;
}

#side-nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    margin-top: 50px;
}

.side-li {
    width: 100%;
    height: 45px;
    color: #d8d8d8;
    font-weight: bold;
    border-radius: 5px;
    font-size: 1.1em;
    transition: all .4s;
    cursor: pointer;
    line-height: 45px;
    vertical-align: center;
    padding-left: 15px;
    position: relative;
}

.side-li:hover {
    background: rgba(169,169,169, 0.1);
}

.side-li:hover p, .side-li:hover .icon {
    color: var(--primary);
    fill: var(--primary);
}

.side-li .icon {
    fill: #d8d8d8;
    position: absolute;
    top: 5px;
}

.side-li p {
    color: #d8d8d8;
    padding-left: 35px;
    margin: 0;
}



</style>