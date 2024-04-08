/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from 'axios'
import Link from 'next/link';

 function assetsCreate() {

    const [ wrmsAssetCode, setWrmsAssetCode ] = useState("");
    const [ wrmsItemCode, setWrmsItemCode ] = useState("");
    const [ ilsangPrdCode, setIlsangPrdCode ] = useState("");
    const [ serialNumber, setSerialNumber ] = useState("");
    const [ productName, setProductName ] = useState("");
    const [ purchasePrice, setPurchasePrice ] = useState("");
    const [ supplyPrice, setSupplyPrice ] = useState("");
    const [ vatPrice, setVatPrice ] = useState("");
    const [ warehouseNumber, setWarehouseNumber ] = useState("");
    const [ registrantInfo, setRegistrantInfo ] = useState("");
    const [registDepartment, setRegistDepartment] = useState("");
    const [registName, setRegistName] = useState("");

    const canSubmit = useCallback(() => {
        return 
        //image.image_file !== "" && content !== "" && title !== "";
      }, 
        //[image, title, content]
       []);   

    const handleSubmit = useCallback(async () => {
        try{
          const formData = new FormData();
          formData.append("wrmsAssetCode", wrmsAssetCode);
          formData.append("wrmsItemCode", wrmsItemCode);
          formData.append("ilsangPrdCode", ilsangPrdCode);
          formData.append("serialNumber", serialNumber);
          formData.append("productName", productName);
          formData.append("purchasePrice", purchasePrice);
          formData.append("supplyPrice", supplyPrice);
          formData.append("vatPrice", vatPrice);
          formData.append("warehouseNumber", warehouseNumber);
          formData.append("registrantInfo", registrantInfo);
          formData.append("registDepartment", registDepartment);
          formData.append("registName", registName);

          console.log("------- 확인 ========");
    
          axios.post("/api/assets/asset-regist", formData);
          window.alert("등록이 완료되었습니다");
        } catch (e) {
          // 서버에서 받은 에러 메시지 출력
          
        }
    
      }, [canSubmit]);
     
    return (                                            
        <div>
            <header>
                <nav>
                    <ul className="nav">
                    <li><Link href="/assetsList" legacyBehavior><a className="link">자산 감가상각 현황</a></Link></li>
                    <li className="on"><Link href="/assetsCreate" legacyBehavior><a className="link">자산 등록</a></Link></li>
                    <li><Link href="/assetsDiscard" legacyBehavior><a className="link">자산 처분</a></Link></li>
                    <li><Link href="/assetView" legacyBehavior><a className="link"> 건별 자산 조회</a></Link></li>
                    </ul>
                </nav>			
            </header>
            <article className="status">
                <h2 className="sub_title">자산 등록</h2>
                <section className="input_box">
                    <h3>등록<button type="button" className="btn blue_back up_btn">엑셀파일 업로드</button></h3>
                    <form action="" className="search">
                        <div>
                            <ul className="input_list">
                                <li>
                                    <label className="label" htmlFor="">WRMS 자산코드</label>
                                    <input type="text" className="m_text" id="wrmsAssetCode" />
                                </li>
                                <li>
                                    <label className="label" htmlFor="">WRMS 품목코드</label>
                                    <input type="text" className="m_text" id="wrmsItemCode" />
                                </li>
                                <li>
                                    <label className="label" htmlFor="">일상구독 상품번호</label>
                                    <input type="text" className="m_text" id="ilsangPrdCode" />
                                </li>
                                <li>
                                    <label className="label" htmlFor="">시리얼 번호</label>
                                    <input type="text" className="m_text" id="serialNumber" />
                                </li>
                                <li>
                                    <label className="label" htmlFor="">상품명</label>
                                    <input type="text" className="l_text" id="productName" />
                                </li>
                                <li>
                                    <h4 className="label">매입원가</h4>
                                    <label htmlFor="">공급가(원)</label>
                                    <input type="text" className="s_text" id="supplyPrice" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="">부가세(원)</label>
                                    <input type="text" className="s_text" id="vatPrice" />
                                </li>
                                <li>
                                    <label className="label" htmlFor="">내용연수</label>
                                    <input type="text" className="m_text" id="" />
                                </li>
                                <li>
                                    <label className="label" htmlFor="">창고번호</label>
                                    <input type="text" className="m_text" id="warehouseNumber" />
                                </li>
                                <li>
                                    <h4 className="label">등록자 정보</h4>
                                    <label htmlFor="">부서명&nbsp;</label>
                                    <input type="text" className="s_text" id="registDepartment" />
                                    &nbsp;&nbsp;
                                    <label htmlFor="">성명&nbsp;</label>
                                    <input type="text" className="s_text" id="registName" />
                                </li>	
                            </ul>
                        </div>
                        <button className="btn" type="submit">등록하기</button>
                    </form>
                </section>
            </article>
        </div>
    );
};

export default assetsCreate;