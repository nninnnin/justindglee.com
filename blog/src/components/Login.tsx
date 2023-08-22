import React, { useState, MouseEvent } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const identifyUser = async (
    identifier: string,
    password: string
  ): Promise<{
    user: { blocked: boolean; confirmed: boolean };
    jwt: string;
  }> => {
    const result = await axios.post(
      `${process.env.GATSBY_STRAPI_API_URL}/api/auth/local`, // local은 auth provider를 의미
      {
        identifier,
        password,
      }
    );

    return result.data;
  };

  const handleLoginButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const { jwt, user } = await identifyUser(email, password);

      if (!jwt || user.blocked || !user.confirmed) {
        const e = new Error("유효한 유저 정보를 가져오지 못했습니다..");
        e.name = "로그인 에러";

        throw e;
      }

      alert(`로그인 성공!`);

      localStorage.setItem("justinblog-token", jwt);
    } catch (error) {
      console.log(error);

      alert("로그인에 실패했습니다..");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-slate-600 select-none">
      <form className="bg-red-400 text-white fixed z-1 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] p-3">
        <div>
          <label className="inline-block min-w-[65px] mr-3" htmlFor="email">
            아이디
          </label>

          <input
            className="text-red-400 p-1 pl-2 outline-none"
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>

        <div className="mt-3">
          <label className="inline-block min-w-[65px] mr-3" htmlFor="password">
            비밀번호
          </label>

          <input
            className="text-red-400 p-1 pl-2 outline-none"
            type="text"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <button
          type="submit"
          onClick={handleLoginButtonClick}
          className="absolute right-0 bottom-0 w-full translate-y-[120%] p-5 text-red-50 bg-blue-400 font-bold"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
