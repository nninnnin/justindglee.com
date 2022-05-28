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
    <div className="bg-black text-white w-[200px]">
      <span className="text-2xl">저스틴 블로그</span>
      <ul>
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
