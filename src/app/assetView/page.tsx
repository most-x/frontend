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
				<h3>검색<span className="h3_info">조회하실 자산을 검색해주세요.</span></h3>
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
					<div className="flex border_btm_none">
						<ul className="search_list">
							<li>
								<h5 className="label">상태</h5>
								<p className="text">정상</p>
								{/* <p className="text sale">매각</p>
								<p className="text disuse">폐기</p> */}
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
							{/* <li>
								<h5 className="label">WRMS 구매오더번호 </h5>
								<p className="text">PO00000000891</p>
							</li> */}
						</ul>
						<ul className="search_list">
							{/* <li>
								<h5 className="label">창고번호</h5>
								<p className="text">CT200</p>
							</li> */}
							<li>
								<h5 className="label">내용연수</h5>
								<p className="text">5년</p>
							</li>
							<li>
								<h5 className="label">공급가</h5>
								<p className="text">990,000원</p>
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
								<h5 className="label">최초등록일자</h5>
								<p className="text">2023-01-01</p>
							</li>
							<li>
								<h5 className="label">등록자 정보</h5>
								<p className="text">김이정  IT서비스팀</p>
							</li>
						</ul>
					</div>
					<ul className="search_list_full border_s">
						<li>
							<h5 className="label">상품명</h5>
							<p className="text">루킨스 Premium 특별패키지</p>
						</li>					
					</ul>
					<button className="popup_on right_btn" type="button">수정하기</button>				
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
							<th>감가상각일자<p className="tooltip">감가상각주기 : 최초개시일로 부터 30일마다 진행</p></th>
							<th>공급가</th>
							<th>감가상각비</th>
							<th>감가상각 누계액 </th>
							<th>장부가액</th>
						</tr>
						<tr>
							<td>60</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>59</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>58</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>57</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>56</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>55</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>54</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>53</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>52</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>51</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>50</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>49</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>48</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>47</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>46</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>45</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>44</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>43</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>42</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>41</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>40</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>39</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>38</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>37</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>36</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>35</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>34</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>33</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>32</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>31</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>30</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>29</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>28</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>27</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>26</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>25</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>24</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>23</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>22</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>21</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>20</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>19</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>18</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>17</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>16</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>15</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>14</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>13</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>12</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>11</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>10</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>09</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>08</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>07</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>06</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
						<tr>
							<td>05</td>
							<td>2023-10-01</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>80,000</td>
							<td>910,000</td>
						</tr>
						<tr>
							<td>04</td>
							<td>2023-09-02</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>70,000</td>
							<td>920,000</td>
						</tr>
						<tr>
							<td>03</td>
							<td>2023-08-03</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>60,000</td>
							<td>930,000</td>
						</tr>
						<tr>
							<td>02</td>
							<td>2023-07-04</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>50,000</td>
							<td>940,000</td>
						</tr>
						<tr>
							<td>01</td>
							<td>2023-06-05</td>
							<td>990,000</td>
							<td>10,000</td>
							<td>40,000</td>
							<td>950,000</td>
						</tr>
					</thead>
				</table>
	{/* - 			<div className="center_flex page">
					<a href="">처음</a>
					<a href="">&nbsp;〈&nbsp;&nbsp;&nbsp;</a>
					<a href="" className="on">1</a>
					<a href="">2</a>
					<a href="">3</a>
					<a href="">4</a>
					<a href="">5</a>
					<a href="">&nbsp;&nbsp;&nbsp;〉&nbsp;</a>
					<a href="">끝</a>
				</div> */}
			</section>
			<section className="sel_popup on input_box">
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
			</section>
			<section className="popup input_box">
				<h3>자산 상세 정보<button type="button" className="popup_close"></button></h3>
				<form action="">
					<div className="search">
						<h4 className="m_title">기본정보</h4>
						<ul className="input_list">
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
								<p className="text">루킨스 Premium 특별패키지(체험용)</p>
							</li>
							<li>
								<h5 className="label">최초 등록일자</h5>
								<p className="text">2023-01-01</p>
							</li>
							<li>
								<h5 className="label">최초 등록자 정보</h5>
								<p className="text">김이정  IT서비스팀</p>
							</li>
							{/* <li>
								<label className="label" for="">WRMS 구매오더번호</label>
								<input type="text" className="m_text" id="" value="PO00000000891">
							</li>					
							<li>
								<label className="label" for="">창고번호</label>
								<input type="text" className="m_text" id="" value="CT200">
							</li> */}
							<li>
								<h5 className="label">공급가</h5>
								<p className="text">900,000원</p>
							</li>
							<li>
								<label className="label" htmlFor="">내용연수</label>
								<p className="text">5년</p>
								{/* <input type="text" class="m_text" id="" value="5년"> */}
							</li>
							<li>
								<h5 className="label">용도</h5>
								<p className="text">구독</p>
								{/* <fieldset className="input_wrap">
									<input type="radio" name="use" id="use02">
									<label for="use02">구독</label>
									<input type="radio" name="use" id="use03" checked>
									<label for="use03">체험</label>
								</fieldset> */}
							</li>
							<li>
								<label className="label" htmlFor="">최초개시일자</label>
								<input type="date" className="m_text" id="" value="2023-02-01" />
							</li>					
							<li>
								<h5 className="label">상태</h5>
								<fieldset className="input_wrap">
									<input type="radio" name="status" id="status02" checked />
									<label htmlFor="status02">정상</label>
									<input type="radio" name="status" id="status03" />
									<label htmlFor="status03" className="sale">매각</label>
									<input type="radio" name="status" id="status04" />
									<label htmlFor="status04" className="disuse">폐기</label>
								</fieldset>
							</li>
						</ul>
						<h4 className="m_title">매각 정보</h4>
						<ul className="input_list">
							<li>
								<label className="label" htmlFor="">장부가액</label>
								<p className="text">80,000원</p>
							</li>
							<li>
								<label className="label" htmlFor="">실제판매일자</label>
								<input type="date" className="m_text" id="" />
							</li>
							<li>
								<label className="label" htmlFor="">실제판매금액</label>
								<input type="text" className="m_text" id="" />
							</li>
						</ul>
						<h4 className="m_title">폐기 정보</h4>
						<ul className="input_list">
							<li>
								<label className="label" htmlFor="">장부가액</label>
								<p className="text">80,000원</p>
							</li>						
							<li>
								<label className="label" htmlFor="">실제폐기일자</label>
								<input type="date" className="m_text" id="" />
							</li>
							<li>
								<label className="label" htmlFor="">실제폐기금액</label>
								<input type="text" className="m_text" id="" />
							</li>
						</ul>			
					</div>
					<button className="btn blue_back popup_save" type="submit">저장</button>
				</form>		
			</section>
		</article>
    </div>
    );
};

export default assetView;