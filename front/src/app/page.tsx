"use client"

import Link from "next/link"

const Home = () => {

  return (
    <div>
      <div>
        <Link href={"/login"}>ログイン</Link>
        <Link href={"/register"}>ユーザー登録</Link>
      </div>
    </div>
  )
}

export default Home