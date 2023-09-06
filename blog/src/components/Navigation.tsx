import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import clsx from "clsx";

export const routes = {
  about: { title: "소개", route: "/about" },
  bar1: { title: "", route: "" },
  tech: { title: "포스트", route: "/posts" },
  // life: { title: "생활", route: "/life" },
  bar2: { title: "", route: "" },
  reference: { title: "자료실", route: "/reference" },
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
    <div className="nav w-full mb-2 sticky top-0 z-10">
      <ul className="flex pb-3">
        <li className="mr-auto flex">
          <Link
            className={clsx(
              "font-[500] whitespace-nowrap mr-3"
            )}
            to="/"
          >
            <li>저스틴 블로그</li>
          </Link>
        </li>

        {navItems.map((el, index) => {
          if (!el.title && !el.route)
            return (
              <span className="mr-3 select-none">|</span>
            );

          return (
            <Link
              className={clsx(
                "mr-3",
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

export default Navigation;
