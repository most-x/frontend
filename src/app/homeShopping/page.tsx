/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
import ProductList from "../modal/ProductList";

type ProductCountInfo = Record<string, number>;
type ProdcutPercentInfo = Record<string | number, number>;
type CategoryCount = Record<string, number>;

import StaticData from "../testdata/res1.json";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// TODO: 테스트를 위해 샘플 데이터를 사용했음. 추후 API 데이터로 변경되면 삭제
const SAMPLE_PRODUCT_PERCENT_INFO: ProdcutPercentInfo = {
  "2024.01.27(토)": 77.1,
  "2024.01.28(일)": 73.7,
  "2024.01.29(월)": 81.3,
  "2024.01.30(화)": 79,
  "2024.01.31(수)": 70.9,
  "2024.02.01(목)": 67.7,
  "2024.02.02(금)": 100,
  "2024.02.03(토)": 61,
  "2024.02.04(일)": 76.5,
  "2024.02.05(월)": 64.7,
  "2024.02.06(화)": 8.4,
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

  //   useEffect(() => {
  //     const productCountAPIUrl = `http://31.152.254.254:3000/home-shopping/dashboard`;

  //     const fetchData = async () => {
  //       try {
  //         const params = {
  //           // 필요한 query params를 {} 형태에 담아준다.
  //           fromDate: startDate,
  //           toDate: endDate,
  //         };

  //         const queryString = new URLSearchParams(params).toString(); // url에 쓰기 적합한 querySting으로 return 해준다.
  //         const requrl = `${productCountAPIUrl}?${queryString}`; // 완성된 요청 url.
  //         const response = await fetch(requrl);
  //         const { recentData, percentData, searchData } = await response.json();

  //         const allCate = [];
  //         const catePercent = Object.entries(percentData.catePercent);
  //         const cateCount = Object.entries(searchData.category);

  //         for (let i = 0; i < catePercent.length; i++) {
  //           const nData = {
  //             kind: catePercent[i][0],
  //             percent: catePercent[i][1],
  //             cnt: cateCount[i][1],
  //           };
  //           allCate.push(nData);
  //         }

  //         console.log("allCate=", allCate);

  //         setCategorys(allCate);

  //         setPercentDataA(percentData);
  //         setProductCountInfo(recentData);
  //         // TODO: 테스트를 위해 샘플 데이터를 사용했음. 추후 API 데이터로 변경 필요
  //         setProductPercentInfo(SAMPLE_PRODUCT_PERCENT_INFO);
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     };
  //     fetchData();
  //   }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const params = {
        // 필요한 query params를 {} 형태에 담아준다.
        fromDate: startDate,
        toDate: endDate,
      };

      const { recentData, percentData, searchData } = await StaticData;
      console.log("StaticData=", StaticData);

      console.log("rr==", recentData);

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
      setProductPercentInfo(SAMPLE_PRODUCT_PERCENT_INFO);

      // setKindProds(kindsProduct);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    // const productCountAPIUrl = `http://31.152.254.254:3000/home-shopping/dashboard`;

    fetchData();
  }, [startDate, endDate]);

  /* 요일 구하기 */
  const week = new Array("일", "월", "화", "수", "목", "금", "토");
  const label = today.getDay();
  const todayLabel = week[label];

  const formattedDate = `${today.getFullYear()}. ${
    today.getMonth() + 1
  }. ${today.getDate()}(${todayLabel}) 00:00:00`;

  /* 카테고리 구하기 */
  const categoryList = [
    { key: 0, value: "전체", checked: false },
    { key: 1, value: "가전·디지털", checked: false },
    { key: 2, value: "보험", checked: false },
    { key: 3, value: "생활·주방", checked: false },
    { key: 4, value: "식품·건강", checked: false },
    { key: 5, value: "패션·잡화", checked: false },
    { key: 6, value: "화장품·미용", checked: false },
    { key: 6, value: "기타", checked: false },
  ];

  const hChannels = [
    { name: "CJ&스타일", percent: 5 },
    { name: "CJ&스타일", percent: 5 },
    { name: "CJ&스타일", percent: 5 },
    { name: "CJ&스타일", percent: 5 },
    { name: "CJ&스타일", percent: 5 },
    { name: "CJ&스타일", percent: 5 },
    { name: "CJ&스타일", percent: 5 },
  ];

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

  return (
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
          <form action="" className="search">
            <ul className="search_list_full">
              <li>
                <label className="label" htmlFor="">
                  상품명
                </label>
                <input
                  type="text"
                  id=""
                  className="l_text"
                  placeholder="상품명을 입력해주세요"
                />
              </li>
              <li className="checkbox_wrap">
                <label className="label" htmlFor="">
                  카테고리
                </label>
                <fieldset className="date_radio checkbox">
                  <input type="checkbox" id="cateall" defaultChecked={true} />
                  <label htmlFor="cateall">전체</label>
                  <input type="checkbox" id="cate01" />
                  <label htmlFor="cate01">가전·디지털</label>
                  <input type="checkbox" id="cate02" />
                  <label htmlFor="cate02">보험</label>
                  <input type="checkbox" id="cate03" />
                  <label htmlFor="cate03">생활·주방</label>
                  <input type="checkbox" id="cate04" />
                  <label htmlFor="cate04">식품·건강</label>
                  <input type="checkbox" id="cate05" />
                  <label htmlFor="cate05">유아·아동</label>
                  <input type="checkbox" id="cate06" />
                  <label htmlFor="cate06">패션·잡화</label>
                  <input type="checkbox" id="cate07" />
                  <label htmlFor="cate07">화장품·미용</label>
                  <input type="checkbox" id="cate08" />
                  <label htmlFor="cate08">기타</label>
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
                    defaultChecked={true}
                  />
                  <label htmlFor="channelall">전체보기</label>
                  <input type="checkbox" id="cjmall" />
                  <label htmlFor="cjmall">CJ&스타일</label>
                  <input type="checkbox" id="cjmallplus" />
                  <label htmlFor="cjmallplus">CJ온스타일+</label>
                  <input type="checkbox" id="gsmyshop" />
                  <label htmlFor="gsmyshop">GS MY SHOP</label>
                  <input type="checkbox" id="gsshop" />
                  <label htmlFor="gsshop">GS SHOP</label>
                  <input type="checkbox" id="kshop" />
                  <label htmlFor="kshop">KT알파 쇼핑</label>
                  <input type="checkbox" id="kshopplus" />
                  <label htmlFor="kshopplus">KT알파 쇼핑 TV플러스</label>
                  <input type="checkbox" id="lotteonetv" />
                  <label htmlFor="lotteonetv">LOTTE ONE TV</label>
                  <input type="checkbox" id="nsmallplus" />
                  <label htmlFor="nsmallplus">NS Shop+</label>
                  <input type="checkbox" id="nsmall" />
                  <label htmlFor="nsmall">NS홈쇼핑</label>
                  <input type="checkbox" id="ssgshop" />
                  <label htmlFor="ssgshop">SHINSEGAE SHOPPING</label>
                  <input type="checkbox" id="skstoa" />
                  <label htmlFor="skstoa">SK 스토아</label>
                  <input type="checkbox" id="tcommerce2" />
                  <label htmlFor="tcommerce2">T커머스</label>
                  <input type="checkbox" id="immall" />
                  <label htmlFor="immall">공영쇼핑</label>
                  <input type="checkbox" id="wshop" />
                  <label htmlFor="wshop">더블유쇼핑</label>
                  <input type="checkbox" id="lottemall" />
                  <label htmlFor="lottemall">롯데홈쇼핑</label>
                  <input type="checkbox" id="shopnt" />
                  <label htmlFor="shopnt">쇼핑엔티</label>
                  <input type="checkbox" id="hmall" />
                  <label htmlFor="hmall">현대홈쇼핑</label>
                  <input type="checkbox" id="hmallplus" />
                  <label htmlFor="hmallplus">현대홈쇼핑 PLUSE#</label>
                  <input type="checkbox" id="hnsmall" />
                  <label htmlFor="hnsmall">홈&쇼핑</label>
                  <input type="checkbox" id="homeshopping" />
                  <label htmlFor="homeshopping">홈쇼핑</label>
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
                  <fieldset className="date_radio">
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
                    {/* <input type="radio" id="radio_2023" name="date_radio" />
							<label htmlFor="radio_2023">2023년</label> */}
                    <input type="radio" id="radio_2024" name="date_radio" />
                    <label htmlFor="radio_2024">2024년</label>
                  </fieldset>
                </div>
              </li>
            </ul>
            <div className="flex">
              <button className="btn" type="submit">
                조회하기
              </button>
            </div>
          </form>
          <summary></summary>
        </details>
      </section>
      <div onClick={() => setModalOn(!modalOn)}>모달열기</div>

      <div className="btm_chart">
        <section className="btm_chart_box">
          <h3>카테고리 별 상품수</h3>
          <ul className="chart_box_h">
            {categorys &&
              categorys.map((category: any, idx: number) => (
                <li key={idx}>
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
              <li key={idx}>
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
              <li key={idx}>
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
      <Modal isOpen={modalOn}>
        <ProductList />
      </Modal>
    </article>
  );
}

export default homeShopping;
