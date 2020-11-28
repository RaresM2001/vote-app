<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-sl-12 form-wrapper">
      <div class="row">
        <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12 inner-wrapper">
          <h1>Creati Poll Nou</h1>
          <form>
            <div class="form-group">
              <label for>Titlu</label>
              <div class="input-group">
                <input v-model="pollInfo.title" type="text" class="form-control">
              </div>
            </div>
           
            <div class="form-group" style="padding-bottom: 25px;">
              <label for="exampleFormControlTextarea1">Descriere poll</label>
              <textarea v-model="pollInfo.description" class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
              <div class="inline">
                <div class="check-box-all" @click='toggleAll' v-bind:class='{selected: pollInfo.selectedAll}' style="float: left; margin-right: 5px;"></div>
                <div style="float: left;"><p>Selectati toti membrii</p></div>
              </div>
            </div>
            <div class="from-group">
              <label>Selectati participanti</label>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Nume si Prenume</th>
                    <th scope="col">Email</th>
                    <th scope="col">CNP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(member, index) in membersArray" :key='member._id'>
                    <th scope="row">
                      <div class="check-box" @click='toggleSelect(index)' v-bind:key='member._id' v-bind:class='{selected: member.selectedForPoll}'></div>
                    </th>
                    <td>{{member.firstAndLastName}}</td>
                    <td>{{member.email}}</td>
                    <td>{{member.CNP}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group">
              <button @click='createPoll' class="btn custom-bg">Creare Poll</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pollInfo: {
        title: '',
        author: '',
        description: '',
        selectedMembers: [],
        selectedAll: false
      },
      membersArray: [],
    };
  },
  methods: {

    toggleSelect(index) {
      var replacement =  this.membersArray[index];
      replacement.selectedForPoll = !this.membersArray[index].selectedForPoll;
      this.membersArray.splice(index, 1,  replacement);
    },
 
    changeMembers(into) {
      //declaring a member counter
      var index = 0;
      this.membersArray.forEach((member) => {
          //creating an member replacement
          var replacement = member;
          replacement.selectedForPoll = into;
          //replacing the member
          this.membersArray.splice(index, 1,  replacement);
          //incrementing counter
          index++;
        });
    },

    toggleAll() {
      this.pollInfo.selectedAll = !this.pollInfo.selectedAll;
      if(this.pollInfo.selectedAll) {
        this.changeMembers(true);
      } else {
        this.changeMembers(false);
      }
    },

    /**
     * CREATING THE POLL
     * @param event preventing the form from submission
    */

    createPoll(event) {
      //preventing the submission of the form
      event.preventDefault();

      //creating the selectetMembers arr
      this.pollInfo.selectedMembers = this.membersArray.filter((member) => {
        return member.selectedForPoll;
      });

      //creating the request body
      var requestBody = {
        title: this.pollInfo.title,
        author: localStorage.useremail,
        participants: this.pollInfo.selectedMembers,
        description: this.pollInfo.description,
        token: localStorage.token
      }

      //make the request
      const INSTANCE = this;
      axios.post('https://sfafsibiu.herokuapp.com/create_poll', requestBody).then(function(response) {
        if(response.status === 200) {
          //deselecting the members 
          INSTANCE.changeMembers(false);
          INSTANCE.pollInfo.selectedAll = false;
          INSTANCE.$swal('Poll creeat', 'Sesiune de vot deshisa.', 'success');
          console.log('Request sent with response 200');
        } else {
          console.log(response.body); 
          INSTANCE.$swal('Eroare!', 'Incercati mai tariziu.', 'error');
        }
      });
    }
  },
  mounted() {
    // getting all the members 
    const INSTANCE = this;
    axios.get('https://sfafsibiu.herokuapp.com/get_members', {headers: {"x-auth": localStorage.token}}).then(function(response) {
      if(response.status === 200) {
        
        //retriveing the members array
        INSTANCE.membersArray = response.data;

        //initializing all members as not selected
        INSTANCE.membersArray.forEach(function(member) {
          member.selectedForPoll = false;
        });
      } else {
       alert('Something went bad. Please try again later');
      }
    }).catch((error) => {
      alert('Somethign went wrong');
      // $router.push('dashboard');
    });
  }
};
</script>

<style scoped>
.form-group {
  margin: 50px 0 50px 0;
}

.inner-wrapper {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
  padding: 20px;
}

.form-wrapper {
  padding: 0 50px 20px 50px;
}

.custom-bg {
  background-color: var(--primary);
  border-color: var(--primary);
  outline: none;
  border-radius: 4px;
  color: white;
  width: 150px;
  height: 40px;
}

.custom-bg:hover {
  background-color: #485cbd;
}

.custom-bg:focus, .custom-bg:active {
  border-color: var(--primary);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px var(--primary);
  outline: none !important;
}

thead {
  background-color: var(--primary);
  color: white;
  border: none;
}

.selected {
  background-color: var(--primary);
  border-color: var(--primary);
}

label {
  color: black;
  font-size: 1.2em;
}

form {
  padding: 30px;
}

h1 {
  margin-left: 30px;
}

.form-control:focus {
  border-color: transparent;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px var(--primary);
}

.check-box {
  width: 20px;
  height: 20px;
  border: 2px solid lightgrey;
  /* background-color: lightgray; */
  box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
  transition: all 0.4s;
  border-radius: 4px;
  cursor: pointer;
}

.check-box-all {
  width: 20px;
  height: 20px;
  border: 2px solid lightgrey;
  /* background-color: lightgray; */
  box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
  transition: all 0.4s;
  border-radius: 4px;
  cursor: pointer;
}

.inline {
  margin-top: 25px;
  margin-bottom: 25px;
}

p {
  margin: 0;
}

table {
  margin-top: 0;
  margin: 0;
  max-height: 500px;
  overflow: auto;
}
</style>
