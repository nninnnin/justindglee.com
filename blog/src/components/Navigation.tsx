import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import clsx from "clsx";

export const routes = {
  tech: { title: "기술", route: "/tech" },
  life: { title: "생활", route: "/life" },
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
    <div className="nav w-full mb-2">
      <ul className="flex pb-3">
        {navItems.map((el, index) => {
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

        <Link
          className="ml-auto font-[500] whitespace-nowrap"
          to="/about"
        >
          <li>저스틴 블로그</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navigation;
