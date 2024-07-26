import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'

function Home() {

  return(
    <article className="index">
		<section className="blue_back">
			<h1><img src="img/logo_w.svg" alt="모스트엑스 로고" className="logo" /></h1>
		</section>
		<section>
			<div>
				<h2 className="title">사내 정보 관리 시스템</h2>
			    <Link href="/assets" legacyBehavior>
					<a className='btn blue_back'>자산 감가상각 관리</a>
				</Link>
				<Link href="/surveyList" legacyBehavior>
					<a className='btn blue_back'>만족도 조사 관리</a>
				</Link>
				{/* <Link href="/script" legacyBehavior>
					<a className='btn blue_back'>상품 스크립트 관리12</a>
				</Link> */}
				<Link href="https://mostx.softr.app/"
					  rel="noopener noreferrer" legacyBehavior>
					<a target="_blank" className='btn blue_back'>상품 스크립트 관리</a>
				</Link>
				{/* <Link href="/" legacyBehavior>
					<a className='btn blue_back'>상담 스크립트 관리</a>
				</Link> */}
				<Link href="" legacyBehavior>
					<a className='btn btn_off'>상담 스크립트 관리</a>
				</Link>
				<Link href="/homeShopping" legacyBehavior>
					<a className='btn blue_back'>홈쇼핑 방송 정보</a>
				</Link>
				<Link href="http://31.152.254.254:5555/" legacyBehavior>
					<a className='btn blue_back'>코스트코 리퍼브 상품</a>
				</Link>
			</div>
		</section>
	</article>
  )
 }

 export default Home