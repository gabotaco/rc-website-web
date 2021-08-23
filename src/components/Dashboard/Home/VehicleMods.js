import React, {useEffect, useState} from 'react';
import SearchableDropdown from "../../_common/SearchableDropdown"
import {Form, Row, Col, FormGroup, Label, Button, Tooltip} from 'reactstrap'
import * as Api from '../../../library/Api/api'
import VehicleDataTable from './VehicleDataTable';

const VehicleMods = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const [bennysData, setBennysData] = useState('LOADING')
    const [isLoading, setIsLoading] = useState(true)
    const [vehicleData, setVehicledata] = useState(null)

    function RandomNumber(Min, Max) {
        return Math.floor(Math.random() * Max - Min) + Min;
    }
    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("input");
        document.body.appendChild(textArea);

        textArea.value = text;

        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
        }

        document.body.removeChild(textArea);
    }

    function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text)
    }
    
    function randomMod() {
        const modString = `{"mods": {"1": ${RandomNumber(-1, 2)}, "2": ${RandomNumber(-1, 2)}, "3": ${RandomNumber(-1, 2)}, "4": ${RandomNumber(-1, 2)}, "5": ${RandomNumber(-1, 1)}, "6": ${RandomNumber(-1, 1)}, "7": ${RandomNumber(-1, 1)}, "8": ${RandomNumber(-1, 1)}, "9": ${RandomNumber(-1, 1)}, "10": ${RandomNumber(-1, 1)}, "11": 3, "12": 2, "13": 2, "14": ${RandomNumber(0, 26)}, "15": 3, "16": 4, "17": -1, "18": 1, "19": -1, "20": 1, "21": -1, "22": ${RandomNumber(0, 1)}, "23": ${RandomNumber(0, 51)}, "24": ${RandomNumber(0, 20)}, "25": ${RandomNumber(0, 5)}, "26": ${RandomNumber(0, 15)}, "27": ${RandomNumber(0, 4)}, "28": ${RandomNumber(0, 44)}, "29": -1, "30": ${RandomNumber(0, 13)}, "31": -1, "32": -1, "33": ${RandomNumber(0, 15)}, "34": ${RandomNumber(0, 14)}, "35": ${RandomNumber(0, 21)}, "36": ${RandomNumber(0, 1)}, "37": ${RandomNumber(0, 6)}, "38": -1, "39": ${RandomNumber(0, 3)}, "40": ${RandomNumber(0, 4)}, "41": -1, "42": -1, "43": -1, "44": -1, "45": -1, "46": ${RandomNumber(-0, 10)}, "47": -1, "48": ${RandomNumber(0, 5)}, "0": ${RandomNumber(0, 3)}}}`
        copyTextToClipboard(modString)
        setTooltipOpen(true)
    }

    useEffect(() => {
        document.getElementById("random-mod-button").addEventListener("mouseout", e => {
            setTooltipOpen(false)
        })

        Api.getBennysList().then((response) => {
            const usedVehicles = [];

            response.forEach(vehicle => {
                if (usedVehicles.filter((value) => value.inner === vehicle).length > 0) return;
                usedVehicles.push({
                    inner: vehicle,
                    searchString: vehicle
                })
            });
            setBennysData(usedVehicles)
            setIsLoading(false)
        }).catch((err) => {
            console.error(err);
            setBennysData('ERROR')
            setIsLoading(false)
        })
    }, [])

    function carSelected(vehicle) {
        setIsLoading(true)
        Api.searchBennys(vehicle.inner).then((response) => {
            setVehicledata(response)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    return (
        <div>
            <Form noValidate autoComplete="off">
                <Row form>
                    <Col>
                        <FormGroup>
                            <Label for="random-mod-buttom">Random</Label>
                            <Button color="success" id="random-mod-button" className="form-control" onClick={randomMod}>Generate</Button>
                            <Tooltip isOpen={tooltipOpen} target="random-mod-button">
                                Copied!
                            </Tooltip>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Search</Label>
                            <SearchableDropdown placeholder="Vehicle name" data={bennysData} onSelected={carSelected} isLoading={isLoading} />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            {vehicleData && <VehicleDataTable data={vehicleData} />}
        </div>
    )
}

export default VehicleMods
