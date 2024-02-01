import Link from 'next/link'
import '../globals.css'

export default function ScriptLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <head />
        <body>
        <header>
            <h1>
                <Link href="/" legacyBehavior>
                <a className="logo">
                  <img src="img/logo_w.svg" alt="모스트엑스 로고" /></a></Link>상품 스크립트 관리
                <Link href="/" legacyBehavior>
                <a href="index.html" className="exit">
                  <img src="img/exit.svg" alt="모스트엑스 로고" /></a></Link>
            </h1>
            <nav>
                <ul className="nav">
                <Link href="/serchProduct" legacyBehavior>
                    <li className="on"><a href="script_main.html">통합 검색</a></li></Link>
                <Link href="/createProduct" legacyBehavior>
                    <li><a href="script_product_reg.html">상품 등록</a></li></Link>
                </ul>
            </nav>			
        </header>
            {children}</body>
      </html>
    )
}