import { ProdcutPercentInfo, ProductCountInfo } from "@/app/homeShopping/page";
import { SearchCategoryType } from "@/components/SearchBox";
import axios from "axios";
import { useEffect, useState } from "react";

type fetchDataType = {
    startDate: string;
    endDate: string;
    prodName: string;
    selectedChannels: string[];
    shopCds: string[];
    setLoading: (loading: boolean) => void;
}

export const useFetchProductCount = ({
    startDate,
    endDate,
    prodName,
    selectedChannels,
    shopCds,
    setLoading,
}: fetchDataType) => {
    const productCountAPIUrl = `https://test.ilsang.co.kr/home-shopping/dashboard`;

    const [categorys, setCategorys] = useState<SearchCategoryType[]>();
    const [shopCategory, setShopCategory] = useState<SearchCategoryType[]>([]);
    const [standardCategorys, setStandardCategorys] = useState<SearchCategoryType[]>([]);
    const [pertcentDataA, setPercentDataA] = useState<SearchCategoryType[]>([]);
    const [productPercentInfo, setProductPercentInfo] = useState<ProdcutPercentInfo | undefined>();
    const [productCountInfo, setProductCountInfo] = useState<ProductCountInfo | undefined>();
    const [kindProds, setKindProds] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchProductCount = () => {
        try {
            const params = {
                // 필요한 query params를 {} 형태에 담아준다.
                fromDate: startDate,
                toDate: endDate,
                //홈쇼핑채널
                shopCd: selectedChannels,
                goodsNm: prodName,
                //카테고리
                cateNm: shopCds,
            };
    
            // const queryString = new URLSearchParams(params).toString(); // url에 쓰기 적합한 querySting으로 return 해준다.
            // const requrl = `${productCountAPIUrl}?${queryString}`; // 완성된 요청 url.
            axios
                .get(productCountAPIUrl, { params })
                .then((res: { data: { recentData: any; percentData: any; searchData: any } }) => {
                    console.log(res.data);
                    const { recentData, percentData, searchData } = res.data;

                    setTotalCount(Object.values(searchData.category).reduce((acc: number, cur: any) => acc + cur, 0));
    
                    const allCate = Object.keys(percentData.catePercent).map((key) => {
                        return {
                            kind: key,
                            percent: percentData.catePercent[key],
                            cnt: searchData.category[key],
                        };
                    });
    
                    const shopCate = Object.keys(percentData.shopPercent).map((key) => {
                        return {
                            kind: key,
                            percent: percentData.shopPercent[key],
                            cnt: searchData.shopCd[key],
                        };
                    });
    
                    const standardCate = Object.keys(percentData.standardPercent).map((key) => {
                        return {
                            kind: key,
                            percent: percentData.standardPercent[key],
                            cnt: searchData.standardTime[key],
                        };
                    });
    
                    const recentCate = Object.keys(percentData.recentPercent).map((key) => {
                        return {
                            kind: key,
                            percent: percentData.recentPercent[key],
                            cnt: recentData[key],
                        };
                    });
    
                    const kindsProduct = Object.keys(percentData.goodsPercent).map((key) => {
                        return {
                            kind: key,
                            percent: percentData.goodsPercent[key],
                            cnt: searchData.goodsType[key],
                        };
                    });
    
                    setCategorys(allCate);
                    setShopCategory(shopCate);
                    setStandardCategorys(standardCate);
                    setPercentDataA(percentData);
                    setProductCountInfo(recentData);
    
                    // TODO: 테스트를 위해 샘플 데이터를 사용했음. 추후 API 데이터로 변경 필요
                    setProductPercentInfo(percentData.recentPercent);
    
                    setKindProds(kindsProduct);
    
                    setLoading(false);
                });
        } catch (error) {
            console.log('error', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductCount();
    }, [startDate, endDate])

    return { fetchProductCount, totalCount, categorys, shopCategory, standardCategorys, pertcentDataA, productPercentInfo, productCountInfo, kindProds}
}