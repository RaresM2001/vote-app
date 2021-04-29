<template>
  <div id="settings-container">
    <h1 class="title">Setări</h1>
    <h3 class="subtitle">Setări sesiuni vot {{adminSettings.sendMailAfterPollIsCreated}}</h3>
    <vs-checkbox @change="settingsChanged" class="switch" v-model="adminSettings.sendMailAfterPollIsCreated">
      Trimiteți mail membrilor in momentul creării sesiunii de  vot.
    </vs-checkbox>
    <div class="line-separator"></div>
    <button v-if="adminChangedSettings" class="m-btn small-btn" @click="saveSettings">salvează</button>
  </div>
</template>
<script>
import environment from '../../../utils/environment';
import notification from '../../../utils/notification';

export default {
  data() {
    return {
      adminSettings: {
        sendMailAfterPollIsCreated: false
      },
      adminChangedSettings: false
    }
  },

  async mounted() {
    const loading = this.$vs.loading({
      background: '#5b3cc4',
      color: '#fff'
    });
    await this.getCurrentSettings();
    loading.close();
  },

  methods: {
    settingsChanged() {
      this.adminChangedSettings = true;
      console.log(this.adminSettings.sendMailAfterPollIsCreated)
    },

    async saveSettings() {
      const loading = this.$vs.loading({
        background: '#5b3cc4',
        color: '#fff'
      });
      this.adminChangedSettings = false;
      console.log('Admin settings when saved', this.adminSettings.sendMailAfterPollIsCreated);
      let result = await axios.post( `${environment.getApiUrl()}/admin/update_settings`, {id: localStorage.getItem('adminId'), settings: this.adminSettings})
      loading.close();
      if(!result.data) notification.notifyFail('Erroare', 'A aparut o eroare. Vă rugăm incercați mai târziu.', this.$vs);
      else notification.notifySuccess('Setari schimbate', 'Setările dumneavoastră au fost updatate cu succes!', this.$vs);
    },

    async getCurrentSettings() {
      let result = await axios.get(`${environment.getApiUrl()}/admin/${localStorage.getItem('adminId')}`);
      if(result.data.success) this.adminSettings.sendMailAfterPollIsCreated = result.data.settings.sendMailAfterPollIsCreated;
      else notification.notifyFail('Erroare', 'Setări indisponibile. Vă rugăm încercați mai târziu.', this.$vs);
    }
  }
}
</script>
<style scoped>
#settings-container {
  padding: 0 50px;
}

.switch, :paused {
  display: inline;
  float: right;
}

.subtitle {
  color: var(--customBlack);
}

.line-separator {
  width: 50%;
  height: 1px;
  background-color: lightgrey;
  margin-top: 30px;
}

.m-btn {
  margin-top: 50px;
}
</style>