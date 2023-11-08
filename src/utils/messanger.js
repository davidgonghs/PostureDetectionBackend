/************* RESPONSE UTILS *************/

/* return a response with a status, message and a data */
const data = (message, data, log = false) => {
    const response = { //schema for response
        status: 200,
        message: message,
        data: data,
    };
    log ? console.log( //log if true
        "", "\n",
        "- Status:", response.status, "\n",
        "- Message:", response.message, "\n",
        "- Data:", response.data, "\n",
    ) : null;
    return response;
}

/* return an error response with a status and message */
const error = (status, message, log = false) => {
    const response = { //schema for response
        status: status,
        message: message,
    };
    log ? console.log( //log if true
        "", "\n",
        "- Status:", response.status, "\n",
        "- Message:", response.message, "\n",
    ) : null;
    return response;
}

/*************** EXPORTS ***************/
module.exports = {
    data,
    error,
}