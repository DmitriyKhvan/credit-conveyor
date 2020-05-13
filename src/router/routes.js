const MainContainer = () => import("layouts/Main");
const LoginPage = () => import("pages/main/auth/Login");
const HomePage = () => import("pages/main/home/Home");

const Page404 = () => import("pages/extras/Error404");

// Admin
const AdminPage = () => import("pages/main/admin/admin");
const Users = () => import("pages/main/admin/users/Users");
const Roles = () => import("pages/main/admin/roles/Roles");
const Menus = () => import("pages/main/admin/menus/Menus");
const Moderators = () => import("pages/main/admin/moderators/Moderators");
const Dictionaries = () => import("pages/main/admin/dictionaries/Dictionaries");
const SelfDevPage = () => import("pages/main/admin/self_dev/Index");

// Work
const WorkPage = () => import("pages/main/work/Work");
const Assistant = () =>
  import("pages/main/work/assistant/Assistant.vue");
const Profile = () => import("pages/main/profile/Profile.vue");
const MyData = () => import("pages/main/profile/mydata/MyData.vue");
const MyFinance = () => import("pages/main/profile/myfinance/MyFinance.vue");
// chancellary
const Chancellary = () =>
  import("pages/main/work/kanselariya/Chancellary.vue");
const ChanRegistration = () =>
  import(
    "pages/main/work/kanselariya/registration/Registration"
  );
const Tasks = () => import("pages/main/work/task/index.vue");
const TasksList = () =>
  import("pages/main/work/task/modules/pages/tasklist/List");

// Credit
const Credit = () => import("pages/main/work/credit/Credit");

const CreditReg = () =>
  import(
    "pages/main/work/credit/pages/registration/Registration.vue"
  );
const CreditProfile = () =>
  import("pages/main/work/credit/pages/profile/Profile.vue");
const CreditApplications = () =>
  import("pages/main/work/credit/pages/list/Applications.vue");
const CreditTasks = () =>
  import("pages/main/work/credit/pages/list/Tasks.vue");
const CreditTask = () =>
  import("pages/main/work/credit/pages/list/Task.vue");

// Tools
const Tools = () => import("pages/main/tools/Tools");
const Phones = () => import("pages/main/tools/phones/phones");

const It = () => import("pages/main/it/It");
const Devices = () => import("pages/main/it/devices/Devices");
const DevicesAccounting = () => import("pages/main/it/accounting/Accounting");
const DevicesHistory = () => import("pages/main/it/history/History");
const DevicesMonitoring = () => import("pages/main/it/monitoring/Users");
// Education

const TestList = () => import("pages/main/test/TestList.vue");
const Topic = () => import("pages/main/test/Topic.vue");
const CompleteTest = () => import("pages/main/test/CompleteTest.vue");

//Chat
const ChatIndexPage = () => import('pages/main/chat/Index');
const Notifications = () => import('pages/main/chat/notification/Notification');
const ChatPage = () => import("pages/main/chat/Chat");

// Проверка на BPM token
const ifAuthenticated = (to, from, next) => {
  if (sessionStorage.getItem("csrf_token")) {
    next();
    return;
  }
  next("/work/credit");
};

const routes = [{
  path: "/",
  redirect: "/home",
  component: MainContainer,
  name: "Main",
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
        component: ChanRegistration
      }]
    },
    {
      path: "task",
      name: "My Tasks",
      component: Tasks,
      children: [{
        path: "list",
        name: "Task List",
        component: TasksList
      }]
    },
    {
      path: "credit",
      name: "Credit",
      component: Credit,
      children: [{
        path: "applications",
        name: "CreditApplications",
        component: CreditApplications
      },
      {
        path: "tasks",
        name: "CreditTasks",
        component: CreditTasks
      },
      {
        path: "sub/task/:id",
        name: "CreditTask",
        component: CreditTask
        //beforeEnter: ifAuthenticated,
      },
      {
        path: "registration",
        name: "Registration",
        component: CreditReg
      },
      {
        path: "sub/profile",
        name: "Profile",
        component: CreditProfile,
        beforeEnter: ifAuthenticated
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
      path: "moderator",
      name: "Moderators",
      component: Moderators
    },
    {
      path: "dictionaries",
      name: "Dictionaries",
      component: Dictionaries
    },
    {
      path: "selfdev",
      name: "Self Developer",
      component: SelfDevPage
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
    path: "profile",
    name: "Profile Page",
    component: Profile,
      children: [{
        path: "mydata",
        name: "My Data",
        component: MyData
      },
      {
        path: "myfinance",
        name: "My Finance",
        component: MyFinance
      },
    ]
  },
  {
    path: "it",
    name: "IT section",
    component: It,
    children: [{
      path: "devices",
      name: "Devices",
      component: Devices
    },
    {
      path: "pcinfo",
      name: "Devices Accounting",
      component: DevicesAccounting
    },
    {
      path: "history",
      name: "Devices History",
      component: DevicesHistory
    },
    {
      path: "monitoring",
      name: "Devices Monotoring",
      component: DevicesMonitoring
    }
    ]
  },
  {
    path: "chat",
    name: "Chat Page",
    component: ChatIndexPage,
    children: [{
      path: "notification",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "mainchat",
      name: "Main Chat",
      component: ChatPage
    },

    ]
  },
  {
    path: "selfdev",
    name: "Test List",
    component: TestList
  },
  {
    path: "completeTest",
    name: "Complete Test",
    component: CompleteTest,
    props: true
  },
  {
    path: "topic/:id",
    name: "Topic",
    component: Topic
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
},

{
  path: "/404",
  name: "Page404",
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
