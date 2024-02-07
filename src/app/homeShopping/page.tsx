/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
import ProductList from "../modal/ProductList";
import axios from 'axios'

type ProductCountInfo = Record<string, number>;
type ProdcutPercentInfo = Record<string | number, number>;
type CategoryCount = Record<string, number>;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto'
  },
};

function homeShopping() {
  const today = new Date();

  function convertDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const dateString = year + "-" + month + "-" + day;

    return dateString;
  }

  const [productPercentInfo, setProductPercentInfo] = useState<
    ProdcutPercentInfo | undefined
  >();
  const [productCountInfo, setProductCountInfo] = useState<
    ProductCountInfo | undefined
  >();
  const [categoryCount, setCategoryCount] = useState<
    CategoryCount | undefined
  >();

  const [pertcentDataA, setPercentDataA] = useState<any>([]);

  const [isChecked, setIsChecked] = useState(false);
  const [checkedCategorys, setCheckedCategorys] = useState(new Set());

  const [shopPercent, setShopPercent] = useState([]);

  //달력 선택
  const [endDate, setEndDate] = useState<string>(convertDate(new Date()));
  const [startDate, setStartDate] = useState<string>(convertDate(new Date()));
  // const [startDate, setStartDate] = useState<Date | null>

  const [categorys, setCategorys] = useState<any>();
  const [shopCategory, setShopCategory] = useState<any[]>([]);
  const [standardCategorys, setStandardCategorys] = useState<any[]>([]);

  const [recentDatas, setRecentDatas] = useState([]);
  const [kindProds, setKindProds] = useState<any[]>([]);

  const [modalOn, setModalOn] = useState(false);

  const [shopCds, setShopCds] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [prodName, setProdName] = useState("");
  const [selectedDate, setSelectedDate] = useState("오늘");
  const [goodsType,setGoodsType] = useState("")
  const [standardTime,setStandardTime] = useState("")

  const [modalCateNm,setModalCateNm] = useState("")
  //const productCountAPIUrl = `http://31.152.254.254:3000/home-shopping/dashboard`;
  //const productCountAPIUrl = `http://43.202.91.211:3000/home-shopping/dashboard`;
  const productCountAPIUrl = `https://test.ilsang.co.kr/home-shopping/dashboard`;

  const handleChannelChange = (event: any) => {
    const { id, checked } = event.target;
    if (id === "channelall") {
      if (checked) {
        setSelectedChannels(channels.map((channel) => channel.id));
      } else {
        setSelectedChannels([]);
      }
    } else {
      if (checked) {
        setSelectedChannels((prevSelectedChannels) => [
          ...prevSelectedChannels,
          id,
        ]);
      } else {
        setSelectedChannels((prevSelectedChannels) =>
          prevSelectedChannels.filter((channel) => channel !== id)
        );
      }
    }
  };
  const handleShopCdChange = (event: any) => {
    const { id, checked } = event.target;
    if (id === "전체") {
      if (checked) {
        setShopCds(categories.map((category) => category.id));
      } else {
        setShopCds([]);
      }
    } else {
      if (checked) {
        setShopCds((prevShopCds) => [...prevShopCds, id]);
      } else {
        setShopCds((prevShopCds) =>
          prevShopCds.filter((shopCd) => shopCd !== id)
        );
      }
    }
  };
  const fetchData = async () => {
    try {
      console.log('asdasd',shopCds);
      
      const params = {
        // 필요한 query params를 {} 형태에 담아준다.
        fromDate: startDate,
        toDate: endDate,
        shopCd:selectedChannels,
        goodsNm:prodName,
        cateNm:shopCds

      };
      console.log('params=',params);
      
  
          // const queryString = new URLSearchParams(params).toString(); // url에 쓰기 적합한 querySting으로 return 해준다.
          // const requrl = `${productCountAPIUrl}?${queryString}`; // 완성된 요청 url.
    axios.get(productCountAPIUrl,{params}).then((res)=>{
      const { recentData, percentData, searchData } =  res.data;


      const allCate = [];
      const catePercent = Object.entries(percentData.catePercent);
      const cateCount = Object.entries(searchData.category);

      const shopCate = [];
      const shopPercent = Object.entries(percentData.shopPercent);
      const shopCd = Object.entries(searchData.shopCd);

      const standardCate = [];
      const standardPercent = Object.entries(percentData.standardPercent);
      const standardTime = Object.entries(searchData.standardTime);

      const recentCate = [];
      const recentPercent = Object.entries(percentData.recentPercent);
      const rencentData = Object.entries(recentData);

      const kindsProduct = [];
      const kindsPercent = Object.entries(percentData.shopPercent);
      const kindsCnt = Object.entries(searchData.goodsType);

      for (let i = 0; i < catePercent.length; i++) {
        const nData = {
          kind: catePercent[i][0],
          percent: catePercent[i][1],
          cnt: cateCount[i][1],
        };
        allCate.push(nData);
      }
      
      for (let i = 0; i < shopPercent.length; i++) {
        const nData = {
          kind: shopPercent[i][0],
          percent: shopPercent[i][1],
          cnt: shopCd[i][1],
        };
        shopCate.push(nData);
      }
      for (let i = 0; i < standardPercent.length; i++) {
        const nData = {
          kind: standardPercent[i][0],
          percent: standardPercent[i][1],
          cnt: standardTime[i][1],
        };
        standardCate.push(nData);
      }
      for (let i = 0; i < recentPercent.length; i++) {
        const nData = {
          kind: recentPercent[i][0],
          percent: recentPercent[i][1],
          cnt: rencentData[i][1],
        };
        recentCate.push(nData);
      }
      // for (let i = 0; i < kindsPercent.length; i++) {
      //   const nData = {
      //     kind: kindsPercent[i][0],
      //     percent: kindsPercent[i][1],
      //     cnt: kindsCnt[i][1],
      //   };
      //   kindsProduct.push(nData);
      // }

      setCategorys(allCate);
      setShopCategory(shopCate);
      setStandardCategorys(standardCate);

      setPercentDataA(percentData);
      setProductCountInfo(recentData);
      // TODO: 테스트를 위해 샘플 데이터를 사용했음. 추후 API 데이터로 변경 필요
      setProductPercentInfo(percentData.recentPercent);
    })

      // setKindProds(kindsProduct);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
      fetchData();
  
    }, [startDate, endDate]);

  /* 요일 구하기 */
  const week = new Array("일", "월", "화", "수", "목", "금", "토");
  const label = today.getDay();
  const todayLabel = week[label];

  const formattedDate = `${today.getFullYear()}. ${
    today.getMonth() + 1
  }. ${today.getDate()}(${todayLabel}) 00:00:00`;

  const categories = [
    { id: "전체", label: "전체" },
    { id: "가전·디지털", label: "가전·디지털" },
    { id: "보험", label: "보험" },
    { id: "생활·주방", label: "생활·주방" },
    { id: "식품·건강", label: "식품·건강" },
    { id: "유아·아동", label: "유아·아동" },
    { id: "패션·잡화", label: "패션·잡화" },
    { id: "화장품·미용", label: "화장품·미용" },
    { id: "기타", label: "기타" },
  ];
  
  const shopName = {
    homeshopping: '홈쇼핑',
    tcommerce2: 'T커머스',
    hnsmall: '홈&쇼핑',
    cjmall: 'CJ&스타일',
    lottemall: '롯데홈쇼핑',
    gsshop: 'GS SHOP',
    immall: '공영쇼핑',
    nsmall: 'NS홈쇼핑',
    cjmallplus: 'CJ온스타일+',
    lotteonetv: 'LOTTE ONE TV',
    gsmyshop: 'GS MY SHOP',
    ssgshop: 'SHINSEGAE SHOPPING',
    hmallplus: '현대홈쇼핑 PLUSE#',
    kshop: 'KT알파 쇼핑',
    shopnt: '쇼핑엔티',
    wshop: '더블유쇼핑',
    nsmallplus: 'NS Shop+',
    kshopplus: 'KT알파 쇼핑 TV플러스',
    hmall: '현대홈쇼핑',
    bshop: 'SK스토아',
  };
  
  const channels = Object.entries(shopName).map(([id, label]) => ({ id, label }));
  
  useEffect(()=>{

    console.log("startDate==",startDate);
    
  },[startDate])
  
  const dates = [
    { id: "오늘", label: "오늘" },
    { id: "1주일", label: "1주일" },
    { id: "1개월", label: "1개월" },
    { id: "2024년", label: "2024년" },
  ];
  const search = () => {
  

    fetchData();

        // const queryString = new URLSearchParams(params).toString(); // url에 쓰기 적합한 querySting으로 return 해준다.
        // const requrl = `${productCountAPIUrl}?${queryString}`; // 완성된 요청 url.
  };
  const buildProductCountList = (
    productCountInfo: ProductCountInfo,
    productPercentInfo: ProdcutPercentInfo
  ): JSX.Element[] => {
    return Object.entries(productCountInfo).map(([date, count]) => (
      <li key={date}>
        <div className="chart">
          {/* productPercontInfo 객체에 일자(date) 키와 값이 있어야 정상적으로 표시됨 */}
          <div style={{ height: `${productPercentInfo[date]}%` }}></div>
        </div>
        <h4 className="date">{date}</h4>
        <p className="num">{count}개</p>
      </li>
    ));
  };
  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.id);

    console.log('id==',event.target.value)
    if(event.target.id=='1주일'){
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
      const formattedDate = oneWeekAgo.toISOString().split('T')[0];
      
      console.log('formattedDate==',formattedDate);
      
      // 변경된 날짜를 startDate에 설정
      setStartDate(formattedDate);
    }else if(event.target.id=='오늘'){
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 0);

      // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
      const formattedDate = oneWeekAgo.toISOString().split('T')[0];
      
      console.log('formattedDate==',formattedDate);
      
      // 변경된 날짜를 startDate에 설정
      setStartDate(formattedDate);
    }else if(event.target.id=='1개월'){
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

      // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
      const formattedDate = oneWeekAgo.toISOString().split('T')[0];
      
      console.log('formattedDate==',formattedDate);
      
      // 변경된 날짜를 startDate에 설정
      setStartDate(formattedDate);
    }else if(event.target.id=='2024년'){
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

      // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
      const formattedDate = oneWeekAgo.toISOString().split('T')[0];
      
      console.log('formattedDate==',formattedDate);
      
      // 변경된 날짜를 startDate에 설정
      setStartDate('2024-01-01');
    }
  };
  const cateOpen = (e:any,kind:string) =>{
    e.preventDefault()
    setModalOn(true)
    setGoodsType(kind)
  }
  const shopOpen = (e:any,kind:string) =>{
    e.preventDefault()
    setModalOn(true)
    const res = channels.find((i)=>i.label===kind)
    setModalCateNm(String(res?.id))
  }
  const timeOpen = (e:any,kind:string) =>{
    e.preventDefault()
    setModalOn(true)
    // const res = channels.find((i)=>i.label===kind)
    setStandardTime(kind)
  }
  return (
    <div>
      <article className="status hsp">
      <h2 className="sub_title">
        홈쇼핑 방송 정보
        <p className="update_txt">
          <strong>업데이트</strong> {formattedDate}{" "}
        </p>
      </h2>
      <section className="search_box">
        <h3>방송일자 별 상품수</h3>
        <ul className="chart_box">
          {productCountInfo &&
            productPercentInfo &&
            buildProductCountList(productCountInfo, productPercentInfo)}
        </ul>
      </section>
      <section className="search_box">
        <h3>상품 검색</h3>
        <details open>
          <div className="search">
            <ul className="search_list_full">
              <li>
                <label className="label" htmlFor="">
                  상품명
                </label>
                <input
                  type="text"
                  id=""
                  className="l_text"
                  onChange={(e) => setProdName(e.target.value)}
                  value={prodName}
                  placeholder="상품명을 입력해주세요"
                />
              </li>
              <li className="checkbox_wrap">
                <label className="label" htmlFor="">
                  카테고리
                </label>
                <fieldset className="date_radio checkbox">
                  {categories.map((category) => (
                    <span key={category.id}>
                      <input
                        type="checkbox"
                        id={category.id}
                        // onClick={handleShopCdChange}
                        onChange={handleShopCdChange}
                        checked={shopCds.includes(category.id)}
                      />
                      <label htmlFor={category.id}>{category.label}</label>
                    </span>
                  ))}
                </fieldset>
              </li>
              <li className="checkbox_wrap">
                <label className="label" htmlFor="">
                  홈쇼핑 채널
                </label>
                <fieldset className="date_radio checkbox">
                  <input
                    type="checkbox"
                    id="channelall"
                    onChange={handleChannelChange}
                  />
                  <label htmlFor="channelall">전체</label>
                  <input type="checkbox" id="channelall" />
                  {channels.map((channel) => (
                    <span key={channel.id}>
                      <input
                        type="checkbox"
                        id={channel.id}
                        checked={selectedChannels.includes(channel.id)}
                        onChange={handleChannelChange}
                      />
                      <label htmlFor={channel.id}>{channel.label}</label>
                    </span>
                  ))}
                </fieldset>
              </li>
              <li>
                <div className="flex_center">
                  <label className="label" htmlFor="">
                    방송일자
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    className="s_text"
                  />
                  <span className="date_blank">-</span>
                  <input
                    type="date"
                    id="endDate"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                    className="s_text"
                  />
                  {dates.map((date) => (
                    <div className="flex_center" key={date.id}>
                      <input
                        type="radio"
                        id={date.id}
                        name="date_radio"
                        checked={selectedDate === date.id}
                        onChange={handleDateChange}
                        value={date.id}
                      />
                      <label htmlFor={date.id}>{date.label}</label>
                    </div>
                  ))}
                  {/* <fieldset className="date_radio">
                    <input
                      type="radio"
                      id="radio_today"
                      name="date_radio"
                      defaultChecked={true}
                    />
                    <label htmlFor="radio_today">오늘</label>
                    <input type="radio" id="radio_week" name="date_radio" />
                    <label htmlFor="radio_week">1주일</label>
                    <input type="radio" id="radio_month" name="date_radio" />
                    <label htmlFor="radio_month">1개월</label>
                    <input type="radio" id="radio_2024" name="date_radio" />
                    <label htmlFor="radio_2024">2024년</label>
                  </fieldset> */}
                </div>
              </li>
            </ul>
            <div className="flex">
              <button className="btn" onClick={() => search()}>
                조회하기
              </button>
            </div>
          </div>
          <summary></summary>
        </details>
      </section>
      {/* <div onClick={() => setModalOn(!modalOn)}>모달열기</div> */}

      <div className="btm_chart">
        <section className="btm_chart_box">
          <h3>카테고리 별 상품수</h3>
          <ul className="chart_box_h">
            {categorys &&
              categorys.map((category: any, idx: number) => (
                <li onClick={(e)=>cateOpen(e,category.kind)} key={idx}>
                  <h4>{category.kind}</h4>
                  <div className="chart">
                    <a href="">
                      <div style={{ width: category.percent }}>
                        {category.cnt}
                      </div>
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        </section>
        <section className="search_box">
          <h3>홈쇼핑 채널 별 상품수</h3>
          <ul className="chart_box_h">
            {shopCategory.map((shopCate, idx) => (
              <li onClick={(e)=>shopOpen(e,shopCate.kind)} key={idx}>
                <h4>{shopCate.kind}</h4>
                <div className="chart">
                  <a href="">
                    <div style={{ width: shopCate.percent }}>
                      {shopCate.cnt}
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="search_box">
          <h3>시간대 별 상품수</h3>
          <ul className="chart_box_h">
            {standardCategorys.map((standardCategory, idx) => (
              <li onClick={(e)=>timeOpen(e,standardCategory.kind)} key={idx}>
                <h4>{standardCategory.kind}</h4>
                <div className="chart">
                  <a href="">
                    <div style={{ width: standardCategory.percent }}>
                      {standardCategory.cnt}
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="search_box">
          <h3>유형 별 상품수</h3>
          <ul className="chart_box_donut">
            <li className="chart_donut_wrap">
              {kindProds.map((kind, idx) => (
                <h4 key={idx}>
                  <a href="">
                    <span style={{ color: "#ddd" }}>■ </span>
                    <strong>{kind.kind}</strong> 28개
                  </a>
                </h4>
              ))}

              <h4>
                <a href="">
                  <span style={{ color: "#011E41" }}>■ </span>
                  <strong>렌탈상담상품</strong> 72개
                </a>
              </h4>
              <div
                className="chart_donut"
                style={{
                  background: "conic-gradient(#011E41 0% 72%, #ddd 72% 100%)",
                }}
              ></div>
            </li>
          </ul>
        </section>
      </div>

      {/* 팝업 */}
      {/*  */}
     </article>     <Modal style={customStyles} isOpen={modalOn} onRequestClose={()=>setModalOn(false)}>
        <ProductList goodsType={goodsType} fromDate={startDate} toDate={endDate } shopCds={shopCds} cateNm={selectedChannels} modalCateNm={modalCateNm} standardTime={standardTime} />
      </Modal>
    </div>

  );
}

export default homeShopping;
