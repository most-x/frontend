/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Link from 'next/link';
import { KIND, STATUS } from '@/utils/constants';
import { toComma } from '@/utils/util';

 function assetsList() {
    
    const assetsListAPIUrl = `https://japi.mostx.co.kr/api/assets`
    const [assetsDatas, setAssetsDatas] = useState<any[]>([]);

    const [selectedStatus, setselectedStatus] = useState("status01");
    const [selectedKind, setselectedKind] = useState("use01");

    const [limit, setLimit] =useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const pageLimit = 10;

    const handleStatusChange = (event: any) => {
        console.log(event.target.id);
        setselectedStatus(event.target.id);
    }

    const handleKindChage = (event: any) => {
        console.log(event.target.id);
        setselectedKind(event.target.id);
    }

    useEffect(() => {
        const params: any = {
            page: currentPage,
            limit: limit
        }
        getAssetsList();
    }, []);

    async function getAssetsList() {
        await axios
            .get(assetsListAPIUrl)
            .then((res: {data: {asstesData: any }}) => {
                console.log(res.data.contents);
                setAssetsDatas(res.data.contents);
            });
    }
   
    return (                                            
        <div>
            <header>
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
                                    STATUS.map((status) => (
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
                                    KIND.map((kind) => (
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
                            <th>창고번호</th>
                            <th>발주단가(VAT+)</th>
                            <th>발주단가(VAT-)</th>
                            <th>감가상각비(당월)</th>
                            <th>감가상각 누계액</th>
                            <th>장부가액</th>
                            <th>자산등록일자</th>
                            <th>최초개시일자</th>
                        </tr>
                        {
                            Object.values(assetsDatas).map((asset, idx) => (
                                <tr key={idx}>
                                    <td>{asset.no}</td>
                                    <td>{asset.assetStatus}</td>
                                    <td>{asset.assetUsage}</td>
                                    <td>{asset.wrmsAssetCode}</td>
                                    <td>{asset.wrmsItemCode}</td>
                                    <td>{asset.ilsangProductCode}</td>
                                    <td>{asset.serialNumber}</td>
                                    <td>{asset.productName}</td>
                                    <td>{asset.warehouseNumber}</td>
                                    <td>{ toComma(asset.supplyPrice)}</td>
                                    <td>{ toComma(asset.vat) }</td>
                                    <td>{ toComma(String(asset.depreciationCurrent)) }</td>
                                    <td>{ toComma(String(asset.depreciationTotalprice)) }</td>
                                    <td>{asset.bookValue}</td>
                                    <td>{asset.assetRegistDate}</td>
                                    <td>{asset.initialStartDate}</td>
                                </tr>
                            ))
                        }
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