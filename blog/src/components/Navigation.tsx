import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import clsx from "clsx";

export const routes = {
  posts: { title: "Posts", route: "/posts" },
  // life: { title: "생활", route: "/life" },
  bar2: { title: "", route: "" },
  archive: { title: "Archive", route: "/archive" },
  // portfolio: { title: "작업물", route: "/portfolio" },
};

function Navigation() {
  const [navItems, setNavItems] = useState<
    Array<{
      id: null | string;
      title: string;
      route: string;
    }>
  >(
    Object.values(routes).map((route) => ({
      id: null,
      ...route,
    }))
  );

  useEffect(() => {
    setNavItems(
      navItems.map((el) => ({ ...el, id: uuidv4() }))
    );
  }, []);

  const { pathname } = useLocation();

  return (
    <div className="nav w-full mb-2 sticky top-0 left-0 z-10">
      <ul className="flex mb-3">
        <Link
          className={clsx(
            "font-[500] whitespace-nowrap mr-auto",
            pathname === "/" && "underline"
          )}
          to="/"
        >
          <li>이동규 블로그</li>
        </Link>

        {navItems.map((el, index) => {
          if (!el.title && !el.route)
            return (
              <Navigation.ItemSeperator
                key={el.id ?? index}
              />
            );

          return (
            <Link
              className={clsx(
                pathname.includes(el.route) && "underline"
              )}
              key={el.id ?? index}
              to={el.route}
            >
              <li className="cursor-pointer">{el.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

Navigation.ItemSeperator = () => {
  return <span className="mx-3 select-none">|</span>;
};

export default Navigation;
