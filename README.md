# UUU MyHomePage

## プロジェクト概要

フロントエンドにNext.js + TypeScript、バックエンドにLaravel + MySQLを使用して作成した、簡易なバンドのホームページを作成できるサンプルアプリケーション。
Vercel / Railwayにデプロイしています。

## 技術スタック

### フロントエンド

- Next.js 15.5(App Router)
- TypeScript
- Axios 1.12
- Tailwind / CSS Modules
- Jest + @testing-library/react

### バックエンド

- PHP 8.2
- Laravel 12
- Breeze 2.3
- AWS S3（画像、音源アップロード）
- MySQL

## デプロイ
- Frontend: Vercel
- Backend: Railway


## 機能概要
- ユーザーテーブルにslugカラムがあり各々の独自のurlでホームページを表示できる
- CDアルバムのジャケット画像、アルバム名、曲（6曲まで）を登録できる
- 音源を3曲までアップロードできる
- ライブ情報を登録出来る
