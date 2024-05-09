/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'react-router-dom';
import { deprecate } from 'util';
import EditPopup from '@/components/assetView/EditPopup';
import { toComma } from '@/utils/util';

type AssetViewParamsType = {
    params: {
        id: string;
    };
};

export interface AssetDataType {
    assetRegistDate: string;
    assetStatus: string;
    assetUsage: string;
    bookValue: number;
    depreciationCurrent: number;
    depreciationTotalprice: number;
    disposalAmount: number;
    disposalDate: string;
    ilsangProductCode: string;
    initialStartDate: string;
    no: number;
    productName: string;
    registDepartment: string;
    registName: string;
    saleAmount: number;
    saleDate: string;
    saleMargin: number;
    saleMarginRate: number;
    salesRecognitionAmount: number;
    serialNumber: string;
    sno: number;
    supplyPrice: number;
    usefulLife: number;
    wrmsAssetCode: string;
    wrmsItemCode: string;
}

type AssetDepreciationType = {
    contents: AssetDepreciationDataType[];
    totalCnt: number;
    totalPage: number;
};

type AssetDepreciationDataType = {
    accumlatedDepreciation: number;
    bookValue: number;
    depreciationCost: number;
    depreciationDate: string;
    no: number;
    sno: number;
    supplyPrice: number;
};

function assetView({ params }: AssetViewParamsType) {
    const { id } = params;

    console.log('sno', id);
    const [idx, setIdx] = useState<string>(id);
    const [assetData, setAssetData] = useState<AssetDataType>();
    const [assetDepreciation, setAssetDepreciation] = useState<AssetDepreciationType>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const [searchPopupData, setSearchPopupData] = useState<AssetDataType[]>([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    const [searchForm, setSearchForm] = useState({
        wrmsAssetCode: '',
        wrmsItemCode: '',
        ilsangProductCode: '',
        serialNumber: '',
        productName: '',
    });

    const handleSearchFormTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchForm({
            ...searchForm,
            [name]: value,
        });
    };

    const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .get('https://japi.mostx.co.kr/api/assets/asset-depreciation-search', {
                params: searchForm,
            })
            .then((res) => {
                {
                    setSearchPopupData(res.data.data);
                    setIsSearchPopupOpen(true);
                }
            });
    };

    //TODO 선택한 상품의 아이디할당
    const handleSetAssetData = (asset: AssetDataType) => {
        console.log(asset);
        setAssetData(asset);
        setIsSearchPopupOpen(false);
        setIdx(String(asset.sno));
    };

    const handleEditPopupClose = () => {
        setIsEditPopupOpen(false);
    };

    useEffect(() => {
        if (!idx || idx === '0') return;
        const getAsset = async () => {
            const { data } = await axios.get(`https://japi.mostx.co.kr/api/assets/${idx}`);
            console.log(data);
            return data;
        };
        getAsset()
            .then((result) => setAssetData(result))
            .then(() => setIsLoaded(true));
    }, [idx]);

    useEffect(() => {
        console.log(idx);
        if (!idx || idx === '0') return;
        const getDepreciation = async () => {
            const { data } = await axios.get(`https://japi.mostx.co.kr/api/assets/asset-depreciation/${idx}`);
            console.log(data);
            return data;
        };
        getDepreciation()
            .then((result) => setAssetDepreciation(result))
            .then(() => setIsLoaded(true));
    }, [idx]);

    return (
        <div>
            <header>
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
                        <li>
                            <Link href="/assetsDiscard" legacyBehavior>
                                <a className="link">자산 처분</a>
                            </Link>
                        </li>
                        <li className="on">
                            <Link href="/assetView/0" legacyBehavior>
                                <a className="link"> 건별 자산 조회</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <article className="status">
                <h2 className="sub_title">건별 자산 조회</h2>
                <section className="search_box">
                    <h3>
                        검색<span className="h3_info">조회하실 자산을 검색해주세요.</span>
                    </h3>
                    <details open>
                        <form action="" onSubmit={handleSearchFormSubmit} className="search">
                            <div className="flex">
                                <ul className="search_list_full">
                                    <li>
                                        <label className="label" htmlFor="">
                                            WRMS 자산코드
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleSearchFormTextChange}
                                            value={searchForm.wrmsAssetCode}
                                            name="wrmsAssetCode"
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
                                            onChange={handleSearchFormTextChange}
                                            value={searchForm.wrmsItemCode}
                                            name="wrmsItemCode"
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
                                            onChange={handleSearchFormTextChange}
                                            value={searchForm.ilsangProductCode}
                                            name="ilsangProductCode"
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
                                            onChange={handleSearchFormTextChange}
                                            value={searchForm.serialNumber}
                                            name="serialNumber"
                                            className="m_text"
                                            id=""
                                        />
                                    </li>
                                    <li>
                                        <label className="label" htmlFor="">
                                            상품명
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleSearchFormTextChange}
                                            value={searchForm.productName}
                                            name="productName"
                                            className="l_text"
                                            id=""
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
                <section className="search search_box search_mid">
                    <h3 className="hidden">자산 상세 정보</h3>
                    <div className="flex border_btm_none">
                        <ul className="search_list">
                            <li>
                                <h5 className="label">상태</h5>
                                <p className="text">{assetData?.assetStatus || '-'}</p>
                                {/* <p className="text sale">매각</p>
								<p className="text disuse">폐기</p> */}
                            </li>
                            <li>
                                <h5 className="label">용도</h5>
                                <p className="text">{assetData?.assetUsage || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">WRMS 자산코드</h5>
                                <p className="text">{assetData?.wrmsAssetCode || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">WRMS 품목코드</h5>
                                <p className="text">{assetData?.wrmsItemCode || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">일상구독 상품번호</h5>
                                <p className="text">{assetData?.ilsangProductCode || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">시리얼 번호</h5>
                                <p className="text">{assetData?.serialNumber || '-'}</p>
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
                                <p className="text">{assetData?.usefulLife ? `${assetData?.usefulLife}년` : '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">공급가</h5>
                                <p className="text">{assetData?.supplyPrice && toComma(String(assetData?.supplyPrice)) || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">장부가액</h5>
                                <p className="text">{assetData?.bookValue && toComma(String(assetData?.bookValue)) || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">최초개시일자</h5>
                                <p className="text">{assetData?.initialStartDate || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">최초등록일자</h5>
                                <p className="text">{assetData?.assetRegistDate || '-'}</p>
                            </li>
                            <li>
                                <h5 className="label">등록자 정보</h5>
                                <p className="text">
                                    {assetData?.registName} {assetData?.registDepartment || '-'}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <ul className="search_list_full border_s">
                        <li>
                            <h5 className="label">상품명</h5>
                            <p className="text">{assetData?.productName}</p>
                        </li>
                    </ul>
                    {assetData && (
                        <button className="popup_on right_btn" type="button" onClick={() => setIsEditPopupOpen(true)}>
                            수정하기
                        </button>
                    )}
                </section>
                {isLoaded && assetDepreciation?.contents.length !== 0 && (
                    <section>
                        <h3>월별 감가상각</h3>
                        <br />
                        <div className="table_top">
                            <p>총 {assetDepreciation?.totalCnt}개</p>
                            <p>(단위 : 원)</p>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>
                                        감가상각일자
                                        <p className="tooltip">감가상각주기 : 최초개시일로 부터 30일마다 진행</p>
                                    </th>
                                    <th>공급가</th>
                                    <th>감가상각비</th>
                                    <th>감가상각 누계액 </th>
                                    <th>장부가액</th>
                                </tr>
                                {assetDepreciation?.contents.map((depreciation) => {
                                    return (
                                        <tr key={depreciation?.sno}>
                                            <td>{depreciation?.no}</td>
                                            <td>{depreciation?.depreciationDate}</td>
                                            <td>{assetData?.supplyPrice}</td>
                                            <td className="right">{depreciation?.depreciationCost && toComma(String(depreciation.depreciationCost))}</td>
                                            <td className="right">{depreciation?.accumlatedDepreciation && toComma(String(depreciation.accumlatedDepreciation))}</td>
                                            <td className="right">{depreciation?.bookValue && toComma(String(depreciation.bookValue))}</td>
                                        </tr>
                                    );
                                })}
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
                )}
                {isSearchPopupOpen && searchPopupData && (
                    <section className="sel_popup on input_box">
                        <h3>
                            선택
                            <button
                                type="button"
                                className="sel_popup_close"
                                onClick={() => setIsSearchPopupOpen(false)}
                            ></button>
                        </h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>WRMS 자산코드</th>
                                    <th>WRMS 품목코드</th>
                                    <th>일상구독 상품번호</th>
                                    <th>시리얼 번호</th>
                                    <th>상품명</th>
                                </tr>
                                {searchPopupData.map((data) => {
                                    return (
                                        <tr key={data.sno} onClick={() => handleSetAssetData(data)}>
                                            <td>{data.wrmsAssetCode}</td>
                                            <td>{data.wrmsItemCode}</td>
                                            <td>{data.ilsangProductCode}</td>
                                            <td>{data.serialNumber}</td>
                                            <td>{data.productName}</td>
                                        </tr>
                                    );
                                })}
                            </thead>
                        </table>
                    </section>
                )}
                {isEditPopupOpen && (
                    <EditPopup
                        assetData={assetData as AssetDataType}
                        handleSetAssetData={handleSetAssetData}
                        handleEditPopupClose={handleEditPopupClose}
                    />
                )}
            </article>
        </div>
    );
}

export default assetView;
