<template>
    <div id="side-bar">
        <h1 class="title">Sindicatul National Solidaritatea</h1>
        <ul id="side-nav-list">
            <li class="side-li"><unicon name="home-alt" class="icon"></unicon><p>Acasa</p></li>
            <li class="side-li"><unicon name="users-alt" class="icon"></unicon><p>Membrii Sindicat</p></li>
            <li class="side-li"><unicon name="thumbs-down" class="icon"></unicon><p>Poll-uri</p></li>
            <li class="side-li"><unicon name="envelope" class="icon"></unicon><p>Mesaje</p></li>
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
    min-height: 100vh;
    width: 300px;
    float: left;
    background-color: var(--dark);
    padding: 0 20px 0 20px;
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
    color: #948f8f;
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
    fill: #948f8f;
    position: absolute;
    top: 5px;
}

.side-li p {
    color: #948f8f;
    padding-left: 35px;
    margin: 0;
}



</style>