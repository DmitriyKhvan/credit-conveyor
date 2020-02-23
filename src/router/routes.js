const MainContainer = () => import("layouts/Main");
const LoginPage = () => import("pages/main/auth/Login");
const HomePage = () => import("pages/main/home/Home");
const Page404 = () => import("pages/Error404");

// Admin
const AdminPage = () => import("pages/main/admin/admin");
const Users = () => import("pages/main/admin/modules/users");
const Roles = () => import("pages/main/admin/modules/roles");
const Menus = () => import("pages/main/admin/modules/menus");
const Dictionaries = () => import("pages/main/admin/modules/Dictionaries");

// Work
const WorkPage = () => import("pages/main/work/Work");
const Assistant = () => import("pages/main/work/modules/pages/assistant/Assistant.vue");
const Chancellary = () => import("pages/main/work/modules/pages/kanselariya/Index.vue");
const ChanReg = () => import("pages/main/work/modules/pages/kanselariya/modules/pages/registration/index.vue");
const Tasks = () => import("pages/main/work/modules/pages/task/index.vue");
const TasksList = () => import("pages/main/work/modules/pages/task/modules/pages/tasklist/List");
const Credit = () => import("pages/main/work/modules/pages/credit/Credit");
const CreditReg = () => import("pages/main/work/modules/pages/credit/pages/registration/Registration.vue");
const CreditProfile = () => import("pages/main/work/modules/pages/credit/pages/profile/Profile.vue");
const Applicaion = () => import("pages/main/work/modules/pages/credit/pages/list/Application.vue");
const TaskQueue = () => import("pages/main/work/modules/pages/credit/pages/list/Tasks.vue");

//const CreditManagerCabinet = () => import("pages/main/work/modules/pages/credit/pages/cabinet/creditManager/TaskList.vue");
const CreditCommiteeTask = () => import("pages/main/work/modules/pages/credit/pages/cabinet/creditCommittee/Task.vue");
const TestList = () => import("pages/main/work/modules/pages/test/TestList.vue");
const Topic = () => import("pages/main/work/modules/pages/test/Topic.vue");
const CompleteTest = () => import("pages/main/work/modules/pages/test/CompleteTest.vue");

// Tools
const Tools = () => import("pages/main/tools/Tools");
const Phones = () => import("pages/main/tools/modules/pages/phones/phones");


const routes = [{
  path: "/",
  redirect: "/home",
  component: MainContainer,
  name: "main",
  meta: {
    requiresAuth: true
  },
  children: [{
    path: "home",
    name: "Home",
    component: HomePage
  },
  {
    path: "work",
    name: "Work",
    component: WorkPage,
    children: [{
      path: "assistant",
      name: "Assistant",
      component: Assistant
    },
    {
      path: "chancellary",
      name: "Kanselariya",
      component: Chancellary,
      children: [{
        path: "registration",
        name: "Kanselariya Registration",
        component: ChanReg
      }]
    },
    {
      path: "task",
      name: "my tasks",
      component: Tasks,
      children: [{
        path: "list",
        name: "tasklist",
        component: TasksList
      }]
    },
    {
      path: "credit",
      name: "Credit",
      component: Credit,
      children: [
        {
          path: "application",
          name: "application",
          component: Applicaion
        },
        {
          path: "taskQueue",
          name: "taskQueue",
          component: TaskQueue
        },
        {
          path: "creditCommiteeTask",
          name: "CreditCommiteeTask",
          component: CreditCommiteeTask
        },
        {
        path: "registration",
        name: "registration",
        component: CreditReg
        },
        {
          path: '/work/credit/profile',
          name: 'profile',
          component: CreditProfile
        }
      ]
    }
    
    ]
  },
  {
    path: "selfdev",
    name: "TestList",
    component: TestList
  },
  {
    path: "completeTest",
    name: "CompleteTest",
    component: CompleteTest,
    props: true
  },
  {
    path: "topic/:id",
    name: "Topic",
    component: Topic,
  },
  {
    path: "admin",
    name: "Admin Page",
    component: AdminPage,
    children: [{
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
    }
    ]
  },
  {
    path: "tools",
    name: "Tools",
    component: Tools,
    children: [{
      path: "phones",
      name: "Phones",
      component: Phones
    }]
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
  // , {
  //   path: "*",
  //   name: 'Page Not Found',
  //   component: Page404
  // }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: Page404
  });
}


export default routes;
