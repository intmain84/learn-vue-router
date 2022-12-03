import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./components/UI/NotFound.vue";
import UsersFooter from "./components/users/UserFooter.vue";
import TeamsFooter from "./components/teams/TeamsFooter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //Можем редиректиться с корня на teams либо так:
    // { path: "/", redirect: "/teams" },

    //Либо с помощью алиаса:

    {
      path: "/teams",
      components: { default: TeamsList, footer: TeamsFooter },
      alias: "/",
      // children: [{ path: ":teamId", component: TeamMembers, props: true }],
    },
    { path: "/users", components: { default: UsersList, footer: UsersFooter } },
    {
      name: "team-members",
      path: "/teams/:teamId",
      component: TeamMembers,
      props: true,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
});

// router.beforeEach(function (to, from, next) {
//   if (to.name === "team-members") {
//     next();
//   } else {
//     next({ name: "team-members", params: { teamId: "t2" } });
//   }
// });

const app = createApp(App);

app.use(router);

app.mount("#app");
