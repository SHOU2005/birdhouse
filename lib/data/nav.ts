export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  children?: { city: string; links: NavChild[] }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "City",
    href: "/cities/gurgaon",
    children: [
      {
        city: "Gurgaon",
        links: [
          { label: "1 RK", href: "/properties/1rk" },
          { label: "1 BHK", href: "/properties/1bhk" },
          { label: "2 BHK", href: "/properties/2bhk" },
          { label: "3 BHK", href: "/properties/3bhk" },
          { label: "Co-Living", href: "/properties/co-living" },
          { label: "Co-Working Space", href: "/properties/co-working" },
        ],
      },
      {
        city: "New Delhi",
        links: [
          { label: "Student Housing", href: "/properties/student-housing" },
          { label: "Girls Hostel", href: "/properties/girls-hostel" },
          { label: "Boys Hostel", href: "/properties/boys-hostel" },
        ],
      },
    ],
  },
  { label: "Broker Partnership", href: "/broker-partnership" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];
