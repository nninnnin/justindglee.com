import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link } from "gatsby";

function Navigation() {
  const [navItems, setNavItems] = useState([
    { id: "", title: "기술", route: "/tech" },
    { id: "", title: "생활", route: "/life" },
  ]);

  useEffect(() => {
    setNavItems(navItems.map((el) => ({ ...el, id: uuidv4() })));
  }, []);

  return (
    <div className="p-[20px] bg-transparent text-grey w-full">
      <Link to={"/"}>
        <span className="text-2xl font-bold">저스틴 블로그</span>
      </Link>

      <ul className="mt-3">
        {navItems.map((el, index) => {
          return (
            <Link key={el.id ? el.id : index} to={el.route}>
              <li className="hover:bg-white hover:text-black cursor-pointer">
                {el.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Navigation;
