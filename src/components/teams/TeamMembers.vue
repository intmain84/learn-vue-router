<template>
  <button @click="saveCHanges">Save</button>
  <div v-if="error">{{ error }}</div>
  <section v-else>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link v-for="team in nearTeams" :key="team" :to="team"
      >Go to team {{ team.slice(-1) }}
    </router-link>
  </section>
</template>
<!-- <template>
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
    <router-link v-for="team in nearTeams" :key="team" :to="team"
      >Go to team {{ team.slice(-1) }}
    </router-link>
  </section>
</template> -->

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
      error: null,
      members: [],
      teamName: "",
      nearTeams: [],
      resSaved: false,
    };
  },

  beforeRouteLeave(to, from, next) {
    if (this.resSaved) {
      next();
    } else {
      const data = confirm("Are u sure you want to left form?");
      next(data);
    }
  },

  methods: {
    saveCHanges() {
      this.saveCHanges = true;
    },

    getIds(allTeams = this.teams, currentId = this.teamId) {
      const pages = allTeams.length;

      const selectedTeamsId = allTeams.map((team) => team.id);
      const currentPage = selectedTeamsId.indexOf(currentId) + 1;

      //First page
      if (currentPage === 1 && pages > 1) {
        const id = selectedTeamsId.indexOf(currentId) + 1;

        this.nearTeams = [selectedTeamsId[id]];
      }

      //Last page
      if (currentPage === pages && currentPage !== 1) {
        const id = selectedTeamsId.indexOf(currentId) - 1;
        this.nearTeams = [selectedTeamsId[id]];
      }

      //Mid pages
      if (currentPage !== pages && currentPage !== 1) {
        const id = selectedTeamsId.indexOf(currentId);
        this.nearTeams = [selectedTeamsId[id - 1], selectedTeamsId[id + 1]];
      }
    },

    setRoute(id) {
      const selectedTeam = this.teams.find((team) => team.id === id);

      if (!selectedTeam) {
        this.error = "Team not found";
        return;
      }

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
    this.getIds();

    //Один способ
    // this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     previousParams + "asd";
    //     this.setRoute(toParams.teamId);
    //   }
    // );
  },

  watch: {
    teamId(newId) {
      this.getIds(undefined, newId);

      //Второй способ
      this.setRoute(newId);
    },
  },
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
