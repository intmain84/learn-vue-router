import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //Можем редиректиться с корня на teams либо так:
    // { path: "/", redirect: "/teams" },

    //Либо с помощью алиаса:
    {
      path: "/teams",
      component: TeamsList,
      alias: "/",
      children: [{ path: ":teamId", component: TeamMembers, props: true }],
    },
    { path: "/users", component: UsersList },
    { path: "/", component: TeamsList, redirect: "/teams" },
  ],
  linkActiveClass: "active",
});

app.use(router);

app.mount("#app");
