  <template>
  <div id="container">
    <vs-table v-model="selected" striped>
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox
              :indeterminate="selected.length == members.length"
              v-model="allCheck"
              @change="selected = $vs.checkAll(selected, members)"
            />
          </vs-th>
          <vs-th> Prenume </vs-th>
          <vs-th> Nume </vs-th>
          <vs-th> Email </vs-th>
          <vs-th> DGRFP </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in members"
          :data="tr"
          :is-selected="!!selected.includes(tr)"
          not-click-selected
        >
          <vs-td checkbox>
            <vs-checkbox :val="tr" v-model="selected" />
          </vs-td>
          <vs-td>
            {{ tr.firstName }}
          </vs-td>
          <vs-td>
            {{ tr.lastName }}
          </vs-td>
          <vs-td>
             {{ tr.email }} <!--fasfasdfas -->
          </vs-td>
          <vs-td>
            {{ tr.DGRFP }}
          </vs-td>
          <template #expand>
              <ul class="more-info-list">
                <li>CNP: {{tr.CNP}}</li>
                <li>Adresa: {{tr.address}}</li>
              </ul>
              <button class="m-btn rounded-btn" id="send-private-mail-btn">mail</button>
              <button class="m-btn rounded-btn" id="delete">Delete</button>
            </template>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    allCheck: false,
    selected: [],
    members: [
      {}
    ],
  }),
  mounted() {
    this.getMembers();
  },
  methods: {
    async getMembers() {
      this.members = [];
      let result = await axios.get('http://localhost:8081/members');
      for(let i = 0; i < result.data.members.length; i++) {
       this.members.push(result.data.members[i])
      //  added a comment fo git  ce pula mea se intampla
      }
    }
  }
};
</script>
<style scoped>
#container {
  width: 80%;
  margin-left: 10%;
}

.vs_rable__thead {
  background: red;
}

.more-info-list {
  list-style-type: none;
  color: white;
  font-weight: bold;
  margin-bottom: 30px;
}

.more-info-list  li {
  margin-bottom: 10px;
}

.rounded-btn {
  position: absolute;
}

#send-private-mail-btn {
  right: 40px;
  top: 20px;
}

#delete {
  background-color: var(--danger);
  right: 40px;
  top: 60px;
}
</style>

