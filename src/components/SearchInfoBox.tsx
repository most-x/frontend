import { SHOP_NAME } from '@/utils/constants';
import React from 'react';

type SearchInfoBoxProps = {
    startDate: string;
    endDate: string;
    prodName: string;
    totalCount: number;
    shopCds: string[];
    selectedChannels: string[];
};

export default function SearchInfoBox({
    startDate,
    endDate,
    prodName,
    shopCds,
    selectedChannels,
    totalCount,
}: SearchInfoBoxProps) {
    console.log(shopCds);
    const channels = selectedChannels.map((channel) => SHOP_NAME[channel as keyof typeof SHOP_NAME]);
    return (
        <section className="search_r_box">
            <div className="search_r">
                <p>
                    방송일자
                    <b>
                        {startDate}~ {endDate}{' '}
                    </b>
                </p>
                <p>
                    상품명
                    <b> {prodName ? prodName : '전체'} </b>
                    <span>|</span>
                    카테고리
                    <b>{shopCds.includes('전체') ? '전체' : shopCds.join(',')}</b>
                    <span>|</span>
                    홈쇼핑 채널
                    <b>{channels.includes('전체') ? '전체' : channels.join(',')}</b>의
                </p>
                <p className="search_r_f">
                    조회 상품수는 총<b>{totalCount}개</b>
                    입니다.
                </p>
            </div>
        </section>
    );
}
