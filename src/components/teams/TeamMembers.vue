<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t1">Go to team 1</router-link>
  </section>
</template>

<script>
import UserItem from "../users/UserItem.vue";

export default {
  inject: ["users", "teams"],
  props: ["teamId"],
  components: {
    UserItem,
  },

  data() {
    return {
      members: [],
      teamName: "",
    };
  },

  methods: {
    setRoute(id) {
      const selectedTeam = this.teams.find((team) => team.id === id);

      const selectedMembers = selectedTeam.members;
      const members = [];
      for (const member in selectedMembers) {
        const person = this.users.find(
          (person) => person.id === selectedMembers[member]
        );
        members.push(person);
      }
      this.members = members;
      this.teamName = selectedTeam.name;
    },
  },

  created() {
    this.setRoute(this.teamId);

    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        previousParams + "asd";
        this.setRoute(toParams.teamId);
      }
    );
  },

  // watch: {
  //   teamId(newId) {
  //     console.log(newId);
  //     this.setRoute(newId);
  //   },
  // },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
