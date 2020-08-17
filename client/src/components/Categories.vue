<template>
  <div class="d-flex flex-column col-lg-3 col-md-4 col-sm-4 mx-2">
    <h5 class="card-header py-3 pl-3 d-flex justify-content-between">
      <div
        id="title"
        class="col-9"
        ref="editable"
        :contenteditable="isEditable"
        @blur="onEdit"
        :style="color"
        @keydown.enter="endEdit"
      >
        {{ category.name }}
      </div>

      <div>
        <div>
          <b-dropdown
            id="dropdown-cat"
            right
            text=""
            class="p-0 m-0 btn"
            size="sm"
          >
            <template v-slot:button-content>
              <h6 class="p-0 m-0">
                <b-icon-view-list></b-icon-view-list>
              </h6>
            </template>
            <b-dropdown-item
              @click="setEditable()"
              href=""
              class="py-2"
              style="background-color:white !important"
              >Edit</b-dropdown-item
            >
            <b-dropdown-item
              @click="deleteCat()"
              href="#"
              class="py-2"
              style="background-color:white !important"
              >Remove</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </h5>

    <div
      class="card bg-light px-0"
      style="max-height:55vh; overflow-y:scroll; border:0"
    >
      <div>
        <div class="card-body p-3" style="min-height: 10vh;">
          <draggable
            :move="checkMove"
            :list="filteredTasks"
            group="task"
            :CatId="category.id"
            style="min-height:50px"
            @end="updateCategory"
          >
            <Cards
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
              @deleteTask="deleteTask"
              @updateTask="updateTask"
              id="cards"
              :user="user"
            >
            </Cards>
          </draggable>
        </div>
      </div>
    </div>
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
            <h6 class="card-header m-0 py-2 pl-3">
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
</template>

<script>
import Cards from '../components/Cards';
import draggable from 'vuedraggable';
export default {
  name: 'Categories',
  components: {
    Cards,
    draggable,
  },
  props: ['user', 'category', 'tasks'],
  computed: {
    filteredTasks() {
      return this.tasks.filter((e) => e.CategoryId == this.category.id);
    },
  },
  data() {
    return {
      showInput: false,
      // showInput: true,
      showAddBtn: true,
      title: '',
      id: null,
      CategoryId: null,
      isEditable: false,
      color: '',
    };
  },
  methods: {
    //categories

    setEditable() {
      this.isEditable = true;
      this.color = 'color:#ff5722';

      const node = this.$refs.editable;
      const range = document.createRange();
      range.setStart(node, 0);
      range.setEnd(node, 1);
      const sel = window.getSelection();
      node.focus();
      sel.removeAllRanges();
      sel.addRange(range);
    },
    onEdit(evt) {
      const tmpName = evt.target.innerText;
      const payload = { id: this.category.id, name: tmpName };
      this.$emit('updateCat', payload);
      this.exitEditor();
    },
    endEdit() {
      this.$refs.editable.blur();
      this.exitEditor();
    },
    exitEditor() {
      this.isEditable = false;
      this.color = '';
    },

    deleteCat() {
      this.$emit('deleteCat', this.category.id);
    },

    //task

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
      this.isCreated = true;
      this.title = '';
      this.showAdd();
    },
    updateTask(payload) {
      this.$emit('updateTask', payload);
    },
    deleteTask(id) {
      this.$emit('deleteTask', id);
    },
    logout() {
      this.$emit('logout');
    },
    checkMove(evt) {
      this.id = evt.draggedContext.element.id;
      this.CategoryId = evt.relatedContext.component.$attrs.CatId;
    },
    updateCategory(evt) {
      const payload = { id: this.id, CategoryId: this.CategoryId };
      this.$emit('updateTaskCategory', payload);
    },
  },
};
</script>

<style>
#btnAdd {
  cursor: pointer !important;
}
#cards {
  cursor: grab;
}
#cards:active {
  cursor: grabbing;
}
#dropdown-cat * {
  background-color: transparent !important;
  color: #dd2c00 !important;
  border: none;
}
.dropdown-toggle::after {
  content: none;
}
</style>
