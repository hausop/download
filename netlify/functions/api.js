exports.handler = async (event) => {

    const query = event.rawQuery || "";

    const url =
        "https://script.google.com/macros/s/AKfycbzevezXvC7qezFEXmrPl_uWY53R65Q2_vDdOu_GIIXqRDm_LV4A_zQByfjyY7SKNYu0/exec"
        + (query ? "?" + query : "");

    try {

        const response = await fetch(url);

        const text = await response.text();

        return {

            statusCode: 200,

            headers: {

                "Content-Type": "application/json",

                "Access-Control-Allow-Origin": "*"

            },

            body: text

        };

    } catch (err) {

        return {

            statusCode: 500,

            body: JSON.stringify({

                error: err.message

            })

        };

    }

};
