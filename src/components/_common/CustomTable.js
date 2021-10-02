// @flow
import React, {useEffect} from 'react'
import {Table} from 'reactstrap'
const $ = require( 'jquery' );
const DataTable = require( 'datatables.net-bs4' );

DataTable.defaults.dom="<'row'<'col-12 col-md-6'l><'col-12 col-md-6'f>><'row'<'col-12'tr>><'row'<'col-12 col-md-5'i><'col-12 col-md-7'p>>"
$.fn.dataTable = DataTable;
$.fn.dataTableSettings = DataTable.settings;
DataTable.ext.classes.sWrapper = `dataTables_wrapper dt-bootstrap4`
$.fn.dataTableExt = DataTable.ext;
DataTable.$ = $;
$.fn.DataTable.ext.pager.numbers_length = 5;

 
$.fn.DataTable = function ( opts ) {
    return $(this).dataTable( opts ).api();
};

const CustomTable = (props) => {
    useEffect(() => {
        if (!props.config.disabled) {
            const table = $(`#${props.config.id}`).DataTable(props.config.jquery)
            if (props.onCreated) {
                props.onCreated(table)
            }
        }
    }, [])

    return (
        <div className="table-responsive">
            <Table hover id={props.config.id}>
                <thead>
                    <tr>
                        {
                            props.headers.map((header, key) => {
                                return <th scope="col" key={key}>{header}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((data, key) => {
                            return props.format(data, key)
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default CustomTable
