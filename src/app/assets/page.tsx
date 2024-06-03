/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Link from 'next/link';
import { toComma } from '@/utils/util';


function assetsDashboard() {

    const assetsAPIUrl = `https://japi.mostx.co.kr/api/assets/dashboard`

    const [totalAsset, setTotalAsset] = useState();  // 총 자산
    const [normalAsset, setNormalAsset] = useState(); //정상
    const [openingdayAsset, setOpeningdayAsset] = useState(); //개시
    const [disposalAsset, setDisposalAsset] = useState(); //매각
    const [disuseAsset, setDisuseAsset] = useState();  //폐기
    const [nonOpeningdayAsset, setNonOpeningdayAsset] = useState(); //미개시
    const [totalPrice, setTotalPrice] = useState();  //총 금액
    const [sumTotalPrice, setSumTotalPrice] = useState(); //누계액
    const [bookValue, setBookValue] = useState(); //장부가액

    useEffect(() => {
        getAssetDashboard();
    }, []);


    async function getAssetDashboard() {
        await axios
            .get(assetsAPIUrl)
            .then((response) => {
                console.log(response.data[0]);
                setTotalAsset(response.data[0].totalAsset)
                setNormalAsset(response.data[0].assetNormal)
                setOpeningdayAsset(response.data[0].assetStart)
                setDisposalAsset(response.data[0].assetSale)
                setDisuseAsset(response.data[0].assetDispose)
                setNonOpeningdayAsset(response.data[0].assetNonStart)
                setTotalPrice(response.data[0].totalPriceAsset)
                setSumTotalPrice(response.data[0].sumDepreciationAsset)
                setBookValue(response.data[0].bookValueAsset)
            })

    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/ ${today.getMonth() + 1}/ ${today.getDate()}`; 

    return (
        <div>
        <header>
            <h1><a href="/" className="logo">
                <img src="img/logo_w.svg" alt="모스트엑스 로고" /></a>자산 감가상각 관리
                <a href="/" className="exit">
                    <img src="img/exit.svg" alt="모스트엑스 로고" /></a></h1>
                    <nav>
                    <ul className="nav">
                        <li className="on">
                            <Link href="/assets" legacyBehavior>
                                <a className="link">대시보드</a>
                            </Link>
                        </li>
                        <li><Link href="/assetsList" legacyBehavior><a className="link">자산 감가상각 현황</a></Link></li>
                        <li><Link href="/assetsCreate" legacyBehavior><a className="link">자산 등록</a></Link></li>
                        <li><Link href="/assetsDiscard" legacyBehavior><a className="link">자산 처분</a></Link></li>
                        <li><Link href="/assetView/0" legacyBehavior><a className="link"> 건별 자산 조회</a></Link></li>
                    </ul>
                </nav>			
	
        </header>
            <article className="dashboard">
            <section className="list" style = {{ marginTop:"100px" }}>
                <ul className="num center_flex">
                    <li>
                        <h3>총 자산</h3>
                        <p>{totalAsset && toComma(String(totalAsset))}<span className="gun">건</span></p>
                    </li>
                    <li>
                        <h3>정상</h3>
                        <p> {normalAsset}<span className="gun">건</span></p>
                        <ul className="center_flex list_btm">
                            <li>개시<strong> {openingdayAsset && toComma(String(openingdayAsset)) }건</strong></li>
                            <li className="blank"><span>|</span></li>
                            <li>미개시<strong> {nonOpeningdayAsset && toComma(String(nonOpeningdayAsset))}건</strong></li>
                        </ul>
                    </li>
                    <li className="sale">
                        <h3>매각</h3>
                        <p> {disposalAsset && toComma(String(disposalAsset))}<span className="gun">건</span></p>
                    </li>
                    <li className="disuse">
                        <h3>폐기</h3>
                        <p> { disuseAsset && toComma(String(disuseAsset))}<span className="gun">건</span></p>
                    </li>
                </ul>
            </section>
            <section className="list hidden">
                <ul className="num center_flex gray_back">
                    <li className="sale">
                        <h3>매각</h3>
                        <p>154<span className="gun">건</span></p>
                    </li>
                    <li className="disuse">
                        <h3>폐기</h3>
                        <p>109<span className="gun">건</span></p>
                    </li>
                    <li>
                        <h3>수리</h3>
                        <p>1<span className="gun">건</span></p>
                    </li>
                    <li>
                        <h3>파손</h3>
                        <p>0<span className="gun">건</span></p>
                    </li>
                </ul>
            </section>
            <section className="center_flex btm">
                <h3>감가상각</h3>
                <ul className="btm_num">
                    <li>
                        <h4>공급총액</h4>
                        <p>{totalPrice && toComma(String(totalPrice))}원</p>
                    </li>
                    <li>
                        <h4>누계액</h4>
                        <p>{sumTotalPrice && toComma(String(sumTotalPrice))}원</p>
                    </li>
                    <li>
                        <h4>장부가액</h4>
                        <p>{bookValue && toComma(String(bookValue))}원</p>
                    </li>
                </ul>
            </section>
            <p className="btm_txt">기준일시 {formattedDate} 04:00:00</p>
        </article>
    </div>
        );
    };

export default assetsDashboard;