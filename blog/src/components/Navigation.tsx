import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import clsx from "clsx";

export const routes = {
  posts: { title: "기술", route: "/tech" },
  bar1: { title: "", route: "" },
  idea: { title: "아이디어", route: "/idea" },
  bar2: { title: "", route: "" },
  life: { title: "사는 이야기", route: "/life" },
  bar3: { title: "", route: "" },
  archive: { title: "Archives", route: "/archive" },
  // portfolio: { title: "작업물", route: "/portfolio" },
};

function Navigation({
  className = "",
}: {
  className?: string;
}) {
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
      navItems.map((item) => ({ ...item, id: uuidv4() }))
    );
  }, []);

  const { pathname } = useLocation();

  return (
    <div
      className={clsx(
        "nav w-full sticky top-0 left-0 z-10",
        "text-[0.8em]",
        className
      )}
    >
      <ul className="flex">
        <Link
          className={clsx(
            "font-[500] whitespace-nowrap mr-auto",
            pathname === "/" && "underline"
          )}
          to="/"
        >
          <li>이동규 블로그</li>
        </Link>

        {navItems.map(({ id, title, route }, index) => {
          const isBar = !title && !route;

          if (isBar)
            return (
              <Navigation.ItemSeperator key={id ?? index} />
            );

          return (
            <Link
              className={clsx(
                pathname.includes(route) && "underline"
              )}
              key={id ?? index}
              to={route}
            >
              <li className="cursor-pointer">{title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

Navigation.ItemSeperator = () => {
  return (
    <span
      className={clsx("mx-1", "select-none opacity-[0.5]")}
    >
      /
    </span>
  );
};

export default Navigation;
