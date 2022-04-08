<template>
  <div />
</template>

<script>
import socket from "../../socket/socket";

export default {
  name: "IdeaComment",

  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.viewIdea();
  },
  methods: {
    // component did mount
    viewIdea() {
      const ideaId = id();
      const payload = { ideaId: ideaId };
      socket.emit("idea", payload);
    },

    // onClick send comment or enter comment
    sendComment() {
      const ideaId = id();
      const payload = {
        ideaId: ideaId,
        commentContent: "abc",
        isAnonymous: true,
      };
      socket.emit("comment:create", payload);

      socket.on("renderComment", (payload) => {
        console.log(payload);
        // then renderComent
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
