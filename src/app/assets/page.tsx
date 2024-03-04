/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Link from 'next/link';

function assetsList() {

    const assetsDashboard = `http://31.152.254.254:9000/api/assets/dashboard`

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/ ${today.getMonth() + 1}/ ${today.getDate()}`; 

    return (
        <div>
        <header>
            <h1><a href="index.html" className="logo">
                <img src="img/logo_w.svg" alt="모스트엑스 로고" /></a>자산 감가상각 관리
                <a href="index.html" className="exit">
                    <img src="img/exit.svg" alt="모스트엑스 로고" /></a></h1>
            <nav>
                <ul className="nav">
                    <li><Link className="link" href="/assetsList" legacyBehavior><a>자산 감가상각 현황</a></Link></li>
                    <li><Link className="link" href="/assetsCreate" legacyBehavior><a>자산 등록</a></Link></li>
                    <li><Link className="link" href="/assetsDiscard" legacyBehavior><a>자산 처분</a></Link></li>
                    <li><Link className="link" href="" legacyBehavior><a>건별 자산 조회</a></Link></li>
                </ul>
            </nav>			
        </header>
            <article className="dashboard">
            <section className="list" style = {{ marginTop:"100px" }}>
                <ul className="num center_flex">
                    <li>
                        <h3>총 자산</h3>
                        <p>1,595</p>
                    </li>
                    <li>
                        <h3>정상</h3>
                        <p>1,332</p>
                        <ul className="center_flex list_btm">
                            <li>개시<strong>1,002</strong></li>
                            <li className="blank"><span>|</span></li>
                            <li>미개시<strong>330</strong></li>
                        </ul>
                    </li>
                    <li>
                        <h3>매각</h3>
                        <p>260</p>
                    </li>
                    <li>
                        <h3>폐기</h3>
                        <p>3</p>
                    </li>
                </ul>
            </section>
            <section className="list hidden">
                <ul className="num center_flex gray_back">
                    <li>
                        <h3>매각</h3>
                        <p>154</p>
                    </li>
                    <li>
                        <h3>폐기</h3>
                        <p>109</p>
                    </li>
                    <li>
                        <h3>수리</h3>
                        <p>1</p>
                    </li>
                    <li>
                        <h3>파손</h3>
                        <p>0</p>
                    </li>
                </ul>
            </section>
            <section className="center_flex btm">
                <h3>감가상각</h3>
                <ul className="btm_num">
                    <li>
                        <h4>총금액</h4>
                        <p>19,569,478원</p>
                    </li>
                    <li>
                        <h4>누계액</h4>
                        <p>12,223,000원</p>
                    </li>
                    <li>
                        <h4>장부가액</h4>
                        <p>10,000,999원</p>
                    </li>
                </ul>
            </section>
            <p className="btm_txt">기준일시 {formattedDate} 15:00:00</p>
        </article>
    </div>
        );
    };

export default assetsList;