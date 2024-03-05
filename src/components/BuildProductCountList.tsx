import { ProdcutPercentInfo, ProductCountInfo } from '@/app/homeShopping/page';
import { getDateClassName, parseRawDate } from '@/utils/util';
import React from 'react';

type BuildProductCountListProps = {
    productCountInfo: ProductCountInfo;
    productPercentInfo: ProdcutPercentInfo;
    openTimeModal: (date: Date) => void;
};

export default function BuildProductCountList({productCountInfo, productPercentInfo, openTimeModal}: BuildProductCountListProps) {
    return Object.entries(productCountInfo).map(([rawDate, count]) => {
        const date: Date = parseRawDate(rawDate);

        return (
            <li key={rawDate} onClick={() => openTimeModal(date)} className={getDateClassName(date)}>
                <div className="chart">
                    <div style={{ height: `${productPercentInfo[rawDate]}%` }}></div>
                </div>
                <h4 className="date">{rawDate}</h4>
                <p className="num">{count}개</p>
            </li>
        );
    });
}

