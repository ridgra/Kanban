<template>
  <div class="col-lg-3 col-md-4 col-sm-4 px-2">
    <h5 class="card-header py-3 pl-3">{{ category.name }}</h5>
    <div
      class="card bg-light px-0 "
      style="max-height:50vh; overflow-y:scroll; border:0"
    >
      <div class="card-body p-3">
        <Cards v-for="(task, i) in filteredTasks" :key="i" :task="task">
        </Cards>
      </div>
    </div>
    <hr />
    <div class="m-0">
      <div v-if="showInput">
        <b-form-textarea
          id="textarea-auto-height"
          placeholder="Enter a title for this card..."
          size="sm"
          rows="0"
          max-rows="3"
          v-model="title"
        ></b-form-textarea>
        <h6 class="card-header m-0 py-3 pl-3">
          <span
            class="btn-sm btn-primary text-white font-weight-light"
            style="cursor:pointer"
            @click="createTask"
            >Add task</span
          >
          <span @click="showAdd" class="p-1 btn-sm" style="cursor:pointer">
            <b-icon-x class="h5 my-0 py-0 ml-2"></b-icon-x>
          </span>
        </h6>
      </div>

      <h6
        v-if="showAddBtn"
        class="card-header m-0 py-3 pl-3"
        @click="showInputTask"
        id="btnAdd"
      >
        <b-icon-plus-square-fill class="mr-2"></b-icon-plus-square-fill>
        Add another task
      </h6>
    </div>
  </div>
</template>

<script>
import Cards from '../components/Cards';
export default {
  name: 'Categories',
  components: {
    Cards,
  },
  props: ['category', 'tasks'],
  computed: {
    filteredTasks() {
      return this.tasks.filter((e) => e.CategoryId == this.category.id);
    },
  },
  data() {
    return {
      showInput: false,
      showAddBtn: true,
      title: '',
    };
  },
  methods: {
    showInputTask() {
      this.showInput = true;
      this.showAddBtn = false;
    },

    showAdd() {
      this.showInput = false;
      this.showAddBtn = true;
    },
    createTask() {
      const data = { title: this.title, CategoryId: this.category.id };
      this.$emit('createTask', data);
      this.title = '';
      this.showAdd();
      this.$emit('fetchTasks');
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style>
#btnAdd {
  cursor: pointer !important;
}
textarea {
  border-bottom: 0 !important;
  border-right: 0 !important;
  border-color: honeydew;
}
</style>
