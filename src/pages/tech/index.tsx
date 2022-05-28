import React from "react";
import Navigation from "@components/Navigation";
import "@styles/index.scss";

const imageUrls = [
  "https://i.ibb.co/J7s6VH7/273.jpg",
  "https://i.ibb.co/mNJDB9k/271.jpg",
  "https://i.ibb.co/Tk84jxD/266.jpg",
  "https://i.ibb.co/1T2h8f8/263.jpg",
  "https://i.ibb.co/WtFkf3h/251.jpg",
  "https://i.ibb.co/gWvLZVx/248.jpg",
  "https://i.ibb.co/y4SkFhM/234.jpg",
  "https://i.ibb.co/BgktbQy/230.jpg",
  "https://i.ibb.co/30rWy1z/226.jpg",
  "https://i.ibb.co/607thfd/222.jpg",
  "https://i.ibb.co/FmzjDQW/218.jpg",
  "https://i.ibb.co/xsmHQ9f/215.jpg",
  "https://i.ibb.co/zGnmQhK/213.jpg",
  "https://i.ibb.co/gD2Nt0R/208.jpg",
  "https://i.ibb.co/5vKSKYN/206.jpg",
  "https://i.ibb.co/rm4T4D1/201.jpg",
  "https://i.ibb.co/p3LwC1R/196.jpg",
  "https://i.ibb.co/TMY4zYr/185.jpg",
  "https://i.ibb.co/MN6ZkwF/184.jpg",
  "https://i.ibb.co/fdhwzdY/180.jpg",
  "https://i.ibb.co/FXwGYQk/179.jpg",
  "https://i.ibb.co/J72hnvP/174.jpg",
  "https://i.ibb.co/PwDYMpH/173.jpg",
  "https://i.ibb.co/b6CCj80/171.jpg",
  "https://i.ibb.co/q1FfDZy/170.jpg",
  "https://i.ibb.co/7YX55ys/162.jpg",
  "https://i.ibb.co/J7cK054/160.jpg",
  "https://i.ibb.co/chyCxZ9/158.jpg",
  "https://i.ibb.co/YL7jx24/156.jpg",
  "https://i.ibb.co/YhpR7T1/151.jpg",
  "https://i.ibb.co/bXXJsvH/147.jpg",
  "https://i.ibb.co/BqkD7c8/143.jpg",
  "https://i.ibb.co/564TskD/125.jpg",
  "https://i.ibb.co/3k6n26n/124.jpg",
  "https://i.ibb.co/bX9sNWw/121.jpg",
  "https://i.ibb.co/zn6rKMG/115.jpg",
  "https://i.ibb.co/fHGxYzV/114.jpg",
  "https://i.ibb.co/98wky86/113.jpg",
  "https://i.ibb.co/3mZqYCL/112.jpg",
  "https://i.ibb.co/4YW0PTJ/111.jpg",
  "https://i.ibb.co/xqXxBJ5/110.jpg",
  "https://i.ibb.co/3mHSkxz/107.jpg",
  "https://i.ibb.co/yhqc0Mb/104.jpg",
  "https://i.ibb.co/25x21NK/102.jpg",
  "https://i.ibb.co/FJqZRsK/100.jpg",
  "https://i.ibb.co/8B2TLLK/95.jpg",
  "https://i.ibb.co/7tb60JK/85.jpg",
  "https://i.ibb.co/MhwY4Rr/79.jpg",
  "https://i.ibb.co/18vZVbr/78.jpg",
  "https://i.ibb.co/tcrJ3Yb/73.jpg",
  "https://i.ibb.co/cCbJTn0/65.jpg",
  "https://i.ibb.co/GRQk1xf/64.jpg",
  "https://i.ibb.co/w0YBFKV/63.jpg",
  "https://i.ibb.co/GHFn2LZ/48.jpg",
  "https://i.ibb.co/KrMBwBp/44.jpg",
  "https://i.ibb.co/y4m6QtR/42.jpg",
  "https://i.ibb.co/nBSn9r5/39.jpg",
  "https://i.ibb.co/1sqyFHW/38.jpg",
  "https://i.ibb.co/BZvWJTW/36.jpg",
  "https://i.ibb.co/Q8xQgkM/35.jpg",
  "https://i.ibb.co/ChYYrRK/34.jpg",
  "https://i.ibb.co/dJ8Ych8/33.jpg",
  "https://i.ibb.co/TMpYdmm/32.jpg",
  "https://i.ibb.co/28CCNtX/31.jpg",
  "https://i.ibb.co/GWhx5tg/26.jpg",
  "https://i.ibb.co/KKgLsXV/25.jpg",
  "https://i.ibb.co/mNMSJCL/24.jpg",
  "https://i.ibb.co/zP6vJ5P/23.jpg",
  "https://i.ibb.co/5YJ99P6/21.jpg",
  "https://i.ibb.co/fMfdnPg/19.jpg",
  "https://i.ibb.co/fkwZrC4/17.jpg",
  "https://i.ibb.co/RD9PYDw/16.jpg",
  "https://i.ibb.co/3kPKDFX/15.jpg",
  "https://i.ibb.co/YWdsfbq/14.jpg",
  "https://i.ibb.co/7nkxBH3/11.jpg",
  "https://i.ibb.co/6bd2n8H/8.jpg",
  "https://i.ibb.co/pWkfCLG/4.jpg",
  "https://i.ibb.co/N9YGXmt/1.jpg",
  "https://i.ibb.co/48mBL9k/2.jpg",
];

export default function IndexPage() {
  return (
    <div className="bg-slate-300 flex flex-row w-screen h-screen">
      <Navigation />

      <p className="flex-1 max-w-[700px] mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
        recusandae, odit quia nemo doloremque natus delectus reiciendis quos
        magnam similique expedita, accusantium eligendi? Exercitationem velit
        illum aliquam iusto illo, fugiat officia porro laboriosam? Quas harum
        consectetur possimus atque veniam sit nemo obcaecati qui repellendus
        voluptates, quisquam laborum commodi. Minima iste explicabo laudantium
        distinctio ab unde, non, dolorum delectus nihil fuga aliquid nesciunt
        accusantium dolore quas? Quo qui deserunt odit ipsum adipisci aliquid
        labore iusto vel placeat quia dignissimos laboriosam voluptates
        distinctio temporibus, optio voluptas pariatur inventore tenetur
        perspiciatis quasi. Voluptatibus porro suscipit exercitationem
        obcaecati! Vero unde dolor iste magni facere.
      </p>
    </div>
  );
}
