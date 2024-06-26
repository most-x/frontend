import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

interface Props {
  goodsTypeChart: string;
  prodName: string;
  fromDate: string;
  toDate: string;
  shopCds: string[];
  cateNm: string[];
  standardTime: string;
  closeModal: () => void;
}

const ProductList = ({
  goodsTypeChart,
  prodName,
  fromDate,
  toDate,
  shopCds, // 쇼핑몰코드
  cateNm, // 카테고리명
  standardTime,
  closeModal,
}: Props) => {
  const [productCnt, setProductCnt] = useState(0);
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goodsNm, setGoodsNm] = useState("");
  const [addGoodsNm, setAddGoodsNm] = useState("");

  //const productCountAPIUrl = `http://31.152.254.254:3000/home-shopping/list`;
  //const productCountAPIUrl = `http://43.202.91.211:3000/home-shopping/list`;
  const productCountAPIUrl = `https://test.ilsang.co.kr/home-shopping/list`;

  //const limit = 10; // 한 페이지에 보여질 아이템 수
  const [limit, setLimit] = useState(10);
  const pageLimit = 10; // 페이지네이션에 보여질 페이지 수 제한

  const fetchData = () => {
    const params: any = {
      goodsType: goodsTypeChart, // 상품 유형
      goodsNm: prodName ? prodName : goodsNm, // 상품명
      addGoodsNm: addGoodsNm,
      fromDate: fromDate, // 시작날짜
      toDate: toDate, // 종료날짜
      shopCd: shopCds, // 쇼핑몰코드
      cateNm: cateNm, // 카테고리명
      page: currentPage, // 현재 페이지
      limit: limit, // 사이즈
    };

    console.log(params)

    if (standardTime) {
      params.standardTime = standardTime;
    }

    axios.get(productCountAPIUrl, { params }).then((res) => {
      const { count, data } = res.data[0];

      setProductCnt(count);
      setProducts(data);
    });
  };

  useEffect(() => {
    fetchData();
    //캐시지우기
  }, [
    currentPage,
    limit,
    standardTime,
    cateNm,
    shopCds,
  ]); // currentPage가 변경될 때마다 데이터 다시 가져오기

  const toComma = (n1: string) => {
    return n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(productCnt / limit);

  // 페이지 번호 클릭 시
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션에 표시될 시작 페이지와 끝 페이지 계산
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  //이전페이지 이동
  const handlePrev = () => {
    const prevPage = currentPage - 1;
    handlePageClick(prevPage);
  };

  //다음페이지 이동
  const handleNext = () => {
    const nextPage = currentPage + 1;
    handlePageClick(nextPage);
  };

  // const productDataDownload = useMemo(() => {

  // })

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div>
      {
        <section className="popup input_box hsp_popup on">
          <h3>
            상품 정보&nbsp;&nbsp;|&nbsp;&nbsp;{fromDate} ~ {toDate}
            <button
              type="button"
              className="popup_close"
              onClick={closeModal}
            ></button>
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
                    value={goodsNm}
                    onChange={(e) => setGoodsNm(e.target.value)}
                  />
                  <button
                    className="btn blue_back select_btn"
                    onClick={(e: any) => {
                      e.preventDefault();
                      fetchData();
                    }}
                  >
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
                <select
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                  }}
                  name=""
                  id=""
                >
                  <option value={10}>10건씩 조회</option>
                  <option value={30}>30건씩 조회</option>
                  <option value={50}>50건씩 조회</option>
                  <option value={100}>100건씩 조회</option>
                </select>
              </form>
            </div>
          </div>
          <div className="scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    순번
                    {/* <button className="align_down">&nbsp;</button> */}
                  </th>
                  <th>
                    방송일자
                    {/* <button className="align_down">&nbsp;</button> */}
                  </th>
                  <th>
                    방송시간대
                    {/* <button className="align_down">&nbsp;</button> */}
                  </th>
                  <th>
                    방송시간
                    {/* <button className="align_up">&nbsp;</button> */}
                  </th>
                  <th>
                    채널명
                    {/* <button className="align_up">&nbsp;</button> */}
                  </th>
                  <th>
                    카테고리
                    {/* <button className="align_up">&nbsp;</button> */}
                  </th>
                  <th>
                    상품명
                    {/* <button className="align_up">&nbsp;</button> */}
                  </th>
                  <th>
                    상품유형
                    {/* <button className="align_up">&nbsp;</button> */}
                  </th>
                  <th>
                    판매가(원)
                    {/* <button className="align_up">&nbsp;</button> */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((prod: any, idx: number) => (
                    <tr key={idx}>
                      <td>{prod.no}</td>
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
                        {/* <p className="thumb_txt">{prod.goodsNm}</p> */}
                        <a
                          href={prod.goodsUrl}
                          target="_blank"
                          className="thumb_txt"
                        >
                          {prod.goodsNm}
                        </a>
                      </td>
                      <td>{prod.goodsType}</td>
                      <td className="right">{toComma(prod.price)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="center_flex page">
            <a href="#" onClick={() => handlePageClick(1)}>
              처음
            </a>
            { currentPage !== 1 && (
              <a href="#" onClick={handlePrev}>
                &nbsp;〈&nbsp;&nbsp;&nbsp;
              </a>
            )}
            {/* 페이지 번호 표시 */}
            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => i + startPage
            ).map((page) => (
              <a
                key={page}
                href="#"
                className={page === currentPage ? "on" : ""}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </a>
            ))}

            <a href="#" onClick={handleNext}>
              &nbsp;&nbsp;&nbsp;〉&nbsp;
            </a>
            <a href="#" onClick={() => handlePageClick(totalPages)}>
              끝
            </a>
          </div>
        </section>
      }
    </div>
  );
};

export default ProductList;
