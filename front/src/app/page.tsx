"use client"

import "@/app/globals.css"
import Link from "next/link"

const Home = () => {

  return (
    <div className="wrapper">
      <h1>ホームページ作成</h1>
      <div>
        <Link href={"/login"}>ログイン</Link>
        <Link href={"/register"}>ユーザー登録</Link>
      </div>
    </div>
  )
}

export default Home