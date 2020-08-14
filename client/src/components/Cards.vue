<template>
  <div>
    <div class="my-2">
      <div class="bg-white shadow-sm rounded-lg p-2">
        <h5 class="d-flex justify-content-between card-title">
          {{ task.title }}
          <div>
            <b-icon-pencil-square style="cursor:pointer"></b-icon-pencil-square>
            <b-icon-bucket
              @click="deleteTask"
              class="ml-2"
              style="cursor:pointer"
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
  </div>
</template>

<script>
export default {
  computed: {
    getTime() {
      const time = this.task.createdAt;
      return `${new Date(time).toLocaleString()}`;
    },
  },
  props: ['task'],
  methods: {
    deleteTask() {
      console.log(this.task.id);
      this.$emit('deleteTask', this.task.id)
    },
  },
};
</script>

<style></style>
