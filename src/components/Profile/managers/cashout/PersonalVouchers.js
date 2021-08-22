import React, {useEffect, useState} from 'react';
import FormattedNumber from "../../../_common/FormattedNumber"
import * as Api from "../../../../library/Api/api"
import LoadingIcon from "../../../_presentational/LoadingIcon";

const PersonalVouchers = (props) => {
    const [vouchers, setVouchers] = useState('LOADING');

    useEffect(() => {
        Api.getTycoonData().then((response) => {
            let pigsVouchers = 0;
            let rtsVouchers = 0;
    
            if (response.data.inventory.rts_voucher_air) {
                rtsVouchers += response.data.inventory.rts_voucher_air.amount
            }
    
            if (response.data.inventory.rts_voucher) {
                rtsVouchers += response.data.inventory.rts_voucher.amount
            }
    
            if (response.data.inventory.rts_voucher_heavy) {
                rtsVouchers += response.data.inventory.rts_voucher_heavy.amount
            }
    
            if (response.data.inventory.pigs_voucher) {
                pigsVouchers += response.data.inventory.pigs_voucher.amount
            }
    
            if (props.company === 'rts') {
                setVouchers(rtsVouchers)
            } else if (props.company === 'pigs') {
                setVouchers(pigsVouchers)
            } else {
                setVouchers(rtsVouchers + pigsVouchers)
            }
        }).catch((err) => {
            console.error(err)
            setVouchers('UNKNOWN');
        })
    }, [])

    if (vouchers === 'LOADING') {
        return <LoadingIcon sizeClass={'glimpsicon-32'} />
    } else if (vouchers === 'UNKNOWN') {
        return 'UNKNOWN'
    } else {
        return <FormattedNumber num={vouchers - props.workVouchers} />
    }
}

export default PersonalVouchers
