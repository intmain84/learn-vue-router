import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./components/UI/NotFound.vue";

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
      // children: [{ path: ":teamId", component: TeamMembers, props: true }],
    },
    { path: "/users", component: UsersList },
    {
      name: "team-members",
      path: "/teams/:teamId",
      component: TeamMembers,
      props: true,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  linkActiveClass: "active",
});

app.use(router);

app.mount("#app");
