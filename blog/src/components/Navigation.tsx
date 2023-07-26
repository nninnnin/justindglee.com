import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "gatsby";

export const routes = {
  tech: { title: "기술", route: "/tech" },
  life: { title: "생활", route: "/life" },
  reference: { title: "자료실", route: "/reference" },
  // portfolio: { title: "작업물", route: "/portfolio" },
};

function Navigation() {
  const [navItems, setNavItems] = useState<
    Array<{ id: null | string; title: string; route: string }>
  >(Object.values(routes).map((route) => ({ id: null, ...route })));

  useEffect(() => {
    setNavItems(navItems.map((el) => ({ ...el, id: uuidv4() })));
  }, []);

  return (
    <div className="nav glassmorph text-grey font-[500] w-full h-full p-[20px]">
      <Link to={"/"}>
        <span className="logo text-2xl">저스틴 블로그</span>
      </Link>

      <ul className="mt-5">
        {navItems.map((el, index) => {
          return (
            <div key={el.id ?? index}>
              <hr />
              <Link to={el.route}>
                <li className="cursor-pointer py-3">{el.title}</li>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Navigation;
