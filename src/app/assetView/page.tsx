/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Link from 'next/link';
import { useParams } from 'react-router-dom';

 function assetView() {

	const { sno } = useParams();

	console.log("sno", sno)

	const [assetData, setAssetData] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);

	// useEffect(() => {
	// 	fetch(`https://japi.mostx.co.kr/api/assets/${no}`)
	// 	.then((res) => res.json())
	// 	.then((result) => setAssetData(result.data))
	// }, [no]);
	useEffect(() => {
		const getAsset = async() => {
			const { data } = await axios.get(`https://japi.mostx.co.kr/api/assets/${sno}`);
			return data;
		}
		getAsset().then(result => setAssetData(result)).then(() => setIsLoaded(true))
	}, [])

	console.log(assetData);
      
    return (
        <div>
            <header>
                <nav>
                    <ul className="nav">
                    <li><Link href="/assetsList" legacyBehavior><a className="link">자산 감가상각 현황</a></Link></li>
                    <li><Link href="/assetsCreate" legacyBehavior><a className="link">자산 등록</a></Link></li>
                    <li><Link href="/assetsDiscard" legacyBehavior><a className="link">자산 처분</a></Link></li>
                    <li className="on"><Link href="/assetView" legacyBehavior><a className="link"> 건별 자산 조회</a></Link></li>
                    </ul>
                </nav>			
            </header>
            <article className="status">
		<h2 className="sub_title">건별 자산 조회</h2>
		<section className="search_box">
			<h3>검색</h3>
			<details open>
			<form action="" className="search">
				<div className="flex">
				<ul className="search_list_full">
					<li>
						<label className="label" htmlFor="">WRMS 자산코드</label>
						<input type="text" className="m_text" id="" />
					</li>
					<li>
						<label className="label" htmlFor="">WRMS 품목코드</label>
						<input type="text" className="m_text" id="" />
					</li>						
					<li>
						<label className="label" htmlFor="">일상구독 상품번호</label>
						<input type="text" className="m_text" id="" />
					</li>
					<li>
						<label className="label" htmlFor="">시리얼 번호</label>
						<input type="text" className="m_text" id="" />
					</li>
					<li>
						<label className="label" htmlFor="">상품명</label>
						<input type="text" className="l_text" id="" />
					</li>
				</ul>
				</div>
				<button className="btn" type="submit">조회하기</button>
			</form>	
			<summary></summary>		
			</details>
		</section>
		<section className="search search_box search_mid">
			<h3 className="hidden">자산 상세 정보</h3>
				<div className="flex">
					<ul className="search_list">
						<li>
							<h5 className="label">상태</h5>
							<p className="text">정상</p>
						</li>
						<li>
							<h5 className="label">용도</h5>
							<p className="text">구독</p>
						</li>
						<li>
							<h5 className="label">WRMS 자산코드</h5>
							<p className="text">MP4678965</p>
						</li>
						<li>
							<h5 className="label">WRMS 품목코드</h5>
							<p className="text">P10000005889</p>
						</li>
						<li>
							<h5 className="label">일상구독 상품번호</h5>
							<p className="text">SP1234568459</p>
						</li>
						<li>
							<h5 className="label">시리얼 번호</h5>
							<p className="text">SKG123546EG6</p>
						</li>
						<li>
							<h5 className="label">상품명</h5>
							<p className="text">루킨스 Premium 특별패키지</p>
						</li>
						<li>
							<h5 className="label">WRMS 구매오더번호 </h5>
							<p className="text">PO00000000891</p>
						</li>
					</ul>
					<ul className="search_list">
						<li>
							<h5 className="label">창고번호</h5>
							<p className="text">CT200</p>
						</li>
						<li>
							<h5 className="label">내용연수</h5>
							<p className="text">5</p>
						</li>
						<li>
							<h5 className="label">발주단가(VAT+)</h5>
							<p className="text">990,000원</p>
						</li>
						<li>
							<h5 className="label">발주단가(VAT-)</h5>
							<p className="text">900,000원</p>
						</li>
						<li>
							<h5 className="label">장부가액</h5>
							<p className="text">1,000,000원</p>
						</li>
						<li>
							<h5 className="label">최초개시일자</h5>
							<p className="text">2023-02-01</p>
						</li>
						<li>
							<h5 className="label">자산등록일자</h5>
							<p className="text">2023-01-01</p>
						</li>
						<li>
							<h5 className="label">등록자 정보</h5>
							<p className="text">김이정  IT서비스팀</p>
						</li>
					</ul>
				</div>
		</section>
		<section>
			<h3>월별 감가상각</h3>
			<br/>
			<div className="table_top">
				<p>총 60개</p>
				<p>(단위 : 원)</p>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>번호</th>
						<th>감가상각월</th>
						<th>감가상각비</th>
						<th>발주단가(VAT+)</th>
						<th>발주단가(VAT-)</th>
						<th>감가상각 누계액 </th>
						<th>장부가액</th>
					</tr>
					<tr>
						<td>60</td>
						<td>2023-10</td>
						<td>100,000</td>
						<td>990,000</td>
						<td>900,000</td>
						<td>1,000,000</td>
						<td>800,000</td>
					</tr>
					<tr>
						<td>59</td>
						<td>2023-10</td>
						<td>100,000</td>
						<td>990,000</td>
						<td>900,000</td>
						<td>1,000,000</td>
						<td>800,000</td>
					</tr>
					<tr>
						<td>58</td>
						<td>2023-10</td>
						<td>100,000</td>
						<td>990,000</td>
						<td>900,000</td>
						<td>1,000,000</td>
						<td>800,000</td>
					</tr>
					<tr>
						<td>57</td>
						<td>2023-10</td>
						<td>100,000</td>
						<td>990,000</td>
						<td>900,000</td>
						<td>1,000,000</td>
						<td>800,000</td>
					</tr>
					<tr>
						<td>56</td>
						<td>2023-10</td>
						<td>100,000</td>
						<td>990,000</td>
						<td>900,000</td>
						<td>1,000,000</td>
						<td>800,000</td>
					</tr>
				</thead>
			</table>
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
		{/* <section className="sel_popup on input_box">
			<h3>선택<button type="button" className="sel_popup_close"></button></h3>
			<table className="table">
				<thead>
					<tr>
						<th>WRMS 자산코드</th>
						<th>WRMS 품목코드</th>
						<th>일상구독 상품번호</th>
						<th>시리얼 번호</th>
						<th>상품명</th>
					</tr>
					<tr>
						<td>MP4678965</td>
						<td>P10000005889</td>
						<td>SP1234568459</td>
						<td>SKG123546EG6</td>
						<td>루킨스 Premium 특별패키지(체험용)</td>
					</tr>
					<tr>
						<td>MP4678965</td>
						<td>P10000005889</td>
						<td>SP1234568459</td>
						<td>SKG123546EG6</td>
						<td>루킨스 Premium 특별패키지(체험용)</td>
					</tr>
					<tr>
						<td>MP4678965</td>
						<td>P10000005889</td>
						<td>SP1234568459</td>
						<td>SKG123546EG6</td>
						<td>루킨스 Premium 특별패키지(체험용)</td>
					</tr>
					<tr>
						<td>MP4678965</td>
						<td>P10000005889</td>
						<td>SP1234568459</td>
						<td>SKG123546EG6</td>
						<td>루킨스 Premium 특별패키지(체험용)</td>
					</tr>
				</thead>
			</table>
		</section> */}
	</article>
        </div>
    );
};

export default assetView;