"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'

function createProduct() {

	const selectList = 'http://31.152.254.254:3000/scripts/tag/list'
	const [selected, setSelected] = useState("선택");

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	const add_inputbox = () => {
		const box = document.getElementById("box");
		const newP = document.createElement("p");
		newP.innerHTML = "<li><input type='text' className='m_text' /><a className='add_btn'>추가</a></li>"
		box?.appendChild(newP);
	}
 
    return(
        <article className="status">
		<h2 className="sub_title">상품 등록</h2>
		<section className="input_box">
			<h3>상품 정보</h3>
			<form action="" className="script_input">
				<div>
				<ul className="script_input_list">
					<li className="tr">
						<div className="td"><span className="label">상태</span></div>
						<div className="td">
							<div className="radio_wrap">
								{/* <input type="radio" className="radio_btn" id="s_on" name="sell" checked="checked" /> */}
                                <input type="radio" className="radio_btn" id="s_on" name="sell" defaultChecked={true} />
								<label className="" htmlFor="s_on">주문가능</label>
								<input type="radio" className="radio_btn" id="s_off" name="sell" />
								<label className="" htmlFor="s_off">주문불가</label>
								<input type="text" className="m_text off" id="" placeholder="주문불가 사유" />
								{/* class에 off 추가/삭제로 숨김/나타냄 처리 */}
								{/* <input type="text" className="m_text" id="" placeholder="주문불가 사유 "> */}
							</div>
						</div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">제품명</label></div>
                        {/* input type에서 html for id값과 input type, id값을 같게 해줘야 트리거가 된다. */}
						<div className="td"><input type="text" className="m_text" id="" /></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">품목코드</label></div>
						<ul className="td add_td" id="box">
							{/* <li><input type="text" className="m_text" id="" /></li> */}
							<li><input type="text" className="m_text" id="" /><a className="add_btn">추가</a></li>
						</ul>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">가격정책(몰/모두)</label></div>
						<ul className="td add_td">
							<li><input type="text" className="m_text" id="" /><a className="add_btn">추가</a></li>
						</ul>
					</li>	
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">브랜드명</label></div>
						{/* <div className="td"><select><option>선택</option><option>삼성</option><option>브랜드</option></select><a className="option_btn" onclick="popup('brand');return false;">브랜드명 관리</a></div> */}
                        <div className="td"><select><option>선택</option><option>삼성</option><option>브랜드</option></select><a className="option_btn" >브랜드명 관리</a></div>
					</li>				
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">품목 카테고리</label></div>
						{/* <div className="td"><select><option>선택</option><option>냉장고</option><option>자전거</option></select><a className="option_btn" onClick="popup('cate');return false;">카테고리 관리</a></div> */}
						<div className="td">
							<select  onChange={handleSelect} defaultValue={selected}>
								{selectList.localeCompare((item) => {
								<option key={item.value}>{item.tagName}</option>
								})}
						</select>
						<a className="option_btn">카테고리 관리</a></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">모델명</label></div>
						<div className="td"><input type="text" className="m_text" id="" /></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">색상</label></div>
						<div className="td"><input type="text" className="m_text" id="" /></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">썸네일(URL)</label></div>
						<div className="td"><input type="text" className="m_text" id="" /></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">상세페이지</label></div>
						<div className="td"><p className="editor" style={{ height:'300px', backgroundColor:'#eee'}}></p></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">제품스펙</label></div>
						<div className="td"><p className="editor" style={{ height: '300px', backgroundColor: '#eee'}}></p></div>
					</li>
				</ul>
				</div>
			</form>
			
			<form action="" className="script_input script_input_btm">
				<div className="v_title">
					<h3>스크립트 버전</h3>
					<div className="v_wrap">
						<select className="">
							<option>신규 등록</option>
							<option>20231109_02  |  스크립트 최종의 최종의 최종 ver3.0</option>
							<option>20231109_02  |  스크립트 ver2.0</option>
							<option>20231109_01  |  스크립트 ver1.0</option>
							<option>20231108_01  |  홈쇼핑 버전</option>
						</select>
						<input type="text" className="m_text" id="" />
						{/* class에 off 추가/삭제로 숨김/나타냄 처리 */}
						{/* <input type="text" className="m_text off" id=""> */}
					</div>
				</div>
				<div>		
				<ul className="script_input_list">	
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">사용자화면 노출</label></div>
						<div className="td">
						<div className="radio_wrap">
							{/* <input type="radio" className="radio_btn" id="v_on" name="ver" checked="checked" /> */}
                            <input type="radio" className="radio_btn" id="v_on" name="ver" defaultChecked={true} />
							<label className="" htmlFor="v_on">노출</label>
							<input type="radio" className="radio_btn" id="v_off" name="ver" />
							<label className="" htmlFor="v_off">숨김</label>
							<p className="v_info">*해당 버전의 스크립트를 사용자화면에 노출하거나 숨깁니다</p>
						</div>
						</div>
					</li>					
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">렌탈기간</label></div>
						<div className="td"><input type="text" className="s_text" id="" /><span className="unit">개월</span></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">월렌탈료</label></div>
						<div className="td"><input type="text" className="s_text" id="" /><span className="unit">원</span></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">회수비</label></div>
						<div className="td"><input type="text" className="s_text" id="" /><span className="unit">원</span></div>
					</li>
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">AS기간</label></div>
						<div className="td"><input type="text" className="s_text" id="" /><span className="unit">개월</span></div>
					</li>					
					<li className="tr">
						<div className="td"><label className="label" htmlFor="">렌탈 가입 등록비</label></div>
						<div className="td"><input type="text" className="s_text" id="" /><span className="unit">원</span></div>
					</li>
					<li className="tr">
					<div className="td"><label className="label" htmlFor="">제반사항</label></div>
						<div className="td"><p className="editor" style={{ height: '300px', backgroundColor: '#eee'}}></p></div>
					</li>
				</ul>			
				</div>
				<button className="btn" type="submit">등록하기</button>
			</form>
		</section>
        <section className="popup input_box popupbrand">
			<h3>브랜드명 관리<button type="button" className="popup_close"></button></h3>
			<form action="">
				<div className="search">
					<h4 className="m_title">브랜드명</h4>
					<ul className="input_list">
						<li className="new_add">
							<h5 className="label">신규 추가</h5>
							<div className="new_add_input">
								<input type="text" className="l_text new_add_text" id="" placeholder="신규 추가" />
								<button className="new_add_btn">추가하기</button>
							</div>
						</li>
						<li className="flex">
							<h5 className="label">등록 브랜드</h5>
							<ul className="brand_list">
								<li>
									<input type="text" className="l_text" id="" value="루킨스 프리미엄" />
									<div className="radio_wrap">
										<input type="radio" className="radio_btn" id="b_on01" name="brand01" defaultChecked={true} />
										<label className="" htmlFor="b_on01">노출</label>
										<input type="radio" className="radio_btn" id="b_off01" name="brand01" />
										<label className="" htmlFor="b_off01">숨김</label>
									</div>
								</li>
            				</ul>
                        </li>
                    </ul>
				</div>
				<button className="btn blue_back popup_save" type="submit">저장</button>
			</form>
		</section>
		<section className="popup input_box popupcate">
			<h3>카테고리 관리<button type="button" className="popup_close"></button></h3>
			<form action="">
				<div className="search">
					<h4 className="m_title">카테고리</h4>
					<ul className="input_list">
						<li className="new_add">
							<h5 className="label">신규 추가</h5>
							<div className="new_add_input">
								<input type="text" className="l_text new_add_text" id="" placeholder="신규 추가" />
								<button className="new_add_btn">추가하기</button>
							</div>
						</li>
						<li className="flex">
							<h5 className="label">등록 카테고리</h5>
							<ul className="brand_list">
								<li>
									<input type="text" className="l_text" id="" value="TV" />
									<div className="radio_wrap">
										<input type="radio" className="radio_btn" id="c_on01" name="cate01" defaultChecked={true} />
										<label className="" htmlFor="c_on01">노출</label>
										<input type="radio" className="radio_btn" id="c_off01" name="cate01" />
										<label className="" htmlFor="c_off01">숨김</label>
									</div>
								</li>
							</ul>
						</li>
					</ul>		
				</div>
				<button className="btn blue_back popup_save" type="submit">저장</button>
			</form>
		</section>
	</article>
    )
}
  
export default createProduct