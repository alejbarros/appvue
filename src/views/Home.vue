<template>
  <div class="col-md-12 ml-md-auto ">
    <h4 class="title-module">Pet Store</h4>
    <div class="table-responsive">
    <div class="form-row">
      <div class="form-group col-md-6">
        <b-form-input v-model="keyword" placeholder="Find ..." type="text"></b-form-input>
      </div>
    </div>
    <br>
    <div>
    <b-table
      id="tablePet"
      bordered
      :items="filtered"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      sort-icon-left
      responsive="sm">
        <template v-slot:cell(action)="row">
          <b-link @click="deletePet(row.item.id)" ><img src="@/assets/delete.png" alt="delete" width="25" height="25">
          </b-link>
          <b-link @click="getInfoPet(row.item.id)" ><img src="@/assets/edit.png" alt="update" width="25" height="25">
          </b-link>
        </template>
      </b-table>
  </div>
  <b-row>
    <b-col sm="5" md="5" class="my-1">
      <b-form-group
        label="Por pagina"
        label-cols-sm="6"
        label-cols-md="4"
        label-cols-lg="3"
        label-align-sm="right"
        label-size="sm"
        label-for="perPageSelect"
        class="mb-0"
      >
      <b-form-select
        v-model="perPage"
        id="perPageSelect"
        size="sm"
        :options="pageOptions"
        ></b-form-select>
      </b-form-group>
    </b-col>
    <b-col sm="7" md="6" class="my-1">
      <b-pagination
       v-model="currentPage"
       :total-rows="rows"
       :per-page="perPage"
       aria-controls="tablePet"
       align="fill"
       size="sm"
       class="my-0">
      </b-pagination>
    </b-col>
  </b-row>
  <br>
  </div>
  <b-modal id="modal-Create" ref="modal-Create" size="lg" title="Input new members" ok-variant="secondary" ok-title="Save"  @ok="savePet()">
    <div class="modal-body">
    <form>
       <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Name: </label>
          <b-form-input v-model="nameInput" type="text" placeholder="name" id="name" ></b-form-input>
        </div>
        <div class="form-group col-md-6">
          <label for="age">Age: </label>
          <b-form-input v-model="ageInput" type="text"   placeholder="age" id="age" ></b-form-input>
        </div>
      </div>
      <div class="form-row">
          <label for="race">Race: </label>
          <b-form-input v-model="raceInput" type="text"   placeholder="race" id="race" ></b-form-input>
      </div> 
    </form>
    </div>
  </b-modal>
  <b-modal id="modal-Update" ref="modal-Update" size="lg" title="Update member" ok-variant="secondary" ok-title="Update"  @ok="updatePet()">
    <div class="modal-body">
    <form>
       <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Name: </label>
          <b-form-input v-model="nameInput" type="text" placeholder="name" id="name" ></b-form-input>
        </div>
        <div class="form-group col-md-6">
          <label for="age">Age: </label>
          <b-form-input v-model="ageInput" type="text"   placeholder="age" id="age" ></b-form-input>
        </div>
      </div>
      <div class="form-row">
          <label for="race">Race: </label>
          <b-form-input v-model="raceInput" type="text"   placeholder="race" id="race" ></b-form-input>
      </div> 
    </form>
    </div>
  </b-modal>
  <div class="form-group col-md-12">
         <b-button v-b-modal.modal-Create variant="primary" class="btn btn-lg btn-secondary float-center">Create</b-button>
  </div>
  </div>    
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      idInput: '',
      nameInput: '',
      ageInput: '',
      raceInput: '',
      filters: {
        id: '',
        name: '',
        age: '',
        race: ''
      },
      keyword: '',
      perPage: 10,
      currentPage: 1,
      pageOptions: [5, 10, 25, 50],
      fields: [
        { key: 'id', sortable: true },
        { key: 'name', sortable: true },
        { key: 'age', sortable: true },
        { key: 'race', sortable: true },
        { key: 'action', sortable: false }        
      ],
      list: []    
    }
  },
  created () {
    this.getListPets()
  },
  methods: {
    getListPets() {
      this.list = this.$store.getters.list
      this.getMaxIndex()      
    },
    getMaxIndex() {
      var max = 0;
      for (var pet of this.list){
        if(pet.id > max) {
          max = pet.id
        }
      }
      this.idInput = max
    },
    savePet() {
      this.getMaxIndex();
      var pet = { id: this.idInput + 1 ,
                  name: this.nameInput,
                  age: this.ageInput,
                  race: this.raceInput }
      this.list.push(pet)
      this.clearValues()   
      this.$store.commit('saveList', this.list)                        
    },
    deletePet(id) {   
      var index
      for (var i = 0 ; i < this.list.length ; i++){
        if(this.list[i].id == id) {
          index = i
        }
      }
      this.list.splice(index, 1) 
      this.$store.commit('saveList', this.list) 
    },
    updatePet() {
      this.deletePet(this.idInput)
      var pet = { id: this.idInput,
                  name: this.nameInput,
                  age: this.ageInput,
                  race: this.raceInput}
      this.list.push(pet)
      this.clearValues()
       this.$store.commit('saveList', this.list)                    
    },
    getInfoPet(id) {
      for (var pet of this.list){
        if( pet.id == id ) {
          this.getData(pet)
        }  
      }
       this.$refs['modal-Update'].show()
    },
    getData(pet) {
      this.idInput = pet.id
      this.nameInput = pet.name
      this.ageInput = pet.age
      this.raceInput = pet.race 
    }
  },
  clearValues() {
    this.idInput = ''
    this.nameInput = ''
    this.ageInput = ''
    this.raceInput = ''
  },
  computed: {
    filtered () {
      return this.keyword
        ? this.list.filter(item => item.name.toUpperCase().includes(this.keyword.toUpperCase()) || item.race.toUpperCase().includes(this.keyword.toUpperCase()))
        : this.list
    },
    rows () {
      return this.list.length
    }
  }
}
</script>

<style scoped lang="scss">

</style>


