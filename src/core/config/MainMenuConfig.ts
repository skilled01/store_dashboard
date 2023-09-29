export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "Store",
    route: "/store",
    pages: [
      {
        sectionTitle: "Inventory",
        route: "/inventory",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "Categories",
            route: "/categories",
            sub: [
              {
                heading: "All Categories",
                route: "/inventory/categories",
              },
              {
                heading: "Create Category",
                route: "/inventory/categories/create",
              },
            ],
          },
          {
            heading: "Brands",
            route: "/inventory/brands",
          },
          {
            heading: "Taxes",
            route: "/inventory/taxes",
          },
          {
            heading: "Warehouses",
            route: "/inventory/warehouses",
          },
        ],
      },
      {
        sectionTitle: "Products",
        route: "/products",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-person",
        sub: [
          {
            heading: "All Products",
            route: "/products",
          },
          {
            heading: "Create Product",
            route: "/products/create",
          },
        ],
      },
    ],
  },
  {
    heading: "orders",
    route: "/order",
    pages: [
      {
        sectionTitle: "all orders",
        route: "/orders",
        keenthemesIcon: "people",
        bootstrapIcon: "bi-cart",
      },
    ],
  },
  {
    heading: "users",
    route: "/users",
    pages: [
      {
        heading: "Admins",
        route: "/users/admins",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-cart",
      },
      {
        heading: "Customers",
        route: "/users/customers",
        keenthemesIcon: "people",
        bootstrapIcon: "bi-cart",
      },
    ],
  },
  {
    heading: "Theme",
    route: "/theme/about",
    pages: [
      {
        sectionTitle: "About Us",
        route: "/theme/about",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-cart",
        sub: [
          {
            heading: "All Abouts",
            route: "/theme/about",
          },
          {
            heading: "Create",
            route: "/theme/about/create",
          },
        ]
      },
      {
        heading: "Branches",
        route: "/theme/Branches",
        keenthemesIcon: "arrow-mix",
        bootstrapIcon: "bi-cart",
      },
      {
        heading: "Sliders",
        route: "/theme/sliders",
        keenthemesIcon: "arrow-mix",
        bootstrapIcon: "bi-cart",
      },
      {
        heading: "Subscriptions",
        route: "/theme/subscriptions",
        keenthemesIcon: "arrow-mix",
        bootstrapIcon: "bi-cart",
      }
    ],
  },
  {
    heading: "Settings",
    route: "/theme/about",
    pages: [
      {
        heading: "Terms & Conditions",
        route: "/terms",
      },
      {
        heading: "Privacy Policy",
        route: "/privacy-police",
      },
    ],
  },
];

export default MainMenuConfig;
