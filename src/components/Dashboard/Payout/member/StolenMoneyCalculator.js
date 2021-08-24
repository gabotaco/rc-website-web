import React, {useState, useEffect} from 'react';
import { Form, Row, Col, Label, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';
import * as Api from "../../../../library/Api/api"
import FormattedNumber from "../../../_common/FormattedNumber"
import { useQuery } from 'react-apollo-hooks';
import * as queries from "../../../../apollo/queries";

const StolenMoneyCalculator = (props) => {
    const [stolenMoney, setStolenMoney] = useState(undefined)
    const [inventoryStolenMoney, setInventoryStolenMoney] = useState(null)

    const {data, error} = useQuery(queries.GET_AUTH_USER_PIGS_VOUCHERS)
    if (error) {
        alert("Unable to get your voucher count")
    }
    
    useEffect(() => {
        Api.getTycoonData().then((response) => {
            if (response.data.inventory.stolen_money) {
                if (stolenMoney === undefined) {
                    setStolenMoney(response.data.inventory.stolen_money.amount)
                }
                setInventoryStolenMoney(response.data.inventory.stolen_money.amount)
            } else {
                setInventoryStolenMoney(0)
            }
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    function voucherWorth(playerTotalVouchers, voucherAmount) { //get how much to pay the person
        /* eslint-disable */
        if (playerTotalVouchers < 6000) { //Hustler
            var RankVouchers = 6000
            var rankWorth = 3500
        } else if (playerTotalVouchers < 18000) { //Pickpocket
            var RankVouchers = 18000
            var rankWorth = 4000
        } else if (playerTotalVouchers < 38000) { //Thief
            var RankVouchers = 38000
            var rankWorth = 5000
        } else if (playerTotalVouchers < 68000) { //Lawless
            var RankVouchers = 68000
            var rankWorth = 6000;
        } else if (playerTotalVouchers < 150000) { //Mastermind
            var RankVouchers = 150000
            var rankWorth = 7000
        } else if (playerTotalVouchers < 1500000) { //Overlord
            var RankVouchers = 1500000
            var rankWorth = 8500
        } else {
            var RankVouchers = Infinity
            var rankWorth = 9000
        }
        /* eslint-enable */
        if (playerTotalVouchers + voucherAmount >= RankVouchers) { //rank up
            const NextRankVouchers = voucherWorth(playerTotalVouchers + RankVouchers - playerTotalVouchers, voucherAmount - (RankVouchers - playerTotalVouchers))
            const CurrentRankVouchers = (RankVouchers - playerTotalVouchers) * rankWorth
            return NextRankVouchers + CurrentRankVouchers
        } else { //don't rank up
            return voucherAmount * rankWorth
        }
    }

    return (
        <Form>
            <Row form>
                <Col>
                    <Label>Vouchers</Label>
                    <InputGroup>
                        <Input type="number" placeholder="Vouchers" value={Math.ceil((3 * parseInt(stolenMoney) / 400)) || ''} onChange={(ev) => setStolenMoney(Math.ceil(((parseInt(ev.target.value) / 75) * 10000)))} />
                        <InputGroupAddon addonType="append">
                            <InputGroupText><FormattedNumber num={Math.ceil((3 * parseInt(stolenMoney) / 400))} /></InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col>
                    <Label>Stolen Money {inventoryStolenMoney && <React.Fragment>(<FormattedNumber num={inventoryStolenMoney} /> detected)</React.Fragment>}</Label>
                    <InputGroup>
                        <Input type="number" placeholder="Stolen Money" value={stolenMoney || ''} onChange={(ev) => setStolenMoney(parseInt(ev.target.value))} />
                        <InputGroupAddon addonType="append">
                            <InputGroupText><FormattedNumber num={stolenMoney} /></InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col>
                    <Label>Money</Label>
                    <fieldset disabled>
                        <InputGroup>
                            <Input type="number" placeholder="Money" value={voucherWorth(data.getAuthUserPigsVouchers ? data.getAuthUserPigsVouchers.vouchers : 0, Math.ceil((3 * parseInt(stolenMoney) / 400))) || ''} readOnly />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>$<FormattedNumber num={voucherWorth(data.getAuthUserPigsVouchers ? data.getAuthUserPigsVouchers.vouchers : 0, Math.ceil((3 * parseInt(stolenMoney) / 400)))} /></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </fieldset>
                    
                </Col>
            </Row>
        </Form>
    )
}

export default StolenMoneyCalculator
