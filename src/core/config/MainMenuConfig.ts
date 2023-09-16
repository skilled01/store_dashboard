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
                route: "/store/categories",
              },
              {
                heading: "Create Category",
                route: "/store/categories",
              },
            ],
          },
          {
            sectionTitle: "wizards",
            route: "/wizard",
            sub: [
              {
                heading: "horizontal",
                route: "/crafted/pages/wizards/horizontal",
              },
              {
                heading: "vertical",
                route: "/crafted/pages/wizards/vertical",
              },
            ],
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
            route: "/store/products",
          },
          {
            heading: "Create Product",
            route: "/store/products",
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
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-cart",
      },
    ],
  },
  {
    heading: "users",
    route: "/order",
    pages: [
      {
        sectionTitle: "admins",
        route: "/users/admin",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-cart",
      },
      {
        sectionTitle: "Customers",
        route: "/users/customers",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-cart",
      },
    ],
  },
  {
    heading: "theme",
    route: "/order",
    pages: [
      {
        sectionTitle: "admins",
        route: "/users/admin",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-cart",
      },
      {
        sectionTitle: "Customers",
        route: "/users/customers",
        keenthemesIcon: "abstract-38",
        bootstrapIcon: "bi-cart",
      },
    ],
  },
];

export default MainMenuConfig;
