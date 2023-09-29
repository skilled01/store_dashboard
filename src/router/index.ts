import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },

      {
        path: "/inventory",
        name: "Inventory",
        meta: {
          breadcrumbs: ["Inventory"],
        },
        children: [
          {
            path: "categories",
            name: "categories",
            meta: {
              pageTitle: "Categories",
            },
            children: [
              {
                path: "",
                name: "all categories",
                component: () => import("@/views/Categories/Categories.vue"),
                meta: {
                  pageTitle: "Categories",
                },
              },
              {
                path: "create",
                name: "create category",
                component: () => import("@/views/Categories/create.vue"),
                meta: {
                  pageTitle: "Create Category",
                },
              }
            ]
          },

          {
            path: "brands",
            name: "brands",
            component: () => import("@/views/Brands.vue"),
            meta: {
              pageTitle: "Brands",
            },
          },
          {
            path: "taxes",
            name: "taxes",
            component: () => import("@/views/Taxes.vue"),
            meta: {
              pageTitle: "Taxes",
            },
          },
          {
            path: "warehouses",
            name: "warehouses",
            component: () => import("@/views/Warehouses.vue"),
            meta: {
              pageTitle: "Warehouses",
            },
          },
        ]
      },
      {
        path: "/products",
        name: "Products",
        meta: {
          breadcrumbs: ["Products"],
        },
        children: [
          {
            path: "",
            name: "all products",
            component: () => import("@/views/Products/products.vue"),
            meta: {
              pageTitle: "Products",
            },
          },
          {
            path: "create",
            name: "create product",
            component: () => import("@/views/Products/create.vue"),
            meta: {
              pageTitle: "Create Product",
            },
          },
          {
            path: ":id/edit",
            name: "update-product",
            component: () => import("@/views/Products/create.vue"),
            meta: {
              pageTitle: "Update Product",
            },

          }
        ]

      },

      {
        path: "/users/",
        name: "Users",
        meta: {
          breadcrumbs: ["Users"],
        },
        children: [
          {
            path: "admins",
            name: "admins",
            component: () => import("@/views/users/Admins.vue"),
            meta: {
              pageTitle: "Admins",
            },
          },
          {
            path: "customers",
            name: "customers",
            component: () => import("@/views/users/Customers.vue"),
            meta: {
              pageTitle: "Customers",
            },
          },
        ]
      },

      {
        path: "/theme/",
        name: "Theme",
        meta: {
          breadcrumbs: ["Theme"],
        },
        children: [
          {
            path: "about",
            name: "about",
            meta: {
              pageTitle: "About",
              breadcrumbs: ["Theme", "About"],
            },
            children: [
              {
                path: "",
                name: "all",
                component: () => import("@/views/About/About.vue"),
              },
              {
                path: "create",
                name: "add section",
                component: () => import("@/views/About/create.vue"),
                meta: {
                  pageTitle: "Add About Section",
                },
              },
            ]
          },
          {
            path: "branches",
            name: "Branches",
            component: () => import("@/views/Branches/Branches.vue"),
            meta: {
              pageTitle: "Branches",
            },
          },
          {
            path: "sliders",
            name: "Sliders",
            meta: {
              pageTitle: "Sliders",
              breadcrumbs: ["Theme", "Sliders"],
            },
            children: [
              {
                path: "",
                name: "all Sliders",
                component: () => import("@/views/Sliders/Sliders.vue"),
                meta: {
                  pageTitle: "Sliders",
                },
              },
              {
                path: "create",
                name: "create_slider",
                component: () => import("@/views/Sliders/Form.vue"),
                meta: {
                  pageTitle: "Slider Form",
                },
              },
            ]
          },

          {
            path: "subscriptions",
            name: "Subscriptions",
            component: () => import("@/views/Subscriptions.vue"),
            meta: {
              pageTitle: "Subscriptions",
            },
          }
        ]
      },

      {
        path: "/terms",
        name: "terms",
        component: () => import("@/views/Terms.vue"),
        meta: {
          pageTitle: "Terms",
          breadcrumbs: ["Terms"],
        },
      },

      {
        path: "/privacy-police",
        name: "privacy policy",
        component: () => import("@/views/Policy.vue"),
        meta: {
          pageTitle: "Privacy Policy",
          breadcrumbs: ["Privacy Policy"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
