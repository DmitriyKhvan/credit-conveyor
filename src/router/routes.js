const MainContainer = () => import("layouts/Main");
const LoginPage = () => import("pages/main/auth/Login");
const HomePage = () => import("pages/main/home/Home");
const Page404 = () => import("pages/Error404");

// Admin
const AdminPage = () => import("pages/main/admin/admin");
const Users = () => import("pages/main/admin/users/Users");
const Roles = () => import("pages/main/admin/roles/Roles");
const Menus = () => import("pages/main/admin/menus/Menus");
const Dictionaries = () => import("pages/main/admin/dictionaries/Dictionaries");
const SelfDevPage = () => import("pages/main/admin/self_dev/Index");

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
const CreditReg = () => import("pages/main/work/modules/pages/credit/pages/registration/Registration.vue");
const CreditProfile = () => import("pages/main/work/modules/pages/credit/pages/profile/Profile.vue");
const Applications = () => import("pages/main/work/modules/pages/credit/pages/list/Applications.vue");
const TaskQueue = () => import("pages/main/work/modules/pages/credit/pages/list/Tasks.vue");

//const CreditManagerCabinet = () => import("pages/main/work/modules/pages/credit/pages/cabinet/creditManager/TaskList.vue");
const CreditCommiteeTask = () => import("pages/main/work/modules/pages/credit/pages/cabinet/creditCommittee/Task.vue");
const TestList = () => import("pages/main/work/modules/pages/test/TestList.vue");
const Topic = () => import("pages/main/work/modules/pages/test/Topic.vue");
const CompleteTest = () => import("pages/main/work/modules/pages/test/CompleteTest.vue");

// Tools
const Tools = () => import("pages/main/tools/Tools");
const Phones = () => import("pages/main/tools/modules/pages/phones/phones");

const It = () => import("pages/main/it/Index");
const Devices = () => import("pages/main/it/devices/Index");

//education
const TopicPage = () =>
  import("pages/main/admin/self_dev/topics/Topics");
const QuestionPage = () =>
  import("pages/main/admin/self_dev/questions/Questions");
const TestPage = () =>
  import("pages/main/admin/self_dev/tests/Tests");
const MonitoringPage = () =>
  import("pages/main/admin/modules/self_dev/pages/addEditMonitoringPage");

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
            children: [{
                path: "applications",
                name: "applications",
                component: Applications
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
                path: 'profile',
                name: 'profile',
                component: CreditProfile
              }
            ]
          }
        ]
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
          },
          {
            path: "selfdev",
            name: "SelfDeveloper",
            component: SelfDevPage,
            children: [{
                path: "topicPage",
                name: "addEditTopic",
                component: TopicPage
              },
              {
                path: "questionPage",
                name: "addEditQuestion",
                component: QuestionPage
              },
              {
                path: "testPage",
                name: "addEditTest",
                component: TestPage
              },
              {
                path: "monitoringPage",
                name: "addEditMonitoring",
                component: MonitoringPage
              }
            ]
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
  },
  {
    path: "/404",
    name: "Login Page",
    component: Page404,
    meta: {
      public: true
    }
  }

];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: Page404
  });
}

export default routes;
