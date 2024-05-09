/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from 'axios'
import Link from 'next/link';
import { useNavigate } from "react-router-dom";
import { redirect } from "next/dist/server/api-utils";

export type assetCreateType = {
	wrmsAssetCode : string;
	wrmsItemCode : string;
	productName : string;
	ilsangProductCode : string;
	serialNumber : string;
	supplyPrice : number;
	usefulLife : number;
	assetUsage : string;
    registDepartment: string;
    registName: string;
	initialStartDate : string;
}

 function assetsCreate() {

    const [ wrmsAssetCode, setWrmsAssetCode ] = useState("");
    const [ wrmsItemCode, setWrmsItemCode ] = useState("");
    const [ ilsangProductCode, setIlsangProductCode ] = useState("");
    const [ serialNumber, setSerialNumber ] = useState("");
    const [ productName, setProductName ] = useState("");
    const [ supplyPrice, setSupplyPrice ] = useState("");
    const [registName, setRegistName] = useState("");
	const [usefulLife, setUsefulLife] = useState("");
	const [assetUsage, setAssetUsage] = useState("");
	const [registDepartment, setRegistDepartment] = useState("");
	const [initialStartDate, setInitialStartDate] = useState("");

	const formSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {

		console.log(assetUsage);

		e.preventDefault()

		if (wrmsAssetCode.length === 0) {
			alert('wrms 자산코드를 입력해 주세요.')
		} else if (wrmsItemCode.length === 0) {
			alert('wrms 품목코드를 입력해 주세요.')
		} else if (ilsangProductCode.length === 0) {
			alert('일상구독 상품번호를 입력해 주세요')
		} else if (serialNumber.length === 0) {
			alert('시리얼번호를 입력해 주세요')
		} else if (productName.length === 0) {
			alert('상품명을 입력해 주세요')
		} else if (supplyPrice.length === 0) {
			alert('공급가를 입력해 주세요')
		} else if (usefulLife.length === 0) {
			alert('내용연수를 입력해 주세요')
		} else {
			if(window.confirm('자산등록을 하시겠습니까?')) {
					axios.post("http://31.152.254.254:9000/api/assets/asset-regist", 
					{
						wrmsAssetCode: wrmsAssetCode,
						wrmsItemCode: wrmsItemCode,
						ilsangProductCode: ilsangProductCode,
						serialNumber: serialNumber,
						productName: productName,
						supplyPrice: supplyPrice,
						usefulLife: usefulLife,
						registDepartment: registDepartment,
						registName: registName,
						assetUsage: assetUsage,
						initialStartDate: initialStartDate
					})
					.then(function(response){
						console.log(response);
						alert('자산등록이 되었습니다.');
						//location.href='//support.mostx.co.kr/assetsList';
						//redirect("/assetsList");
					})
					.catch(function(error) {
						console.log(error);
					})
			} else {
				return false
			}
		}
	}
     
    return (                                            
        <div>
            <header>
                <nav>
                    <ul className="nav">
                    <li><Link href="/assetsList" legacyBehavior><a className="link">자산 감가상각 현황</a></Link></li>
                    <li className="on"><Link href="/assetsCreate" legacyBehavior><a className="link">자산 등록</a></Link></li>
                    <li><Link href="/assetsDiscard" legacyBehavior><a className="link">자산 처분</a></Link></li>
                    <li><Link href="/assetView/0" legacyBehavior><a className="link"> 건별 자산 조회</a></Link></li>
                    </ul>
                </nav>			
            </header>
            <article className="status">
			<h2 className="sub_title">자산 등록</h2>
			<section className="input_box">
				<h3>등록
					{/* <button type="button" className="btn blue_back up_btn">엑셀파일 업로드</button> */}
				</h3>
				<form action="" className="search">
					<div>
					<ul className="input_list">
						<li>
							<label className="label" htmlFor="">
								WRMS 자산코드
								<span className="redtxt">*</span>
							</label>
							<input
								type="text"
								onChange={(e) => setWrmsAssetCode(e.target.value)}
								value={wrmsAssetCode}
								className="m_text"
								id="wrmsAssetCode"
								placeholder="WRMS 자산코드는 중복 입력이 불가능합니다">
							</input>
						</li>
						<li>
							<label className="label" htmlFor="">
								WRMS 품목코드
								<span className="redtxt">*</span>
							</label>
							<input
								type="text"
								onChange={(e) => setWrmsItemCode(e.target.value)}
								value={wrmsItemCode}
								className="m_text"
								id="wrmsItemCode"
							/>
						</li>
						<li>
							<label className="label" htmlFor="">
								일상구독 상품번호<span className="redtxt">*</span>
							</label>
							<input
								type="text"
								onChange={(e) => setIlsangProductCode(e.target.value)}
								value = {ilsangProductCode}
								className="m_text"
								id="ilsangPrdCode"
							/>
						</li>
						<li>
							<label className="label" htmlFor="">
								시리얼 번호
								<span className="redtxt">*</span>
							</label>
							<input
								type="text"
								onChange={(e) => setSerialNumber(e.target.value)}
								value={serialNumber}
								className="m_text"
								id="serialNumber"
							/>
						</li>
						<li>
							<label className="label" htmlFor="">
								상품명
								<span className="redtxt">*</span>
							</label>
							<input
								type="text"
								onChange={(e) => setProductName(e.target.value)}
								value={productName}
								className="l_text"
								id="productName"
							/>
						</li>
						<li>
							<h4 className="label">공급가
							<span className="redtxt">*</span></h4>
							<label className="hidden" htmlFor="">
								공급가(원)
							</label>
							<input
								type="text"
								onChange={(e) => setSupplyPrice(e.target.value)}
								value={supplyPrice}
								className="m_text"
								id="supplyPrice"
								placeholder="부가세(원) 제외한 금액 입력해주세요"
							/>
						</li>
						<li>
							<label className="label" htmlFor="">
								내용연수
								<span className="redtxt">*</span>
							</label>
							<input
								type="text"
								onChange={(e) => setUsefulLife(e.target.value)}
								value={usefulLife}
								className="m_text"
								id="usefulLife"
							/>
						</li>
						<li>
							<h4 className="label">용도</h4>
							<label htmlFor="" className="hidden">용도</label>
							<fieldset className="input_wrap">
								<input 
									type="radio"
									onChange={(e) => setAssetUsage(e.target.value)}
									value={'구독'}
									name="assetUsage"
									id="use02"
									defaultChecked
								/>
								<label htmlFor="use02">구독</label>
								<input
									type="radio"
									onChange={(e) => setAssetUsage(e.target.value)}
									value={'폐기'}
									name="assetUsage"
									id="use03"
								/>
								<label htmlFor="use03">체험</label>
							</fieldset>
						</li>					
						<li>
							<h4 className="label">등록자 정보</h4>
							<label htmlFor="">부서명&nbsp;</label>
							<input
								type="text"
								onChange={(e) => setRegistDepartment(e.target.value)}
								value={registDepartment}
								className="s_text"
								id=""
							/>
							&nbsp;&nbsp;
							<label htmlFor="">성명&nbsp;</label>
							<input
								type="text"
								onChange={(e) => setRegistName(e.target.value)}
								value={registName}
								className="s_text"
								id=""
							/>
						</li>
						<li>
							<h4 className="label">최초개시일자</h4>
							<label htmlFor="" className="hidden">
								최초개시일자
							</label>
							<input
								type="date"
								onChange={(e) => setInitialStartDate(e.target.value)}
								value={initialStartDate}
								id=""
								className="s_text"
								placeholder="최초개시일자"
							/>
						</li>
					</ul>
					</div>
					<button onClick={formSubmit} className="btn" type="submit">
						등록하기
					</button>
				</form>
			</section>
		</article>
        </div>
    );
};

export default assetsCreate;