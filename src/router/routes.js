const MainContainer = () => import("layouts/Main");
const LoginPage = () => import("pages/main/auth/Login");
const HomePage = () => import("pages/main/home/Home");
const Page404 = () => import("pages/Error404");

// Admin
const AdminPage = () => import("pages/main/admin/admin");
const SelfDevPage = () => import("pages/main/admin/modules/self_dev/Index");
const Users = () => import("pages/main/admin/modules/users");
const Roles = () => import("pages/main/admin/modules/roles");
const Menus = () => import("pages/main/admin/modules/menus");
const Dictionaries = () => import("pages/main/admin/modules/Dictionaries");

// Work
const WorkPage = () => import("pages/main/work/Work");
const Assistant = () =>
  import("pages/main/work/modules/pages/assistant/Assistant.vue");
const Chancellary = () =>
  import("pages/main/work/modules/pages/kanselariya/Index.vue");
const ChanReg = () =>
  import(
    "pages/main/work/modules/pages/kanselariya/modules/pages/registration/index.vue"
  );
const Tasks = () => import("pages/main/work/modules/pages/task/index.vue");
const TasksList = () =>
  import("pages/main/work/modules/pages/task/modules/pages/tasklist/List");
const Credit = () => import("pages/main/work/modules/pages/credit/Credit");
const CreditReg = () =>
  import(
    "pages/main/work/modules/pages/credit/pages/registration/Registration.vue"
  );
// Tools
const Tools = () => import("pages/main/tools/Tools");
const Phones = () => import("pages/main/tools/modules/pages/phones/phones");

<<<<<<< HEAD
const routes = [
  {
=======
const It = () => import("pages/main/it/Index");
const Devices = () => import("pages/main/it/devices/Index");

const routes = [{
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
    path: "/",
    redirect: "/home",
    component: MainContainer,
    name: "main",
    meta: {
      requiresAuth: true
    },
<<<<<<< HEAD
    children: [
      {
=======
    children: [{
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
        path: "home",
        name: "Home",
        component: HomePage
      },
      {
        path: "work",
        name: "Work",
        component: WorkPage,
<<<<<<< HEAD
        children: [
          {
=======
        children: [{
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
            path: "assistant",
            name: "Assistant",
            component: Assistant
          },
          {
            path: "chancellary",
            name: "Kanselariya",
            component: Chancellary,
<<<<<<< HEAD
            children: [
              {
                path: "registration",
                name: "Kanselariya Registration",
                component: ChanReg
              }
            ]
=======
            children: [{
              path: "registration",
              name: "Kanselariya Registration",
              component: ChanReg
            }]
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
          },
          {
            path: "task",
            name: "my tasks",
            component: Tasks,
<<<<<<< HEAD
            children: [
              {
                path: "list",
                name: "tasklist",
                component: TasksList
              }
            ]
=======
            children: [{
              path: "list",
              name: "tasklist",
              component: TasksList
            }]
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
          },
          {
            path: "credit",
            name: "Credit",
            component: Credit,
<<<<<<< HEAD
            children: [
              {
                path: "registration",
                name: "registration",
                component: CreditReg
              }
            ]
=======
            children: [{
              path: "registration",
              name: "registration",
              component: CreditReg
            }]
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
          }
        ]
      },
      {
        path: "admin",
        name: "Admin Page",
        component: AdminPage,
<<<<<<< HEAD
        children: [
          {
=======
        children: [{
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
            path: "users",
            name: "Users List",
            component: Users
          },
          {
            path: "roles",
            name: "User Roles",
            component: Roles
          },
          {
            path: "menus",
            name: "Menus List",
            component: Menus
          },
          {
            path: "dictionaries",
            name: "Dictionaries",
            component: Dictionaries
<<<<<<< HEAD
          },
          {
            path: "selfdev",
            name: "SelfDeveloper",
            component: SelfDevPage,
            children: [
              {
                path: "topicpage",
                name: "addEditTopic",
                component: () =>
                  import(
                    "pages/main/admin/modules/self_dev/pages/addEditTopicPage"
                  )
              },
              {
                path: "questionPage",
                name: "addEditQuestion",
                component: () =>
                  import(
                    "pages/main/admin/modules/self_dev/pages/addEditQuestionPage"
                  )
              },
              {
                path: "testPage",
                name: "addEditTest",
                component: () =>
                  import(
                    "pages/main/admin/modules/self_dev/pages/addEditTestPage"
                  )
              },
              {
                path: "monitoringPage",
                name: "addEditMonitoring",
                component: () =>
                  import(
                    "pages/main/admin/modules/self_dev/pages/addEditMonitoringPage"
                  )
              }
            ]
=======
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
          }
        ]
      },
      {
        path: "tools",
        name: "Tools",
        component: Tools,
<<<<<<< HEAD
        children: [
          {
            path: "phones",
            name: "Phones",
            component: Phones
          }
        ]
=======
        children: [{
          path: "phones",
          name: "Phones",
          component: Phones
        }]
      },
      {
        path: "it",
        name: "IT section",
        component: It,
        children: [{
          path: "devices",
          name: "Devices",
          component: Devices
        }]
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
      }
    ]
  },
  {
    path: "/login",
    name: "Login Page",
    component: LoginPage,
    meta: {
      public: true, // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  }
<<<<<<< HEAD
  // , {
  //   path: "*",
  //   name: 'Page Not Found',
  //   component: Page404
  // }
=======
>>>>>>> 8ec4904821b2c103b7cd870d5e8a9559c473af5a
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: Page404
  });
}

export default routes;
