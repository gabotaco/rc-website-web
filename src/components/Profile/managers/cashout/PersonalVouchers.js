import React, {useEffect, useState} from 'react';
import FormattedNumber from "../../../_common/FormattedNumber"
import * as Api from "../../../../library/Api/api"
import AppConfigs from "../../../../config/app_configs"
import LoadingIcon from "../../../_presentational/LoadingIcon";

const PersonalVouchers = (props) => {
    const [vouchers, setVouchers] = useState('LOADING');

    function parseData(response) {
        if (response.error === "Non-existant user") {
            setVouchers('UNKNOWN')
            return;
        }

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
    }

    useEffect(() => {
        if (localStorage.getItem('data')) {
            if (localStorage.getItem('data-time') && parseInt(localStorage.getItem('data-time')) > Date.now() - AppConfigs.tycoon_cooldown) {
                return parseData(JSON.parse(localStorage.getItem('data')))
            }
        }

        Api.getTycoonData().then((response) => {
            localStorage.setItem("data", JSON.stringify(response));
            localStorage.setItem("data-time", Date.now());
            return parseData(response)
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
