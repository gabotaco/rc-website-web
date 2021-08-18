// @flow

const FormattedNumber = (props) => {
    function formatNumber(num) {
        if (!num) return "0"
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //fancy regex
    }

    return formatNumber(props.num)
}

export default FormattedNumber
