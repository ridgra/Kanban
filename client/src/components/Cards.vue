<template>
  <div class="my-2">
    <div
      class="bg-white shadow-sm rounded-lg p-2"
      :style="user.id == task.UserId ? { border: '2px solid #ff5722' } : {}"
    >
      <h5 class="d-flex align-items-start justify-content-between card-title">
        <div
          id="title"
          class="col-9"
          ref="editable"
          :contenteditable="isEditable"
          @blur="onEdit"
          :style="color"
          @keydown.enter="endEdit"
        >
          {{ task.title }}
        </div>
        <div>
          <b-icon-pencil-square
            @click="setEditable"
            style="cursor:pointer;font-size:0.8em"
            class="text-primary"
          ></b-icon-pencil-square>

          <b-icon-bucket
            @click="deleteTask"
            class="ml-2 text-primary"
            style="cursor:pointer;font-size:0.8em"
          ></b-icon-bucket>
        </div>
      </h5>
      <p class="card-text font-weight-light mb-0" style="font-size: small;">
        By {{ task.User.email }}
      </p>
      <p class="card-text font-weight-light" style="font-size: small;">
        {{ 'At ' + getTime }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user', 'task'],
  data() {
    return {
      isEditable: false,
      color: '',
    };
  },
  computed: {
    getTime() {
      const time = this.task.updatedAt;
      return `${new Date(time).toLocaleString()}`;
    },
  },
  methods: {
    deleteTask() {
      this.$emit('deleteTask', this.task.id);
    },
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
      const tmpTitle = evt.target.innerText;
      const payload = { id: this.task.id, title: tmpTitle };
      console.log(tmpTitle);
      this.$emit('updateTask', payload);
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
  },
};
</script>

<style>
#title {
  cursor: text;
}
</style>
