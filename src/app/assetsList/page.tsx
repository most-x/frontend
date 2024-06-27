/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Link from 'next/link';
import { toComma } from '@/utils/util';
import DiscardEditPopup from '@/components/assetsDiscard/DiscardEditPopup';

export type AssetsSearchDataType = {
    assetRegistDate: string;
    assetStatus: string;
    bookValue: number;
    depreciationTotalprice: number;
    disposalAmount: number;
    disposalDate: string;
    ilsangProductCode: string;
    initialStartDate: string;
    productName: string;
    serialNumber: string;
    sno: number;
    wrmsAssetCode: string;
    wrmsItemCode: string;
    assetUsage: string;
    usefulLife: number;
    supplyPrice: number;
    depreciationCurrent: number;
    no: number;
};

 function assetsList() {
    
    const [assetsSearchData, setAssetsSearchData] = useState<AssetsSearchDataType[]>([]);
    const [selectAssetsData, setSelectAssetsData] = useState<AssetsSearchDataType[]>([]);

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [page, setPage]  = useState<number>(1);

    const [assetsSearchForm, setAssetsSearchForm] = useState({
        wrmsAssetCode: '',
        wrmsItemCode: '',
        serialNumber: '',
        ilsangProductCode: '',
        productName: '',
        priceType: '',
        minPrice: '',
        maxPrice: '',
        dateType: '',
        startDate: '',
        endDate: '',
        assetStatus: '',
        assetUsage: '',
        usefulLife: '',
        supplyPrice: '',
        depreciationCurrent: '',
        size: 10
    });

    console.log(selectAssetsData);
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (
            (name === 'startPrice' ||
                name === 'endPrice' ||
                name === 'depreciationCost' ||
                name === 'accumlatedDepreciation' ||
                name === 'bookValue') &&
            value !== ''
        ) {
            if (isNaN(Number(value))) {
                window.alert('숫자만 입력해주세요');
                return;
            }
            setAssetsSearchForm({
                ...assetsSearchForm,
                [name]: Number(value),
            });
            return;
        }
        setAssetsSearchForm({
            ...assetsSearchForm,
            [name]: value,
        });
    };

    const handleSelectOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setAssetsSearchForm({
            ...assetsSearchForm,
            [name]: value,
        });
    };
       
    const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .get(`https://japi.mostx.co.kr/api/assets/asset-search`, {
                params: {
                    ...assetsSearchForm,
                    page: 1,
                },
            })
            .then((res) => {
                console.log("res", res);
                setAssetsSearchData(res.data.contents);
                setTotalCnt(res.data.totalCnt);
                setTotalPage(res.data.totalPage);
				setPage(1);
            });
    };

    //이전페이지 이동
	const handleNextPage = () => {
		if (page === totalPage) return;
		setPage(page + 1);
	};

    //다음페이지 이동
	const handlePrevPage = () => {
		if (page === 1) return;
		setPage(page - 1);
	}

    useEffect(() => {
        if (isEditPopupOpen || isPopupOpen) return;
        axios
            .get(`https://japi.mostx.co.kr/api/assets/asset-search`, {
                params: {
                    ...assetsSearchForm,
                    page,
                },
            })
            .then((res) => {
                console.log("res", res);
                setAssetsSearchData(res.data.contents);
                setTotalCnt(res.data.totalCnt);
                setTotalPage(res.data.totalPage);
            });
    }, [page, isEditPopupOpen, isPopupOpen]);

    const handleEditClosePopup = () => {
        setIsEditPopupOpen(false);
    };
   
    return (                                            
        <div>
            <header>
            <h1><a href="/" className="logo">
                <img src="img/logo_w.svg" alt="모스트엑스 로고" /></a>자산 감가상각 관리
                <a href="/" className="exit">
                    <img src="img/exit.svg" alt="모스트엑스 로고" /></a></h1>
                    <nav>
                    <ul className="nav">
                         <li>
                            <Link href="/assets" legacyBehavior>
                                <a className="link">대시보드</a>
                            </Link>
                        </li>
                        <li className="on"><Link href="/assetsList" legacyBehavior><a className="link">자산 감가상각 현황</a></Link></li>
                        <li><Link href="/assetsCreate" legacyBehavior><a className="link">자산 등록</a></Link></li>
                        <li><Link href="/assetsDiscard" legacyBehavior><a className="link">자산 처분</a></Link></li>
                        <li><Link href="/assetView/0" legacyBehavior><a className="link"> 건별 자산 조회</a></Link></li>
                    </ul>
                </nav>			
            </header>

            <article className="status">
            <h2 className="sub_title">자산 감가상각 현황</h2>
            <section className="search_box">
                <h3>검색</h3>
                <details open>
                <form onSubmit={handleSearchFormSubmit} action="" className="search">
                    <div className="flex">
                    <ul className="search_list">
                        <li>
                            <label className="label" htmlFor="">
                                WRMS 자산코드
                            </label>
                            <input
                                type="text"
                                onChange={handleFormChange}
                                name={'wrmsAssetCode'}
                                value={assetsSearchForm.wrmsAssetCode}
                                className="m_text"
                                id="" />
                        </li>
                        <li>
                            <label className="label" htmlFor="">
                                WRMS 품목코드
                            </label>
                            <input 
                                type="text"
                                onChange={handleFormChange} 
                                name={'wrmsItemCode'}
                                value={assetsSearchForm.wrmsItemCode}
                                className="m_text"
                                id=""
                            />
                        </li>
                        <li>
                            <label className="label" htmlFor="">
                                일상구독 상품번호
                            </label>
                            <input 
                                type="text"
                                onChange={handleFormChange}
                                name={'ilsangProductCode'}
                                value={assetsSearchForm.ilsangProductCode}
                                className="m_text"
                                id=""
                            />
                        </li>
                        <li>
                            <label className="label" htmlFor="">
                                시리얼 번호
                            </label>
                            <input 
                                type="text"
                                onChange={handleFormChange}
                                name={'serialNumber'}
                                value={assetsSearchForm.serialNumber}
                                className="m_text"
                                id=""
                            />
                        </li>
                    </ul>
                    <ul className="search_list">
                        <li>
                            <h4 className="label">상태</h4>
                            <fieldset className="input_wrap">
                                <input
                                    type='radio'
                                    name="assetStatus"
                                    value={''}
                                    id="status01"
                                    defaultChecked
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="status01">전체</label>
                                <input
                                    type="radio"
                                    name="assetStatus"
                                    value={'정상'}
                                    id="status02"
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="status02">정상</label>
                                <input
                                    type="radio"
                                    name="assetStatus"
                                    value={'매각'}
                                    id="status03"
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="status03" className="sale">
                                    매각
                                </label>
                                <input
                                    type="radio"
                                    name="assetStatus"
                                    value={'폐기'}
                                    id="status04"
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="status04" className="disuse">
                                    폐기
                                </label>
                            </fieldset>
                        </li>
                        <li>
                            <h4 className="label">용도</h4>
                            <fieldset className="input_wrap">
                                <input
                                    type="radio"
                                    name="assetUsage"
                                    value={''}
                                    id="use01"
                                    defaultChecked
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="use01">전체</label>
                                <input
                                    type="radio"
                                    name="assetUsage"
                                    value={'구독'}
                                    id="use02"
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="use02">구독</label>
                                <input
                                    type="radio"
                                    name="assetUsage"
                                    value={'체험'}
                                    id="use03"
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="use03">체험</label>
                            </fieldset>
                        </li>
                        <li>
						<label className="label" htmlFor="">금액</label>
						<select
                            name="priceType"
                            onChange={handleSelectOptionChange}
                            value={assetsSearchForm.priceType}
                            id=""
                        >
							<option value="" selected>
                                선택
                            </option>
							<option value="supplyPrice">공급가</option>
							<option value="depreciationCost">감가상각비(당월)</option>
							<option value="depreciationTotalprice">감가상각 누계액</option>
							<option value="bookValue">장부가액</option>
						</select>
						<input
                            type="text"
                            id=""
                            onChange={handleFormChange}
                            name={'minPrice'}
                            value={assetsSearchForm.minPrice}
                            className="s_text"
                            placeholder="최소금액"
                        />
						<span>-</span>
						<input
                            type="text"
                            id=""
                            onChange={handleFormChange}
                            name={'maxPrice'}
                            value={assetsSearchForm.maxPrice}
                            className="s_text"
                            placeholder="최대금액"
                        />
					</li>
                    <li>
                        <label className="label" htmlFor="">
                            일자
                        </label>
                        <select
                            name="dateType"
                            value={assetsSearchForm.dateType}
                            onChange={handleSelectOptionChange}
                            id=""
                        >
                            <option value="" selected>
                                선택
                            </option>
                            <option value="assetRegistDate">등록일자</option>
                            <option value="initialStartDate">최초개시일자</option>
                        </select>
                        <input
                            type="date"
                            id=""
                            onChange={handleFormChange}
                            name={'startDate'}
                            value={assetsSearchForm.startDate}
                            className="s_text"
                            placeholder="시작일"
                            max="9999-12-31"
                        />
                        <span>-</span>
                        <input
                            type="date"
                            id=""
                            onChange={handleFormChange}
                            name={'endDate'}
                            value={assetsSearchForm.endDate}
                            className="s_text"
                            placeholder="종료일"
                            max="9999-12-31"
                        />
                    </li>
					<li className="hidden">
						<label className="label" htmlFor="">창고번호</label>
						<input type="text" id="" className="m_text" />
					</li>
				</ul>
				</div>
				<ul className="search_list_full border_top_none">
					<li>
						<label className="label" htmlFor="">상품명</label>
						<input 
                            type="text"
                            onChange = {handleFormChange}
                            name={'productName'}
                            value={assetsSearchForm.productName}
                            className="l_text"
                            id="" />
					</li>
				</ul>
                    <button className="btn" type="submit">조회하기</button>
                </form>
                    <summary></summary>	
                </details>
            </section>
            {assetsSearchData.length !== 0 && totalCnt && (
            <section>
                <h3 className="hidden">결과표</h3>
                <div className="table_top">
                    {/* <p>총 1,595개</p> */}
                    <p> 총 {toComma(String(totalCnt))} 개 </p>
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
                            {/* <th>창고번호</th> */}
                            {/* <th>발주단가(VAT+)</th> */}
                            <th>공급가</th>
                            {/* <th>발주단가(VAT-)</th> */}
                            <th>내용연수(년)</th>
                            <th>감가상각비(당월)</th>
                            <th>감가상각 누계액</th>
                            <th>장부가액</th>
                            <th>최초개시일자
                                <p className="tooltip">일상구독에서 상품이 최초로 주문 접수된 날짜입니다.</p>
                            </th>
                            <th>등록일자</th>
                        </tr>
                        {assetsSearchData.map((data, index) => {
                            return(
                                <tr 
                                    key={data.sno}
                                    className={
                                        data.assetStatus === '매각'
                                        ? 'sale'
                                        :data.assetStatus === '폐기'
                                        ? 'disuse'
                                        : ''
                                    }    
                                >
                                    <td>{data.no}</td>
                                    <td>{data.assetStatus}</td>
                                    <td>{data.assetUsage}</td>
                                    <td>
                                        <Link href={`/assetView/${data.sno}`}>{data.wrmsAssetCode}</Link>
                                    </td>
                                    <td>{data.wrmsItemCode}</td>
                                    <td>{data.ilsangProductCode}</td>
                                    <td>{data.serialNumber}</td>
                                    <td className="left">
                                        <button
                                            type="button"
                                            //onClick={handleEditOpenPopup}
                                            onClick={() => setIsEditPopupOpen(true)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {data.productName}
                                        </button>
                                    </td>
                                    {/* <td>{asset.warehouseNumber}</td> */}
                                    <td className="right">{data.supplyPrice && toComma(String(data.supplyPrice))}</td>
                                    {/* <td>{ toComma(asset.vat) }</td> */}
                                    <td>{data.usefulLife}</td>
                                    <td className="right">{data.depreciationCurrent && toComma(String(data.depreciationCurrent))}</td>
                                    <td className="right">{data.depreciationTotalprice && toComma(String(data.depreciationTotalprice))}</td>
                                    <td className="right">{data.bookValue && toComma(String(data.bookValue))}</td>
                                    <td>{data.initialStartDate}</td>
                                    <td>{data.assetRegistDate}</td>
                                </tr>
                            );
                        })}
                    </thead>
                </table>
                <div className="center_flex page">
                    <a href="#" onClick={() => setPage(1)}>처음</a>
                    <a href="#" onClick={handlePrevPage}>&nbsp;〈&nbsp;&nbsp;&nbsp;</a>
                    {
                        // total 페이지로 페이지네이션 뷰 구현해줘
                        new Array(totalPage).fill(0).map((_, index) => {
                            return (
                                <a
                                    href="#"
                                    className={page === index + 1 ? 'on' : ''}
                                    onClick={() => setPage(index + 1)}
                                    key={index}
                                >
                                    {index + 1}
                                </a>
                            );
                        })
                    }
                    <a href="#" onClick={handleNextPage}>&nbsp;&nbsp;&nbsp;〉&nbsp;</a>
                    <a href="#" onClick={() => setPage(totalPage)}>끝</a>
                </div>
            </section>
            )}

            </article>
        </div>
    );
}

export default assetsList;