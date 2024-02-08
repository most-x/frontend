import Image from 'next/image'
import './globals.css'

const Hearder = () => {
    return (
        <div>
            <header>
                <h1><a href="" className="logo">
                    <img src='img/logo_w.svg' alt="모스트엑스 로고" /></a>홈쇼핑 방송 정보
                <a href="" className="exit">
                    <img src='img/exit.svg' alt="모스트엑스 로고" /></a></h1>
            </header>
        </div>
    )
}

export default Hearder