"use client"

import "@/app/globals.css"
import Link from "next/link"

const Home = () => {

  return (
    <div className="wrapper">
      <h1 className="text-4xl font-bold tracking-widest">UUU</h1>
      <p className="mt-2 border-b">ホームページ作成アプリ</p>
      <div className="mt-8 flex gap-12 max-md:flex-col">
        <div className="text-center text-gray-600 tracking-wider">
          <p className="text-3xl"><span className="text-5xl font-bold ">U</span>sers{"　"}can{"　"}<span className="text-5xl font-bold ">U</span>pload</p>
          <p className="text-3xl">their{"　"}<span className="text-5xl font-bold ">U</span>nique{"　"}bands</p>
        </div>
        <div className="content-center">
          <Link
            href={"/getstart"}
            className="text-2xl font-bold text-white italic border-1 rounded-lg bg-gray-700 p-3">Get Started</Link>
        </div>
      </div>
      <footer className="mt-12 p-4 bg-gray-100 border rounded-lg">
        <p>https://********/uuu/** URLの最後をオリジナルの文字列で登録出来ます
        </p>
        <p>現在、ニュース機能を作成中</p>
      </footer>
    </div>
  )
}

export default Home