import React, { useEffect, useState } from "react";
import SampleData from "../testdata/res2.json";

const ProductList = () => {
  const [productCnt, setProductCnt] = useState(0);
  const [products, setProducts] = useState<any>([]);
  const fetchData = () => {
    // const { recentData, percentData, searchData } =  SampleData;

    const { count, data } = SampleData[0];

    setProductCnt(count);
    setProducts(data);
    console.log("data=", data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toComma = (n1: string) => {
    return n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      {
        <section className="popup input_box hsp_popup on">
          <h3>
            상품 정보&nbsp;&nbsp;|&nbsp;&nbsp;2024년 04월 30일 토요일
            <button type="button" className="popup_close"></button>
          </h3>
          <div className="table_top">
            <div className="sb_flex">
              <div className="flex_center">
                <p className="margin_r">총 {toComma(String(productCnt))}개</p>
                <form action="">
                  <label htmlFor="" className="hidden">
                    상품명
                  </label>
                  <input
                    type="text"
                    id=""
                    className="popup_text"
                    placeholder="상품명을 입력해주세요"
                  />
                  <button className="btn blue_back select_btn" type="submit">
                    조회하기
                  </button>
                </form>
              </div>
              <form action="" className="table_select">
                <button
                  type="submit"
                  className="btn blue_back select_btn excel"
                >
                  <span className="down">&nbsp;</span>엑셀 다운로드
                </button>
                <select name="" id="">
                  <option value="">10건씩 조회</option>
                  <option value="">30건씩 조회</option>
                  <option value="">50건씩 조회</option>
                  <option value="">100건씩 조회</option>
                </select>
              </form>
            </div>
          </div>
          <div className="scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    순번 <button className="align_down">&nbsp;</button>
                  </th>
                  <th>
                    방송일자 <button className="align_down">&nbsp;</button>
                  </th>
                  <th>
                    방송시간대 <button className="align_down">&nbsp;</button>
                  </th>
                  <th>
                    방송시간 <button className="align_up">&nbsp;</button>
                  </th>
                  <th>
                    쇼핑몰명 <button className="align_up">&nbsp;</button>
                  </th>
                  <th>
                    카테고리 <button className="align_up">&nbsp;</button>
                  </th>
                  <th>
                    상품명 <button className="align_up">&nbsp;</button>
                  </th>
                  <th>
                    상품유형 <button className="align_up">&nbsp;</button>
                  </th>
                  <th>
                    판매가(원) <button className="align_up">&nbsp;</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod: any, idx: number) => (
                  <tr key={idx}>
                    <td>{prod.mno}</td>
                    <td>{prod.broadDate}</td>
                    <td>{prod.standardTime}</td>
                    <td>{prod.broadTime}</td>
                    <td>{prod.shopCd}</td>
                    <td>{prod.cateNm}</td>

                    <td className="left">
                      <div
                        className="thumb_img"
                        style={{
                          backgroundImage: `url(${prod.imgSrc})`,
                        }}
                      ></div>
                      <p className="thumb_txt">{prod.goodsNm}</p>
                    </td>
                    <td>{prod.goodsType}</td>
                    <td className="right">{toComma(prod.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="center_flex page">
            <a href="">처음</a>
            <a href="">&nbsp;〈&nbsp;&nbsp;&nbsp;</a>
            <a href="" className="on">
              1
            </a>
            <a href="">2</a>
            <a href="">3</a>
            <a href="">4</a>
            <a href="">5</a>
            <a href="">&nbsp;&nbsp;&nbsp;〉&nbsp;</a>
            <a href="">끝</a>
          </div>
        </section>
      }
    </div>
  );
};

export default ProductList;
