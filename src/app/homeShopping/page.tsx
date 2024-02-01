"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'

type ProductCountInfo = Record<string, number>;
type ProdcutPercentInfo = Record<string | number, number>;
type CategoryCount = Record<string, number>;

// TODO: 테스트를 위해 샘플 데이터를 사용했음. 추후 API 데이터로 변경되면 삭제
const SAMPLE_PRODUCT_PERCENT_INFO: ProdcutPercentInfo = {
	"2024.01.27(토)": 77.1,
	"2024.01.28(일)": 73.7,
	"2024.01.29(월)": 81.3,
	"2024.01.30(화)": 79,
	"2024.01.31(수)": 70.9,
	"2024.02.01(목)": 67.7,
	"2024.02.02(금)": 100,
	"2024.02.03(토)": 61,
	"2024.02.04(일)": 76.5,
	"2024.02.05(월)": 64.7,
	"2024.02.06(화)": 8.4

}

function homeShopping() {
	const today = new Date();

	function convertDate(date:Date): string {
	
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
	
		const dateString = year  +"-"+ month+"-"  + day;
	
		return dateString;
	}

	const [productPercentInfo, setProductPercentInfo] = useState<ProdcutPercentInfo | undefined>();
	const [productCountInfo, setProductCountInfo] = useState<ProductCountInfo | undefined>();
	const [categoryCount, setCategoryCount] = useState<CategoryCount | undefined>();
	
	const [pertcentDataA,setPercentDataA] = useState<any>([])


	const [isChecked, setIsChecked] = useState(false);
	const [checkedCategorys, setCheckedCategorys] = useState(new Set());

	//달력 선택
	const [endDate, setEndDate] = useState<string>(convertDate(new Date()));
	const [startDate, setStartDate] = useState<string>(convertDate(new Date()));
	// const [startDate, setStartDate] = useState<Date | null>

	const [categorys,setCategorys] = useState<any>()

	useEffect(() => {
	
		const productCountAPIUrl = `http://31.152.254.254:3000/home-shopping/dashboard`;

		const fetchData = async () => {
			try {
				const params = {  // 필요한 query params를 {} 형태에 담아준다.
					fromDate : startDate,
					toDate : endDate
				};

				const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
				const requrl = `${productCountAPIUrl}?${queryString}`;   // 완성된 요청 url.
				const response = await fetch(requrl);
				const { recentData,percentData,searchData } = await response.json();

				const allCate = []
				const catePercent = Object.entries(percentData.catePercent)
				const cateCount = Object.entries(searchData.category)

				for(let i=0;i<catePercent.length;i++){
					const nData ={
						kind:catePercent[i][0],
						percent:catePercent[i][1],
						cnt:cateCount[i][1]
					}
					allCate.push(nData)
				}

				console.log('allCate=',allCate)

				setCategorys(allCate)

				setPercentDataA(percentData)
				setProductCountInfo(recentData);
				// TODO: 테스트를 위해 샘플 데이터를 사용했음. 추후 API 데이터로 변경 필요
				setProductPercentInfo(SAMPLE_PRODUCT_PERCENT_INFO);
			} catch (error) {
				console.log("error", error);
			}
		};
		fetchData();
	}, [startDate,endDate]);



	/* 요일 구하기 */
	const week = new Array('일','월','화','수','목','금','토')
	const label = today.getDay()
	const todayLabel =week[label];
	
	const formattedDate = `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}(${todayLabel}) 00:00:00`
 
	/* 카테고리 구하기 */
	const categoryList = [
		{key:0, value: '전체', checked: false},
		{key:1, value: '가전·디지털', checked: false},
		{key:2, value: '보험', checked: false},
		{key:3, value: '생활·주방', checked: false},
		{key:4, value: '식품·건강', checked: false},
		{key:5, value: '패션·잡화', checked: false},
		{key:6, value: '화장품·미용', checked: false},
		{key:6, value: '기타', checked: false}
	];



	const hChannels = [
		{name:"CJ&스타일",percent:5},
		{name:"CJ&스타일",percent:5},
		{name:"CJ&스타일",percent:5},
		{name:"CJ&스타일",percent:5},
		{name:"CJ&스타일",percent:5},
		{name:"CJ&스타일",percent:5},
		{name:"CJ&스타일",percent:5}
	]


	const buildProductCountList = (productCountInfo: ProductCountInfo, productPercentInfo: ProdcutPercentInfo): JSX.Element[] => {
		return Object.entries(productCountInfo).map(([date, count]) => (
			<li key={date}>
				<div className="chart">
					{/* productPercontInfo 객체에 일자(date) 키와 값이 있어야 정상적으로 표시됨 */}
					<div style={{ height: `${productPercentInfo[date]}%` }}></div>
				</div>
				<h4 className="date">{date}</h4>
				<p className="num">{count}개</p>
			</li>
		));
	}

    return(
		<article className="status hsp">
		<h2 className="sub_title">홈쇼핑 방송 정보<p className="update_txt"><strong>업데이트</strong> {formattedDate} </p></h2>
		<section className="search_box">
			<h3>방송일자 별 상품수</h3>			
			<ul className="chart_box">
				{(productCountInfo && productPercentInfo) && buildProductCountList(productCountInfo, productPercentInfo)}
			</ul>
		</section>
		<section className="search_box">
			<h3>상품 검색</h3>
			<details open>
			<form action="" className="search">
				<ul className="search_list_full">
					<li>
						<label className="label" htmlFor="">상품명</label>
						<input type="text" id="" className="l_text" placeholder="상품명을 입력해주세요" />
					</li>
					<li className="checkbox_wrap">
						<label className="label" htmlFor="">카테고리</label>
						<fieldset className="date_radio checkbox">
							
								<input type="checkbox" id="cateall" defaultChecked={true} />
								<label htmlFor="cateall">전체</label>							
								<input type="checkbox" id="cate01" />
								<label htmlFor="cate01">가전·디지털</label>
								<input type="checkbox" id="cate02" />
								<label htmlFor="cate02">보험</label>
								<input type="checkbox" id="cate03" />
								<label htmlFor="cate03">생활·주방</label>
								<input type="checkbox" id="cate04" />
								<label htmlFor="cate04">식품·건강</label>
								<input type="checkbox" id="cate05" />
								<label htmlFor="cate05">유아·아동</label>
								<input type="checkbox" id="cate06" />
								<label htmlFor="cate06">패션·잡화</label>
								<input type="checkbox" id="cate07" />
								<label htmlFor="cate07">화장품·미용</label>
								<input type="checkbox" id="cate08" />
								<label htmlFor="cate08">기타</label>
						</fieldset>
					</li>
					<li className="checkbox_wrap">
						<label className="label" htmlFor="">홈쇼핑 채널</label>
						<fieldset className="date_radio checkbox">
							<input type="checkbox" id="channelall" defaultChecked={true} />
							<label htmlFor="channelall">전체보기</label>
							<input type="checkbox" id="cjmall" />
							<label htmlFor="cjmall">CJ&스타일</label>
							<input type="checkbox" id="cjmallplus" />
							<label htmlFor="cjmallplus">CJ온스타일+</label>
							<input type="checkbox" id="gsmyshop" />
							<label htmlFor="gsmyshop">GS MY SHOP</label>
							<input type="checkbox" id="gsshop" />
							<label htmlFor="gsshop">GS SHOP</label>
							<input type="checkbox" id="kshop" />
							<label htmlFor="kshop">KT알파 쇼핑</label>
							<input type="checkbox" id="kshopplus" />
							<label htmlFor="kshopplus">KT알파 쇼핑 TV플러스</label>
							<input type="checkbox" id="lotteonetv" />
							<label htmlFor="lotteonetv">LOTTE ONE TV</label>
							<input type="checkbox" id="nsmallplus" />
							<label htmlFor="nsmallplus">NS Shop+</label>
							<input type="checkbox" id="nsmall" />
							<label htmlFor="nsmall">NS홈쇼핑</label>
							<input type="checkbox" id="ssgshop" />
							<label htmlFor="ssgshop">SHINSEGAE SHOPPING</label>
							<input type="checkbox" id="skstoa" />
							<label htmlFor="skstoa">SK 스토아</label>
							<input type="checkbox" id="tcommerce2" />
							<label htmlFor="tcommerce2">T커머스</label>
							<input type="checkbox" id="immall" />
							<label htmlFor="immall">공영쇼핑</label>
							<input type="checkbox" id="wshop" />
							<label htmlFor="wshop">더블유쇼핑</label>
							<input type="checkbox" id="lottemall" />
							<label htmlFor="lottemall">롯데홈쇼핑</label>
							<input type="checkbox" id="shopnt" />
							<label htmlFor="shopnt">쇼핑엔티</label>
							<input type="checkbox" id="hmall" />
							<label htmlFor="hmall">현대홈쇼핑</label>
							<input type="checkbox" id="hmallplus" />
							<label htmlFor="hmallplus">현대홈쇼핑 PLUSE#</label>
							<input type="checkbox" id="hnsmall" />
							<label htmlFor="hnsmall">홈&쇼핑</label>
							<input type="checkbox" id="homeshopping" />
							<label htmlFor="homeshopping">홈쇼핑</label>
						</fieldset>
					</li>	
					<li>
						<div className="flex_center">
						<label className="label" htmlFor="">방송일자</label>
						<input type="date" id="startDate" onChange={(e)=>setStartDate(e.target.value)} value={startDate} className="s_text" />
						<span className="date_blank">-</span>
						<input type="date" id="endDate" onChange={(e)=>setEndDate(e.target.value)} value={endDate} className="s_text" />
						<fieldset className="date_radio">
							<input type='radio' id='radio_today'name="date_radio" defaultChecked={true}/>
							<label htmlFor="radio_today" >오늘</label>
							<input type="radio" id="radio_week" name="date_radio" />
							<label htmlFor="radio_week">1주일</label>
							<input type="radio" id="radio_month" name="date_radio" />
							<label htmlFor="radio_month">1개월</label>
							{/* <input type="radio" id="radio_2023" name="date_radio" />
							<label htmlFor="radio_2023">2023년</label> */}
							<input type="radio" id="radio_2024" name="date_radio" />
							<label htmlFor="radio_2024">2024년</label>
						</fieldset>
						</div>
					</li>
				</ul>
				<div className="flex">
					<button className="btn" type="submit">조회하기</button>
				</div>
			</form>	
			<summary></summary>
			</details>
		</section>
		<div className="btm_chart">
		<section className="btm_chart_box">
			<h3>카테고리 별 상품수</h3>
			<ul className="chart_box_h">
			{categorys && categorys.map((category:any,idx:number)=>(
							<li key={idx}>
							<h4>{category.kind}</h4>
							<div className="chart">
								<a href="">
									<div style= {{ width: category.percent }}>{category.cnt}</div>
								</a>
							</div>
						</li>
							))}
				{/* <li>
					<h4>가전·디지털</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '5%' }}>5</div>
						</a>
					</div>
				</li>
				<li>
					<h4>보험</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '52%' }} >52</div>
						</a>
					</div>
				</li>
				<li>
					<h4>생활·주방</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '45%' }}>45</div>
						</a>
					</div>
				</li>
				<li>
					<h4>식품·건강</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '78%' }} >78</div>
						</a>
					</div>
				</li>
				<li>
					<h4>유아·아동</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '90%' }}>90</div>
						</a>
					</div>
				</li>
				<li>
					<h4>패션·잡화</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '100%'}} >100</div>
						</a>
					</div>
				</li>
				<li>
					<h4>화장품·미용</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '47%' }}>47</div>
						</a>
					</div>
				</li> */}
			</ul>
		</section>
		<section className="search_box">
			<h3>홈쇼핑 채널 별 상품수</h3>
			<ul className="chart_box_h">
				{hChannels.map((hChannel,idx)=>(
					<li key={idx}>
					<h4>{hChannel.name}</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '5%' }}>{hChannel.percent}</div>
						</a>
					</div>
				</li>
				))}
				{/* <li>
					<h4>CJ&스타일</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '5%' }}>5</div>
						</a>
					</div>
				</li> */}
				{/* <li>
					<h4>CJ온스타일+</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '22%' }}>22</div>
						</a>
					</div>
				</li>
				<li>
					<h4>GS MY SHOP</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '92%' }}>92</div>
						</a>
					</div>
				</li>
				<li>
					<h4>GS SHOP</h4>
					<div className="chart">
						<a href="">
							<div style= {{ width: '48%' }}>48</div>
						</a>
					</div>
				</li>
				<li>
					<h4>KT알파 쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '18%' }}>18</div>
						</a>
					</div>
				</li>
				<li>
					<h4>KT알파 쇼핑 TV플러스</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '72%' }}>72</div>
						</a>
					</div>
				</li>
				<li>
					<h4>LOTTE ONE TV</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '38%' }}>38</div>
						</a>
					</div>
				</li>
				<li>
					<h4>NS Shop+</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '5%' }}>5</div>
						</a>
					</div>
				</li>
				<li>
					<h4>NS홈쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '22%' }}>22</div>
						</a>
					</div>
				</li>
				<li>
					<h4>SHINSEGAE SHOPPING</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'92%'}}>92</div>
						</a>
					</div>
				</li>
				<li>
					<h4>SK 스토아</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '48%' }}>48</div>
						</a>
					</div>
				</li>
				<li>
					<h4>T커머스</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '18%' }}>18</div>
						</a>
					</div>
				</li>
				<li>
					<h4>공영쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'72%' }}>72</div>
						</a>
					</div>
				</li>
				<li>
					<h4>더블유쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '38%' }}>38</div>
						</a>
					</div>
				</li>
				<li>
					<h4>롯데홈쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '20%' }}>20</div>
						</a>
					</div>
				</li>
				<li>
					<h4>쇼핑엔티</h4>
					<div className="chart">
						<a href="">
							<div style={{ width: '43%' }} >43</div>
						</a>
					</div>
				</li>
				<li>
					<h4>현대홈쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'32%' }}>32</div>
						</a>
					</div>
				</li>
				<li>
					<h4>현대홈쇼핑 PLUSE#</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'50%' }}>50</div>
						</a>
					</div>
				</li>
				<li>
					<h4>홈&쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'70%' }}>70</div>
						</a>
					</div>
				</li>
				<li>
					<h4>홈쇼핑</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'24%' }}>24</div>
						</a>
					</div>
				</li> */}
			</ul>
		</section>
		<section className="search_box">
			<h3>시간대 별 상품수</h3>
			<ul className="chart_box_h">
				<li>
					<h4>00시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'3%' }}>3</div>
						</a>
					</div>
				</li>
				<li>
					<h4>01시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'10%' }}>10</div>
						</a>
					</div>
				</li>
				<li className="now">
					<h4>02시</h4>
					<div className="chart">
						<span>LIVE</span>
						<a href="">
							<div style={{ width:'22%' }}>22</div>
						</a>
					</div>
				</li>
				<li>
					<h4>03시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'73%' }}>73</div>
						</a>
					</div>
				</li>
				<li>
					<h4>04시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'42%' }}>42</div>
						</a>
					</div>
				</li>
				<li>
					<h4>05시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'15%' }}>15</div>
						</a>
					</div>
				</li>
				<li>
					<h4>06시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'76%' }}>76</div>
						</a>
					</div>
				</li>
				<li>
					<h4>07시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'87%' }}>87</div>
						</a>
					</div>
				</li>
				<li>
					<h4>08시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'98%' }}>98</div>
						</a>
					</div>
				</li>
				<li>
					<h4>09시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'29%' }}>29</div>
						</a>
					</div>
				</li>
				<li>
					<h4>10시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'10%' }}>10</div>
						</a>
					</div>
				</li>
				<li>
					<h4>11시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'15%' }}>15</div>
						</a>
					</div>
				</li>
				<li>
					<h4>12시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'92%' }}>92</div>
						</a>
					</div>
				</li>
				<li>
					<h4>13시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'73%' }}>73</div>
						</a>
					</div>
				</li>
				<li>
					<h4>14시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'14%' }}>14</div>
						</a>
					</div>
				</li>
				<li>
					<h4>15시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'62%' }}>62</div>
						</a>
					</div>
				</li>
				<li>
					<h4>16시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'16%' }}>16</div>
						</a>
					</div>
				</li>
				<li>
					<h4>17시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'37%' }}>37</div>
						</a>
					</div>
				</li>
				<li>
					<h4>18시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'98%' }}>98</div>
						</a>
					</div>
				</li>
				<li>
					<h4>19시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'29%' }}>29</div>
						</a>
					</div>
				</li>
				<li>
					<h4>20시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'80%' }}>80</div>
						</a>
					</div>
				</li>
				<li>
					<h4>21시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'21%' }}>21</div>
						</a>
					</div>
				</li>
				<li>
					<h4>22시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'42%' }}>42</div>
						</a>
					</div>
				</li>
				<li>
					<h4>23시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'32%' }}>32</div>
						</a>
					</div>
				</li>
				<li>
					<h4>24시</h4>
					<div className="chart">
						<a href="">
							<div style={{ width:'24%' }}>24</div>
						</a>
					</div>
				</li>
			</ul>
		</section>
		<section className="search_box">
			<h3>유형 별 상품수</h3>
			<ul className="chart_box_donut">
				<li className="chart_donut_wrap">
					<h4><a href=""><span style={{ color: '#ddd' }}>■ </span><strong>구매상품</strong> 28개</a></h4>
					<h4><a href=""><span style={{ color: '#011E41' }}>■ </span><strong>렌탈상담상품</strong> 72개</a></h4>					
					<div className="chart_donut" style={{ background: 'conic-gradient(#011E41 0% 72%, #ddd 72% 100%)' }}></div>
				</li>
			</ul>
		</section>
		</div>

 {/* 팝업 */}
		{/* { <section className="popup input_box hsp_popup on">
			<h3>상품 정보&nbsp;&nbsp;|&nbsp;&nbsp;2024년 04월 30일 토요일<button type="button" className="popup_close"></button></h3>
			<div className="table_top">
				<div className="sb_flex">
					<div className="flex_center">
						<p className="margin_r">총 1,595개</p>
						<form action="">
							<label htmlFor="" className="hidden">상품명</label>
							<input type="text" id="" className="popup_text" placeholder="상품명을 입력해주세요" />
							<button className="btn blue_back select_btn" type="submit">조회하기</button>
						</form>
					</div>
					<form action="" className="table_select">
						<button type="submit" className="btn blue_back select_btn excel"><span className="down">&nbsp;</span>엑셀 다운로드</button>
						<select name="" id="">
							<option value="">10건씩 조회</option>
							<option value="">30건씩 조회</option>
							<option value="">50건씩 조회</option>
							<option value="">100건씩 조회</option>
						</select>						
					</form>
				</div>
			</div>
			<div className="scroll">
			<table className="table">
				<thead>
					<tr>
						<th>순번 <button className="align_down">&nbsp;</button></th>
						<th>방송일자 <button className="align_down">&nbsp;</button></th>
						<th>방송시간대 <button className="align_down">&nbsp;</button></th>
						<th>방송시간 <button className="align_up">&nbsp;</button></th>
						<th>쇼핑몰명 <button className="align_up">&nbsp;</button></th>
						<th>카테고리 <button className="align_up">&nbsp;</button></th>
						<th>상품명 <button className="align_up">&nbsp;</button></th>
						<th>상품유형 <button className="align_up">&nbsp;</button></th>
						<th>판매가(원) <button className="align_up">&nbsp;</button></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>10</td>
						<td>2024.05.10</td>
						<td>10</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style= {{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }}></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>09</td>
						<td>2024.05.09</td>
						<td>09</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }}></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>08</td>
						<td>2024.05.08</td>
						<td>08</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }}></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>07</td>
						<td>2024.05.07</td>
						<td>07</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }}></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>06</td>
						<td>2024.05.06</td>
						<td>06</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }}></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>05</td>
						<td>2024.05.05</td>
						<td>05</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }} ></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>04</td>
						<td>2024.05.04</td>
						<td>04</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style= {{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }}></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>03</td>
						<td>2024.05.03</td>
						<td>03</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }} ></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰) 트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>02</td>
						<td>2024.05.02</td>
						<td>02</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }} ></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
					<tr>
						<td>01</td>
						<td>2024.05.01</td>
						<td>01</td>
						<td>00:55 - 00:10</td>
						<td>NS홈쇼핑</td>
						<td>가전·디지털</td>
						<td className="left">
							<div className="thumb_img" style={{ backgroundImage : `url(http://modui.hgodo.com/modui/online_thumb/P11000010397_thumb.jpg)` }}></div>
							<p className="thumb_txt">트리아이나 풀패키지 (삼각대 PR01+휴대폰)</p>
						</td>
						<td>렌탈상담상품</td>
						<td className="right">2,409,000</td>
					</tr>
				</tbody>
			</table>
			</div>
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
		</section> } */}
	</article>
    )
}
  
export default homeShopping