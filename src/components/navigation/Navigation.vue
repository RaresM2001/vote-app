<template>
    <nav>
        <ul id="actions">
            <li><unicon name="signout" class="icon"></unicon></li>
            <li><unicon name="setting" class="icon"></unicon></li>
        </ul>
         <vs-avatar dark id="avatar">
            <template #text>
                {{admin.firstName + " " + admin.lastName}}
            </template>
        </vs-avatar>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            admin: {
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName')
            }
        }
    }
}
</script>

<style scoped>
nav {
    width: 100%;
    height: 60px;
    position: relative;
    /* padding-top: 30px; */
}

#avatar {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
}

.icon {
   transition: all .4s;
   float: right;
   margin: 0;
   padding: 0;
   cursor: pointer;
}

.icon:hover {
    fill: var(--primary);
}

#actions {
    width: auto;
    max-width: 400px;
    float: right;
    height: 60px;
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin-right: 120px;
}

#actions li {
    height: 60px;
    line-height: 45px;
    vertical-align: center;
    margin: 0;
    padding: 0;
    float: right;
    margin-left: 15px;
    padding-top: 15px;
    /* padding-top: 8px; */
}
</style>