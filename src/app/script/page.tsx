import { Router } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { NextResponse } from "next/server";

const brandList = {}

export default function ScriptPage() {

	// const [page, setPage] = useState(1);
	// const { data } = useQuery(
	// 	"characters",
	// 	async() =>
	// 		await fetch(
	// 			``
	// 		)
	// )

	return (
	<article className="status">
	<h2 className="sub_title">통합 검색
	<a target="_blank" href="https://www.modurentalmall.co.kr/main/html.php?htmid=event/card2.html" className="card_btn">제휴카드 보기</a></h2>
	<section>
		<form action="" className="t_search_box">
			<input type="search" className="t_search" placeholder="검색어(업체명, 제품명, 품목코드, 가격정책) 입력" />
			<button type="submit" className="t_search_btn">검색</button>
		</form>
	</section>
	<section>
		<h3 className="h3">브랜드</h3>
		<ul className="brand_link_wrap">
			<li><a href="" className="brand_link">루킨스<br/>프리미엄</a></li>
			<li><a href="" className="brand_link">삼성전자<br/>대형 · 소형 · 계절 가전</a></li>
			<li><a href="" className="brand_link">스카닉 · 에코로 · 엑스트랙 전기자전거</a></li>
			<li><a href="" className="brand_link">에셜론 · <br/>툰투리 · 고고런5 · 노르딕트랙 · 싸이벡스 피트니스 머신</a></li>
			<li><a href="" className="brand_link">아베크<br/>펫드라이룸</a></li>
			<li><a href="" className="brand_link">삼성물산<br/>스마트 가든월</a></li>
			<li><a href="" className="brand_link">레이저<br/>통증 조사기<br/>Pain TB ·<br/>Pain TJ</a></li>
			<li><a href="" className="brand_link">에코체 · <br/>싱크리더 · 에어백신 · <br/>안지오 전기자전거</a></li>
		</ul>
	</section>
	<section>
		<h3 className="h3">상품 전체</h3>
		<ul>
			<li className="pr_li">
				<a href="script_detail.html" target="_blank">
				<span className="script_btn">스크립트 보기</span>
				<div className="pr_flex">
					<img className="pr_img" src="http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg" alt="" />
					<div className="pr_top">
						<h4>스카닉 5X 미니벨로 배달 전동 전기자전거 48V 12A</h4>
						<div className="pr_flex">
							<ul className="pr_left">
								<li>렌탈 기간 : 39개월 / 월 렌탈료 : 29,300원</li>
								<li>총 렌탈료 : 1,142,700원</li>
								<li>AS기간 : 12개월</li>
								<li>회수비 : 10만원</li>								
								<li>색상 : 블랙 /화이트</li>
							</ul>
							<ul>
								<li>품목코드 : P11000010397</li>
								<li>가격정책 : RP0000000186332 · RP0000000186344</li>
							</ul>
						</div>
					</div>
				</div>
				</a>
			</li>
		</ul>
		<div className="center_flex page">
			<a href="">처음</a>
			<a href="">&nbsp;〈&nbsp;&nbsp;&nbsp;</a>
			<a href="" className="on">1</a>
			<a href="">2</a>
			<a href="">3</a>
			<a href="">4</a>
			<a href="">5</a>
			<a href="">&nbsp;&nbsp;&nbsp;〉&nbsp;</a>
			<a href="">끝</a>
		</div>			
	</section>
</article>
    )
}