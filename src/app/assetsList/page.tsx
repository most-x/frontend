/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Link from 'next/link';

 function assetsList() {
    
    const assetsListAPIUrl = `https://japi.mostx.co.kr/api/assets`
    const [assetsDataList, setAssetsDataList] = useState();

    const [selectedStatus, setselectedStatus] = useState("status01");
    const [selectedKind, setselectedKind] = useState("use01");

    const status = [
        {id:"status01", lable: "전체" },
        {id:"status02", lable: "정상" },
        {id:"status03", lable: "매각" },
        {id:"status04", lable: "폐기" }
    ];

    const handleStatusChange = (event: any) => {
        console.log(event.target.id);
        setselectedStatus(event.target.id);
    }

    const kind = [
        {id:"use01", lable: "전체" },
        {id:"use02", lable: "구독" },
        {id:"use03", lable: "체험" }
    ]

    const handleKindChage = (event: any) => {
        console.log(event.target.id);
        setselectedKind(event.target.id);
    }

    // axios.get(assetsListAPIUrl).then((res) => {
        
    //     console.log(res.data);

    //     setAssetsDataList(res.data);
    // });

    const reFetch = () => {
        axios.get(assetsListAPIUrl).then((res) => {
            console.log(res.data);
            setAssetsDataList(res.data);


       });
    };
   
    return (
        <div>
            <header>
                <h1><a href="index.html" className="logo">
                        <img src="img/logo_w.svg" alt="모스트엑스 로고" /></a>자산 감가상각 관리
                    <a href="index.html" className="exit">
                        <img src="img/exit.svg" alt="모스트엑스 로고" /></a></h1>
                <nav>
                    <ul className="nav">
                        <li className="on"><Link href="/assetsList" legacyBehavior><a className="link">자산 감가상각 현황</a></Link></li>
                        <li><Link href="/assetsCreate" legacyBehavior><a className="link">자산 등록</a></Link></li>
                        <li><Link href="/assetsDiscard" legacyBehavior><a className="link">자산 처분</a></Link></li>
                        <li><Link href="" legacyBehavior><a className="link"> 건별 자산 조회</a></Link></li>
                    </ul>
                </nav>			
            </header>

            <article className="status">
            <h2 className="sub_title">자산 감가상각 현황</h2>
            <section className="search_box">
                <h3>검색</h3>
                <details open>
                <form action="" className="search">
                    <div className="flex">
                    <ul className="search_list">
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
                    <ul className="search_list">
                        <li>
                            <h4 className="label">상태</h4>
                            <fieldset className="input_wrap">
                                {
                                    status.map((status) => (
                                        <span key={status.id}>
                                            <input
                                                type="radio"
                                                id={status.id}
                                                name="status"
                                                checked={selectedStatus === status.id}
                                                onChange = {handleStatusChange}
                                                value={status.id}
                                            />
                                            <label htmlFor={status.id}>{status.lable}</label>
                                        </span>
                                    ))
                                }
                            </fieldset>
                        </li>
                        <li>
                            <h4 className="label">용도</h4>
                            <fieldset className="input_wrap">
                                {
                                    kind.map((kind) => (
                                        <span key ={kind.id}>
                                            <input
                                                type="radio"
                                                id={kind.id}
                                                name="kind"
                                                checked={selectedKind === kind.id}
                                                onChange = {handleKindChage}
                                                value={kind.id}
                                            />
                                            <label htmlFor={kind.id}>{kind.lable}</label>
                                        </span>
                                    ))
                                }
                                {/* <input type="radio" name="use" id="use01" />
                                <label htmlFor="use01">전체</label>
                                <input type="radio" name="use" id="use02" />
                                <label htmlFor="use02">구독</label>
                                <input type="radio" name="use" id="use03" />
                                <label htmlFor="use03">체험</label> */}
                            </fieldset>
                        </li>
                        <li>
                            <label className="label" htmlFor="">금액</label>
                            <select name="" id="" defaultValue="1">
                                <option value="1">선택</option>
                                <option value="2">발주단가(VAT+)</option>
                                <option value="3">발주단가(VAT-)</option>
                                <option value="4">감가상각비(당월)</option>
                                <option value="5">감가상각 누계액</option>
                                <option value="6">장부가액</option>
                            </select>
                            <input type="text" id="" className="s_text" placeholder="최소금액" />
                            <span>-</span>
                            <input type="text" id="" className="s_text" placeholder="최대금액" />
                        </li>
                        <li>
                            <label className="label" htmlFor="" defaultValue="선택">일자</label>
                            <select name="" id="" defaultValue="1">
                                <option value="1">선택</option>
                                <option value="2">자산등록일자</option>
                                <option value="3">최초개시일자</option>
                            </select>
                            <input type="date" id="" className="s_text" placeholder="시작일" />
                            <span>-</span>
                            <input type="date" id="" className="s_text" placeholder="종료일" />
                        </li>
                        <li>
                            <label className="label" htmlFor="">창고번호</label>
                            <input type="text" id="" className="m_text" />
                        </li>
                    </ul>
                    </div>
                    <button className="btn" type="submit">조회하기</button>
                </form>
                    <summary></summary>	
                </details>
            </section>
            <section>
                <h3 className="hidden">결과표</h3>
                <div className="table_top">
                    <p>총 1,595개</p>
                    <p>(단위 : 원)</p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>상태</th>
                            <th>용도</th>
                            <th>WRMS 자산코드</th>
                            <th>WRMS 품목코드</th>
                            <th>일상구독 상품번호</th>
                            <th>시리얼 번호</th>
                            <th>상품명</th>
                            <th>WRMS 구매오더번호</th>
                            <th>창고번호</th>
                            <th>발주단가(VAT+)</th>
                            <th>발주단가(VAT-)</th>
                            <th>감가상각비(당월)</th>
                            <th>감가상각 누계액</th>
                            <th>장부가액</th>
                            <th>자산등록일자</th>
                            <th>최초개시일자</th>
                        </tr>
                        <tr>
                            <td>1595</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1594</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1593</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1592</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1591</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1590</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1589</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1588</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1587</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
                        </tr>
                        <tr>
                            <td>1586</td>
                            <td>정상</td>
                            <td>구독</td>
                            <td><a href="menu04.html">MP4678965</a></td>
                            <td>P10000005889</td>
                            <td>SP1234568459</td>
                            <td>SKG123546EG6</td>
                            <td>루킨스 Premium 특별패키지(체험용)</td>
                            <td>PO00000000891</td>
                            <td>CT200</td>
                            <td>990,000</td>
                            <td>900,000</td>
                            <td>1,000,000</td>
                            <td>800,000</td>
                            <td>900,000</td>
                            <td>2023-07-01</td>
                            <td>2023-07-07</td>
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
            </article>
        </div>
    );
};

export default assetsList;