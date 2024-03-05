/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import ProductList from '../modal/ProductList';
import Header from '../Header';
import { CATEGORYS, DATES, SHOP_NAME } from '@/utils/constants';
import { convertDate, fotmattedDate } from '@/utils/util';
import SearchBox from '@/components/SearchBox';
import SearchBoxByChart from '@/components/SearchBoxByChart';
import SearchInfoBox from '@/components/SearchInfoBox';
import BuildProductCountList from '@/components/BuildProductCountList';
import { useFetchProductCount } from '@/hooks/useFetchProductCount';

export type ProductCountInfo = Record<string, number>;
export type ProdcutPercentInfo = Record<string | number, number>;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
    },
};

function homeShopping() {

    const channels = Object.entries(SHOP_NAME).map(([id, label]) => ({
        id,
        label,
    }));

    const DEFAULT_CHANNEL = channels.map((channel) => channel.id);

    //달력 선택
    const [endDate, setEndDate] = useState<string>(convertDate(new Date()));
    const [startDate, setStartDate] = useState<string>(convertDate(new Date()));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [shopCds, setShopCds] = useState<string[]>(CATEGORYS.map((category) => category.id))
    const [currentCategory, setCurrentCategory] = useState<string[]>([]);
    const [currentChannel, setCurrentChannel] = useState<string[]>([]);


    const [selectedChannels, setSelectedChannels] = useState<string[]>(DEFAULT_CHANNEL);
    const [loading, setLoading] = useState(false);

    const [prodName, setProdName] = useState('');
    const [selectedDate, setSelectedDate] = useState('오늘');
    const [goodsType, setGoodsType] = useState('');
    const [standardTime, setStandardTime] = useState('');

    const [goodsTypeChart, setGoodTypeChart] = useState('');

    const {
        fetchProductCount,
        categorys,
        kindProds,
        productCountInfo,
        productPercentInfo,
        shopCategory,
        standardCategorys,
        totalCount,
    } = useFetchProductCount({ startDate, endDate, prodName, selectedChannels, shopCds, setLoading });

    const handleInitialCategoryAndChannel = () => {
        setCurrentCategory([]);
        setStandardTime('');
        setGoodsType('');
        setGoodTypeChart('');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        handleInitialCategoryAndChannel();
    };

    const handleChannelChange = (event: any) => {
        const { id, checked } = event.target;
        if (id === 'channelall') {
            if (checked) {
                setSelectedChannels(channels.map((channel) => channel.id));
            } else {
                setSelectedChannels([]);
            }
        } else {


            if (checked) {
                setSelectedChannels((prevSelectedChannels: any) => [...prevSelectedChannels, id]);
            } else {
                setSelectedChannels((prevSelectedChannels: any[]) =>
                    prevSelectedChannels.filter((channel: any) => channel !== id)
                );
            }
        }
    };

    const handleShopCdChange = (event: any) => {
        const { id, checked } = event.target;
        if (id === '전체') {
            if (checked) {
                setShopCds(CATEGORYS.map((category) => category.id));
            } else {
                setShopCds([]);
            }
        } else {
            if (checked) {
                setShopCds((prevShopCds: any) => [...prevShopCds, id]);
            } else {
                setShopCds((prevShopCds: any[]) => prevShopCds.filter((shopCd: any) => shopCd !== id));
            }
        }
    };

    const search = () => {
        fetchProductCount();
    };

    const handleDateChange = (event: any) => {
        setSelectedDate(event.target.id);
        const oneWeekAgo = new Date();

        if (event.target.id == '1주일') {
            const endWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
            const WeekformattedDate = oneWeekAgo.toISOString().split('T')[0];
            const formattedDate = endWeekAgo.toISOString().split('T')[0];

            // 변경된 날짜를 startDate에 설정
            setStartDate(WeekformattedDate);
            setEndDate(formattedDate);
        } else if (event.target.id == '오늘') {
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 0);

            // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
            const formattedDate = oneWeekAgo.toISOString().split('T')[0];

            // 변경된 날짜를 startDate에 설정
            setStartDate(formattedDate);
            setEndDate(formattedDate);
        } else if (event.target.id == '1개월') {
            const endWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

            // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
            const MonthformattedDate = oneWeekAgo.toISOString().split('T')[0];
            const formattedDate = endWeekAgo.toISOString().split('T')[0];

            // 변경된 날짜를 startDate에 설정
            setStartDate(MonthformattedDate);
            setEndDate(formattedDate);
        } else if (event.target.id == '2024년') {
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 0);

            // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
            const formattedDate = oneWeekAgo.toISOString().split('T')[0];

            // 변경된 날짜를 startDate에 설정
            setStartDate('2024-01-01');
            setEndDate(formattedDate);
        } else if (event.target.id == '2023년') {
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

            // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
            const formattedDate = oneWeekAgo.toISOString().split('T')[0];

            setStartDate('2023-01-01');
            setEndDate('2023-12-31');
        }
    };

    const cateOpen = (e: any, kind: string) => {
        e.preventDefault();
        setCurrentCategory([kind])
        setCurrentChannel(selectedChannels)
        setIsModalOpen(true);
        setStandardTime('');
    };

    const shopOpen = (e: any, kind: string) => {
        e.preventDefault();
        const channel = channels.find((i) => i.label === kind);
        if (!channel) {
            console.error(`${kind}이 레이블인 채널 정보를 찾을 수 없습니다`);
            return;
        }
        setCurrentCategory(shopCds);
        setCurrentChannel([channel.id]);
        setIsModalOpen(true);
    };

    const timeOpen = (e: any, kind: string) => {
        e.preventDefault();
        setCurrentCategory(shopCds);
        setCurrentChannel(selectedChannels)
        setStandardTime(kind);
        setIsModalOpen(true);
    };

    const openTimeModal = (toDate: Date) => {
        const cvDate = convertDate(toDate);
        setCurrentCategory(shopCds);
        setCurrentChannel(selectedChannels)
        setStartDate(cvDate);
        setEndDate(cvDate);
        setIsModalOpen(true);
    };

    const goodsTypeOpen = (type: string) => {
        setGoodTypeChart(type);
        setIsModalOpen(true);
        setCurrentCategory(shopCds);
        setCurrentChannel(selectedChannels)
    };
    if (loading) {
        return <div>로딩중...</div>;
    }

    return (
        <div>
            <Header />
            <article className="status hsp">
                <h2 className="sub_title">
                    홈쇼핑 방송 정보
                    <p className="update_txt">
                        <strong>업데이트</strong> {fotmattedDate()}
                    </p>
                </h2>
                <section className="search_box">
                    <h3>방송일자 별 상품수</h3>
                    <ul className="chart_box">
                        {productCountInfo && productPercentInfo && (
                            <BuildProductCountList
                                productCountInfo={productCountInfo}
                                productPercentInfo={productPercentInfo}
                                openTimeModal={openTimeModal}
                            />
                        )}
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
                                        onChange={(e: { target: { value: any } }) => setProdName(e.target.value)}
                                        value={prodName}
                                        placeholder="상품명을 입력해주세요"
                                    />
                                </li>
                                <li className="checkbox_wrap">
                                    <label className="label" htmlFor="">
                                        카테고리
                                    </label>
                                    <fieldset className="date_radio checkbox">
                                        {CATEGORYS.map((category) => (
                                            <span key={category.id}>
                                                <input
                                                    type="checkbox"
                                                    id={category.id}
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
                                            checked={selectedChannels.includes('total')}
                                            onChange={handleChannelChange}
                                        />
                                        <label htmlFor="channelall">전체</label>
                                        {channels.map((channel) => {
                                            if (channel.id !== 'total') {
                                                return (
                                                    <span key={channel.id}>
                                                        <input
                                                            type="checkbox"
                                                            id={channel.id}
                                                            checked={selectedChannels.includes(channel.id)}
                                                            onChange={handleChannelChange}
                                                        />
                                                        <label htmlFor={channel.id}>{channel.label}</label>
                                                    </span>
                                                );
                                            }
                                        })}
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
                                            onChange={(e: { target: { value: any } }) => setStartDate(e.target.value)}
                                            value={startDate}
                                            className="s_text"
                                        />
                                        <span className="date_blank">-</span>
                                        <input
                                            type="date"
                                            id="endDate"
                                            onChange={(e: { target: { value: any } }) => setEndDate(e.target.value)}
                                            value={endDate}
                                            className="s_text"
                                        />
                                        <fieldset className="date_radio">
                                            {DATES.map((date) => (
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
                                        </fieldset>
                                    </div>
                                </li>
                            </ul>
                            <div className="flex" onClick={() => search()}>
                                <button className="btn">조회하기</button>
                            </div>
                        </div>
                        <summary></summary>
                    </details>
                </section>
                <SearchInfoBox
                    startDate={startDate}
                    endDate={endDate}
                    prodName={prodName}
                    totalCount={totalCount}
                    shopCds={shopCds}
                    selectedChannels={selectedChannels}
                />

                {/* TODO */}
                <div className="btm_chart">
                    {categorys && shopCategory && standardCategorys && kindProds && (
                        <>
                            <SearchBox title={'카테고리 별'} searchList={categorys} searchOpen={cateOpen} />
                            <SearchBox title={'홈쇼핑 채널 별'} searchList={shopCategory} searchOpen={shopOpen} />
                            <SearchBox title={'시간대 별'} searchList={standardCategorys} searchOpen={timeOpen} />
                            <SearchBoxByChart title={'유형 별'} searchList={kindProds} searchOpen={goodsTypeOpen} />
                        </>
                    )}
                </div>

                {/* 팝업 */}
                {/*  */}
            </article>
            <Modal
                style={customStyles}
                isOpen={isModalOpen}
                onRequestClose={() => {
                    fetchProductCount();
                    setIsModalOpen(!isModalOpen);
                }}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <ProductList
                    goodsTypeChart={goodsTypeChart}
                    prodName={prodName}
                    fromDate={startDate}
                    toDate={endDate}
                    shopCds={currentChannel}
                    cateNm={currentCategory}
                    standardTime={standardTime}
                    closeModal={handleCloseModal}
                />
            </Modal>
        </div>
    );
}

export default homeShopping;
