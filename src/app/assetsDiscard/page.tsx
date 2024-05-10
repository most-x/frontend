/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toComma } from '@/utils/util';
import DiscardEditPopup from '@/components/assetsDiscard/DiscardEditPopup';

export type AssetsDiscardSearchDataType = {
    assetRegistDate: string;
    assetStatus: string;
    bookValue: number;
    depreciationTotalprice: number;
    disposalAmount: number;
    disposalDate: string;
    ilsangProductCode: string;
    initialStartDate: string;
    productName: string;
    saleAmount: number;
    saleDate: string;
    saleMargin: number;
    saleMarginRate: number;
    serialNumber: string;
    sno: number;
    wrmsAssetCode: string;
    wrmsItemCode: string;
};

function assetsDiscard() {
    const [discardSelected, setDiscardSelected] = useState([]);

    const [assetsEditId, setAssetsEditDataId] = useState<number>();

    const [assetsSearchData, setAssetsSearchData] = useState<AssetsDiscardSearchDataType[]>([]);
    const [selectDiscardData, setSelectDiscardData] = useState<AssetsDiscardSearchDataType[]>([]);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDiscardPopupOpen, setIsDiscardPopupOpen] = useState(false);

    const [assetsDiscardSearchForm, setAssetsDiscardSearchForm] = useState({
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
        size: 10,
    });

	const [discardForm, setDiscardForm] = useState({
		disposalDate: '',
		disposalAmount: '',
	})

    console.log(selectDiscardData);
    const handleDiscardFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setAssetsDiscardSearchForm({
                ...assetsDiscardSearchForm,
                [name]: Number(value),
            });
            return;
        }
        setAssetsDiscardSearchForm({
            ...assetsDiscardSearchForm,
            [name]: value,
        });
    };

    const handleSelectDiscardData = (e: React.ChangeEvent<HTMLInputElement>, data: AssetsDiscardSearchDataType) => {
        const { checked } = e.target;
        if (checked) {
            setSelectDiscardData([...selectDiscardData, data]);
        } else {
            setSelectDiscardData(selectDiscardData.filter((item) => item.sno !== data.sno));
        }
    };

    const handleDiscardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'disposalAmount') {
            if (isNaN(Number(value))) {
                window.alert('숫자만 입력해주세요');
                return;
            } else {
				setDiscardForm((prev) => ({...prev, [name]: value}));
                setSelectDiscardData(
                    selectDiscardData.map((item) => {
                        return {
                            ...item,
                            [name]: Number(value),
                        };
                    })
                );
                return;
            }
        } else {
			setDiscardForm((prev) => ({...prev, [name]: value}));
            setSelectDiscardData(
                selectDiscardData.map((item) => {
                    return {
                        ...item,
                        [name]: value,
                    };
                })
            );
        }
    };

    const handleSelectDiscardUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const editData = selectDiscardData.map((item) => {
            return {
                sno: item.sno,
                initialStartDate: item.initialStartDate,
                saleDate: item.saleDate,
                saleAmount: item.saleAmount,
                disposalDate: item.disposalDate,
                disposalAmount: item.disposalAmount,
            };
        });

        axios.patch('https://japi.mostx.co.kr/api/assets/asset-update', editData).then((res) => {
            console.log(res);
            // handleSetAssetData(res.data);
            setIsDiscardPopupOpen(false);
            setSelectDiscardData([]);
            window.alert('일괄 폐기 처리되었습니다.');
        });
        return;
    };

    const handleAllSelectDiscardData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (checked) {
            setSelectDiscardData(assetsSearchData);
        } else {
            setSelectDiscardData([]);
        }
    };

    const handleSelectOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setAssetsDiscardSearchForm({
            ...assetsDiscardSearchForm,
            [name]: value,
        });
    };

    const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .get(`https://japi.mostx.co.kr/api/assets/asset-disposal-search`, {
                params: {
                    ...assetsDiscardSearchForm,
                    page: 1,
                },
            })
            .then((res) => {
                console.log(res);
                setAssetsSearchData(res.data.contents);
                setTotalCnt(res.data.totalCnt);
                setTotalPage(res.data.totalPage);
				setPage(1);
            });
    };

	const handleNextPage = () => {
		if (page === totalPage) return;
		setPage(page + 1);
	}

	const handlePrevPage = () => {
		if (page === 1) return;
		setPage(page - 1);
	}

    const handleEditOpenPopup = () => {
        setIsEditPopupOpen(true);
    };
    const handleEditClosePopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleDiscardPopupOpen = () => {
        if (selectDiscardData.length === 0) {
            window.alert('폐기할 항목을 선택해주세요');
            return;
        }
        setIsDiscardPopupOpen(true);
    };

    useEffect(() => {
        if (isEditPopupOpen || isDiscardPopupOpen) return;
        axios
            .get(`https://japi.mostx.co.kr/api/assets/asset-disposal-search`, {
                params: {
                    ...assetsDiscardSearchForm,
                    page,
                },
            })
            .then((res) => {
                console.log(res);
                setAssetsSearchData(res.data.contents);
                setTotalCnt(res.data.totalCnt);
                setTotalPage(res.data.totalPage);
            });
    }, [page, isEditPopupOpen, isDiscardPopupOpen]);

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
                            <Link href="/assetsList" legacyBehavior>
                                <a className="link">자산 감가상각 현황</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/assetsCreate" legacyBehavior>
                                <a className="link">자산 등록</a>
                            </Link>
                        </li>
                        <li className="on">
                            <Link href="/assetsDiscard" legacyBehavior>
                                <a className="link">자산 처분</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/assetView/0" legacyBehavior>
                                <a className="link"> 건별 자산 조회</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <article className="status">
                <h2 className="sub_title">자산 처분</h2>
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
                                            onChange={handleDiscardFormChange}
                                            name={'wrmsAssetCode'}
                                            value={assetsDiscardSearchForm.wrmsAssetCode}
                                            className="m_text"
                                            id=""
                                        />
                                    </li>
                                    <li>
                                        <label className="label" htmlFor="">
                                            WRMS 품목코드
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleDiscardFormChange}
                                            name={'wrmsItemCode'}
                                            value={assetsDiscardSearchForm.wrmsItemCode}
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
                                            onChange={handleDiscardFormChange}
                                            name={'ilsangProductCode'}
                                            value={assetsDiscardSearchForm.ilsangProductCode}
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
                                            onChange={handleDiscardFormChange}
                                            name={'serialNumber'}
                                            value={assetsDiscardSearchForm.serialNumber}
                                            className="m_text"
                                            id=""
                                        />
                                    </li>
                                </ul>
                                <ul className="search_list">
                                    <li>
                                        <label className="label" htmlFor="">
                                            상품명
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleDiscardFormChange}
                                            name={'productName'}
                                            value={assetsDiscardSearchForm.productName}
                                            className="l_text"
                                            id=""
                                        />
                                    </li>
                                    <li>
                                        <h4 className="label">상태</h4>
                                        <fieldset className="input_wrap">
                                            <input
                                                type="radio"
                                                name="assetStatus"
                                                value={''}
                                                id="status01"
                                                defaultChecked
                                                onChange={handleDiscardFormChange}
                                            />
                                            <label htmlFor="status01">전체</label>
                                            <input
                                                type="radio"
                                                name="assetStatus"
                                                value={'정상'}
                                                id="status02"
                                                onChange={handleDiscardFormChange}
                                            />
                                            <label htmlFor="status02">정상</label>
                                            <input
                                                type="radio"
                                                name="assetStatus"
                                                value={'매각'}
                                                id="status03"
                                                onChange={handleDiscardFormChange}
                                            />
                                            <label htmlFor="status03" className="sale">
                                                매각
                                            </label>
                                            <input
                                                type="radio"
                                                name="assetStatus"
                                                value={'폐기'}
                                                id="status04"
                                                onChange={handleDiscardFormChange}
                                            />
                                            <label htmlFor="status04" className="disuse">
                                                폐기
                                            </label>
                                        </fieldset>
                                    </li>
                                    <li>
                                        <label className="label" htmlFor=""> 금액 </label>
                                        <select
                                            name=""
                                            onChange={handleSelectOptionChange}
                                            value={assetsDiscardSearchForm.priceType}
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
                                            onChange={handleDiscardFormChange}
                                            name={'minPrice'}
                                            value={assetsDiscardSearchForm.minPrice}
                                            className="s_text"
                                            placeholder="최소금액"
                                        />
                                        <span>-</span>
                                        <input
                                            type="text"
                                            id=""
                                            onChange={handleDiscardFormChange}
                                            name={'maxPrice'}
                                            value={assetsDiscardSearchForm.maxPrice}
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
                                            value={assetsDiscardSearchForm.dateType}
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
                                            onChange={handleDiscardFormChange}
                                            name={'startDate'}
                                            value={assetsDiscardSearchForm.startDate}
                                            className="s_text"
                                            placeholder="시작일"
                                        />
                                        <span>-</span>
                                        <input
                                            type="date"
                                            id=""
                                            onChange={handleDiscardFormChange}
                                            name={'endDate'}
                                            value={assetsDiscardSearchForm.endDate}
                                            className="s_text"
                                            placeholder="종료일"
                                        />
                                    </li>
                                </ul>
                            </div>
                            <button className="btn" type="submit">
                                조회하기
                            </button>
                        </form>
                        <summary></summary>
                    </details>
                </section>
                {assetsSearchData.length !== 0 && totalCnt && (
                    <section>
                        <h3 className="hidden">결과표</h3>
                        <div className="table_top">
                            <div className="center_flex">
                                <p>총 {toComma(String(totalCnt))}개</p>
                                <form action="" className="table_select">
                                    {/* <select name="" id="">
							<option value="">상태 선택</option>
							<option value="">정상</option>
							<option value="">매각</option>
							<option value="">폐기</option>
							<option value="">수리</option>
							<option value="">파손</option>
							</select> */}
                                    <button
                                        type="button"
                                        className="btn blue_back select_btn"
                                        onClick={handleDiscardPopupOpen}
                                    >
                                        폐기 일괄적용
                                    </button>
                                </form>
                            </div>
                            <p>(단위 : 원)</p>
                        </div>
                        <table className="table">
                            <thead>
                                {/* 상태별 tr class // 
					매각 : sale
					폐기 : disuse */}
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={selectDiscardData.length === assetsSearchData.length}
                                            onChange={handleAllSelectDiscardData}
                                        />
                                    </th>
                                    <th>상태</th>
                                    <th>WRMS 자산코드</th>
                                    <th>WRMS 품목코드</th>
                                    <th>일상구독 상품번호</th>
                                    <th>시리얼 번호</th>
                                    <th>상품명</th>
                                    <th>등록일자</th>
                                    <th>최초개시일자</th>
                                    <th>장부가액</th>
                                    <th>
                                        감가상각 누계액
                                        <p className="tooltip">
                                            감가상각주기 : 최초개시일로 부터 30일마다 진행
                                            <br />
                                            <br />
                                            감가상각액 = <br />
                                            공급가 ÷ 내용연수 (마지막 개월에 차액 일괄 처리)
                                        </p>
                                    </th>
                                    <th>
                                        매각/폐기금액
                                        <p className="tooltip">매각/폐기금액은 감가상각 누계액과 동일합니다.</p>
                                    </th>
                                    <th>매각/폐기일자</th>
                                    <th className="th_back">매각(인수)손익액</th>
                                    <th className="th_back">이익률(%)</th>
                                </tr>
                                {assetsSearchData.map((data, index) => {
                                    const isChecked = selectDiscardData.some((item) => item.sno === data.sno);
                                    return (
                                        <tr key={data.sno} onClick={() => setAssetsEditDataId(data.sno)}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => handleSelectDiscardData(e, data)}
                                                />
                                            </td>
                                            <td>{data.assetStatus}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="popup_on"
                                                    onClick={handleEditOpenPopup}
                                                >
                                                    {data.wrmsAssetCode}
                                                </button>
                                            </td>
                                            <td>{data.wrmsItemCode}</td>
                                            <td>{data.ilsangProductCode}</td>
                                            <td>{data.serialNumber}</td>
                                            <td className="left">{data.productName}</td>
                                            <td>{data.assetRegistDate}</td>
                                            <td>{data.initialStartDate}</td>
                                            <td className="right">{data.bookValue && toComma(String(data.bookValue))}</td>
                                            <td className="right">
                                                {data.depreciationTotalprice &&
                                                    toComma(String(data.depreciationTotalprice))}
                                            </td>
                                            <td className="right">{data.disposalAmount && toComma(String(data.disposalAmount))}</td>
                                            <td>{data.disposalDate}</td>
                                            <td className="right">{data.saleMargin && toComma(String(data.saleMargin))}</td>
                                            <td>{data.saleMarginRate}</td>
                                        </tr>
                                    );
                                })}
                            </thead>
                        </table>
                        <div className="center_flex page">
                            <span onClick={() => setPage(1)}>처음</span>
                            <span onClick={handlePrevPage}>&nbsp;〈&nbsp;&nbsp;&nbsp;</span>
                            {
                                // total 페이지로 페이지네이션 뷰 구현해줘
                                new Array(totalPage).fill(0).map((_, index) => {
                                    return (
                                        <span
                                            className={page === index + 1 ? 'on' : ''}
                                            onClick={() => setPage(index + 1)}
                                            key={index}
                                        >
                                            {index + 1}
                                        </span>
                                    );
                                })
                            }
                            <span onClick={handleNextPage}>&nbsp;&nbsp;&nbsp;〉&nbsp;</span>
                            <span onClick={() => setPage(totalPage)}>끝</span>
                        </div>
                    </section>
                )}

                {isEditPopupOpen && assetsEditId && (
                    <DiscardEditPopup id={assetsEditId} handleEditClosePopup={handleEditClosePopup} />
                )}

                {isDiscardPopupOpen && (
                    <section className="sel_popup on popup1 input_box minpop">
                        <h3>
                            폐기 일괄적용
                            <button
                                type="button"
                                className="sel_popup_close"
                                onClick={() => setIsDiscardPopupOpen(false)}
                            ></button>
                        </h3>
                        <form action="" onSubmit={handleSelectDiscardUpdate}>
                            <div className="search">
                                <h4 className="hidden">폐기 정보</h4>
                                <ul className="input_list">
                                    <li>
                                        <label className="label" htmlFor="">
                                            실제폐기일자
                                        </label>
                                        <input
                                            type="date"
                                            name="disposalDate"
                                            onChange={handleDiscardInputChange}
											value={discardForm.disposalDate}
                                            className="m_text"
                                            id=""
                                        />
                                    </li>
                                    <li>
                                        <label className="label" htmlFor="">
                                            실제폐기금액
                                        </label>
                                        <input
                                            type="text"
                                            name="disposalAmount"
                                            onChange={handleDiscardInputChange}
											value={discardForm.disposalAmount}
                                            className="m_text"
                                            id=""
                                        />
                                    </li>
                                </ul>
                            </div>
                            <button className="btn blue_back popup_save" type="submit">
                                적용
                            </button>
                        </form>
                    </section>
                )}
            </article>
        </div>
    );
}

export default assetsDiscard;
