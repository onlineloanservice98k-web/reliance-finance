/* =========================================
   FINANCE DEMO - COMPLETE SCRIPT
========================================= */

let editingCustomerIndex = -1;

const customerForm =
    document.getElementById("customerForm");


/* =========================================
   MASK AADHAAR
========================================= */

function maskAadhaar(last4) {

    if (!last4) {
        return "-";
    }

    return "xxxxxxxx" + last4;

}


/* =========================================
   MASK PAN
========================================= */

function maskPan(last4) {

    if (!last4) {
        return "-";
    }

    return "xxxxxx" + last4;

}


/* =========================================
   CHARGE DESCRIPTION
========================================= */

function getChargeDescription(charge) {

    switch (charge) {

        case "RBI Charge":
            return "RBI-related information is shown according to the application details.";

        case "NOC Charge":
            return "NOC-related information is shown according to the application details.";

        case "TDS":
            return "TDS-related information is shown according to the application details.";

        case "Account Hold Charge":
            return "Account hold information is shown according to the application details.";

        case "Processing Charge":
            return "Processing information is shown according to the application details.";

        case "Verification Charge":
            return "Verification information is shown according to the application details.";

        case "Documentation Charge":
            return "Documentation information is shown according to the application details.";

        case "GST":
            return "GST information is shown according to the application details.";

        case "Insurance Charge":
            return "Insurance information is shown according to the application details.";

        case "Other Charge":
            return "Additional charge information is shown according to the application details.";

        default:
            return "Charge information is shown according to the application details.";
    }
}


/* =========================================
   SAVE / UPDATE CUSTOMER
========================================= */

if (customerForm) {

    customerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const customer = {

            customerName:
                document.getElementById("customerName").value.trim(),

            mobileNumber:
                document.getElementById("mobileNumber").value.trim(),

            loanType:
                document.getElementById("loanType").value,

            loanAmount:
                document.getElementById("loanAmount").value,

            aadhaarLast4:
                document.getElementById("aadhaarLast4").value.trim(),

            panLast4:
                document.getElementById("panLast4").value.trim(),

            returnYear:
                document.getElementById("returnYear").value.trim(),

            charge:
                document.getElementById("charge").value,

            chargeAmount:
                document.getElementById("chargeAmount").value,

            percentage:
                document.getElementById("percentage").value,

            bankName:
                document.getElementById("bankName").value.trim(),

            accountHolderName:
                document.getElementById("accountHolderName").value.trim(),

            accountNumber:
                document.getElementById("accountNumber").value.trim(),

            ifscCode:
                document.getElementById("ifscCode").value.trim(),

            upiNumber:
                document.getElementById("upiNumber").value.trim(),

            submittedAt:
                new Date().toLocaleString()

        };


        /* MOBILE VALIDATION */

        if (!/^[0-9]{10}$/.test(customer.mobileNumber)) {

            showAdminMessage(
                "Please enter a valid 10 digit mobile number.",
                "red"
            );

            return;
        }


        /* AADHAAR LAST 4 */

        if (
            customer.aadhaarLast4 &&
            !/^[0-9]{4}$/.test(customer.aadhaarLast4)
        ) {

            showAdminMessage(
                "Aadhaar में केवल आखिरी 4 digits डालें.",
                "red"
            );

            return;
        }


        /* PAN LAST 4 */

        if (
            customer.panLast4 &&
            !/^[A-Za-z0-9]{4}$/.test(customer.panLast4)
        ) {

            showAdminMessage(
                "PAN में केवल आखिरी 4 characters डालें.",
                "red"
            );

            return;
        }


        /* PROGRESS VALIDATION */

        if (
            customer.percentage !== "" &&
            (
                Number(customer.percentage) < 0 ||
                Number(customer.percentage) > 100
            )
        ) {

            showAdminMessage(
                "Progress 0 से 100 के बीच होना चाहिए.",
                "red"
            );

            return;
        }


        let customers =
            JSON.parse(
                localStorage.getItem("relianceCustomers")
            ) || [];


        /* UPDATE CUSTOMER */

        if (editingCustomerIndex !== -1) {

            customers[editingCustomerIndex] = customer;

            localStorage.setItem(
                "relianceCustomers",
                JSON.stringify(customers)
            );

            showAdminMessage(
                "Customer details updated successfully.",
                "green"
            );

            editingCustomerIndex = -1;

            customerForm.reset();

            setSubmitButton("Submit Customer");

            loadCustomers();

            return;
        }


        /* ADD CUSTOMER */

        customers.push(customer);

        localStorage.setItem(
            "relianceCustomers",
            JSON.stringify(customers)
        );

        showAdminMessage(
            "Customer details saved successfully.",
            "green"
        );

        customerForm.reset();

        loadCustomers();

    });

}


/* =========================================
   ADMIN MESSAGE
========================================= */

function showAdminMessage(message, color) {

    const box =
        document.getElementById("adminMessage");

    if (!box) return;

    box.innerText = message;

    box.style.marginTop = "15px";

    box.style.fontWeight = "bold";

    box.style.color = color;

}


/* =========================================
   SUBMIT BUTTON
========================================= */

function setSubmitButton(text) {

    if (!customerForm) return;

    const button =
        customerForm.querySelector(
            'button[type="submit"]'
        );

    if (button) {

        button.innerText = text;

    }

}


/* =========================================
   EDIT CUSTOMER
========================================= */

function editCustomer(index) {

    const customers =
        JSON.parse(
            localStorage.getItem("relianceCustomers")
        ) || [];


    const customer =
        customers[index];


    if (!customer) return;


    editingCustomerIndex =
        index;


    document.getElementById("customerName").value =
        customer.customerName || "";


    document.getElementById("mobileNumber").value =
        customer.mobileNumber || "";


    document.getElementById("loanType").value =
        customer.loanType || "";


    document.getElementById("loanAmount").value =
        customer.loanAmount || "";


    document.getElementById("aadhaarLast4").value =
        customer.aadhaarLast4 || "";


    document.getElementById("panLast4").value =
        customer.panLast4 || "";


    document.getElementById("returnYear").value =
        customer.returnYear || "";


    document.getElementById("charge").value =
        customer.charge || "";


    document.getElementById("chargeAmount").value =
        customer.chargeAmount || "";


    document.getElementById("percentage").value =
        customer.percentage || "";


    document.getElementById("bankName").value =
        customer.bankName || "";


    document.getElementById("accountHolderName").value =
        customer.accountHolderName || "";


    document.getElementById("accountNumber").value =
        customer.accountNumber || "";


    document.getElementById("ifscCode").value =
        customer.ifscCode || "";


    document.getElementById("upiNumber").value =
        customer.upiNumber || "";


    setSubmitButton("Update Customer");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    showAdminMessage(
        "Customer details loaded for editing.",
        "#0757a8"
    );

}


/* =========================================
   LOAD CUSTOMERS
========================================= */

function loadCustomers() {

    const list =
        document.getElementById("customerList");


    if (!list) return;


    const customers =
        JSON.parse(
            localStorage.getItem("relianceCustomers")
        ) || [];


    if (customers.length === 0) {

        list.innerHTML =
            "<p>No customer data available.</p>";

        return;
    }


    list.innerHTML = "";


    customers
        .slice()
        .reverse()
        .forEach(function (customer, reverseIndex) {


            const realIndex =
                customers.length - 1 - reverseIndex;


            const box =
                document.createElement("div");


            box.className =
                "customer-record";


            box.innerHTML = `

                <p>
                    <b>Customer:</b>
                    ${customer.customerName || "-"}
                </p>

                <p>
                    <b>Mobile:</b>
                    ${customer.mobileNumber || "-"}
                </p>

                <p>
                    <b>Loan Type:</b>
                    ${customer.loanType || "-"}
                </p>

                <p>
                    <b>Loan Amount:</b>
                    ₹${customer.loanAmount || "0"}
                </p>

                <p>
                    <b>Aadhaar:</b>
                    ${maskAadhaar(customer.aadhaarLast4)}
                </p>

                <p>
                    <b>PAN:</b>
                    ${maskPan(customer.panLast4)}
                </p>

                <p>
                    <b>Return Period:</b>
                    ${customer.returnYear || "-"}
                </p>

                <p>
                    <b>Charge:</b>
                    ${customer.charge || "-"}
                </p>

                <p>
                    <b>Charge Amount:</b>
                    ₹${Number(
                        customer.chargeAmount || 0
                    ).toLocaleString("en-IN")}
                </p>

                <p>
                    <b>Application Progress:</b>
                    ${customer.percentage || "0"}%
                </p>

                <hr>

                <p>
                    <b>Bank Name:</b>
                    ${customer.bankName || "-"}
                </p>

                <p>
                    <b>Account Holder:</b>
                    ${customer.accountHolderName || "-"}
                </p>

                <p>
                    <b>Account Number:</b>
                    ${customer.accountNumber || "-"}
                </p>

                <p>
                    <b>IFSC Code:</b>
                    ${customer.ifscCode || "-"}
                </p>

                <p>
                    <b>UPI ID:</b>
                    ${customer.upiNumber || "-"}
                </p>

                <p>
                    <b>Submitted:</b>
                    ${customer.submittedAt || "-"}
                </p>

                <button
                    type="button"
                    class="edit-customer-btn"
                    onclick="editCustomer(${realIndex})"
                >
                    Edit Customer
                </button>

            `;


            list.appendChild(box);

        });

}


loadCustomers();


/* =========================================
   CHECK STATUS
========================================= */

function checkStatus() {

    const mobileInput =
        document.getElementById("mobileNumber");


    const result =
        document.getElementById("statusResult");


    if (!mobileInput || !result) return;


    const mobile =
        mobileInput.value.trim();


    if (!/^[0-9]{10}$/.test(mobile)) {

        result.innerHTML = `

            <p class="status-error">

                Please enter a valid 10 digit mobile number.

            </p>

        `;

        return;
    }


    const customers =
        JSON.parse(
            localStorage.getItem("relianceCustomers")
        ) || [];


    const customer =
        customers.find(function (item) {

            return item.mobileNumber === mobile;

        });


    if (!customer) {

        result.innerHTML = `

            <p class="status-error">

                No application found.

            </p>

        `;

        return;
    }


    const percentage =
        Math.max(
            0,
            Math.min(
                100,
                Number(customer.percentage || 0)
            )
        );


    const chargeAmount =
        Number(
            customer.chargeAmount || 0
        ).toLocaleString("en-IN");


    /* =====================================
       PROFESSIONAL STATUS CARD
    ===================================== */

    result.innerHTML = `

        <div class="status-card">


            <!-- HEADER -->

            <div class="status-header">

                <div>

                    <span class="small-label">

                        Customer

                    </span>


                    <h3>

                        ${customer.customerName || "Customer"}

                    </h3>

                </div>


                <span class="status-badge">

                    Application Status

                </span>

            </div>


            <!-- PROGRESS -->

            <div class="progress-section">


                <div class="progress-title">

                    <span>

                        Application Progress

                    </span>


                    <b>

                        ${percentage}%

                    </b>

                </div>


                <div class="progress-box">


                    <div
                        class="progress-bar"
                        style="width:${percentage}%"
                    >

                        ${percentage}%

                    </div>


                </div>


            </div>


            <!-- CUSTOMER DETAILS -->

            <div class="status-details">


                <div class="status-section-title">

                    Customer Name:
                    ${customer.customerName || "Customer"}

                </div>


                <div class="detail-item">

                    <span>

                        Loan Type

                    </span>


                    <b>

                        ${customer.loanType || "-"}

                    </b>

                </div>


                <div class="detail-item">

                    <span>

                        Loan Amount

                    </span>


                    <b>

                        ₹${Number(
                            customer.loanAmount || 0
                        ).toLocaleString("en-IN")}

                    </b>

                </div>


                <div class="detail-item">

                    <span>

                        Mobile Number

                    </span>


                    <b>

                        ${customer.mobileNumber || "-"}

                    </b>

                </div>


                <div class="detail-item">

                    <span>

                        Return Period

                    </span>


                    <b>

                        ${customer.returnYear || "-"}

                    </b>

                </div>


            </div>


            <!-- CHARGE DETAILS -->

            <div class="charge-box">


                <div class="status-section-title">

                    Charge Details

                </div>


                <div class="charge-row">


                    <span>

                        Charge Type

                    </span>


                    <b>

                        ${customer.charge || "-"}

                    </b>


                </div>


                <div class="charge-amount-box">


                    <span>

                        Applicable Charge

                    </span>


                    <strong>

                        ₹${chargeAmount}

                    </strong>


                </div>


                <div class="charge-description">


                    <strong>

                        ${customer.charge || "Charge Information"}

                    </strong>


                    <p>

                        ${getChargeDescription(customer.charge)}

                    </p>


                </div>


            </div>


            <!-- VERIFICATION -->

            <div class="identity-details">


                <div class="status-section-title">

                    Verification Details

                </div>


                <div class="detail-row">


                    <span>

                        Aadhaar

                    </span>


                    <b>

                        ${maskAadhaar(customer.aadhaarLast4)}

                    </b>


                </div>


                <div class="detail-row">


                    <span>

                        PAN

                    </span>


                    <b>

                        ${maskPan(customer.panLast4)}

                    </b>


                </div>


            </div>


            <!-- BANK DETAILS -->

            <div class="bank-details">


                <div class="status-section-title">

                    Bank Account Details

                </div>


                <div class="detail-row">


                    <span>

                        Bank Name

                    </span>


                    <b>

                        ${customer.bankName || "-"}

                    </b>


                </div>


                <div class="detail-row">


                    <span>

                        Account Holder

                    </span>


                    <b>

                        ${customer.accountHolderName || "-"}

                    </b>


                </div>


                <div class="detail-row">


                    <span>

                        Account Number

                    </span>


                    <b>

                        ${customer.accountNumber || "-"}

                    </b>


                </div>


                <div class="detail-row">


                    <span>

                        IFSC Code

                    </span>


                    <b>

                        ${customer.ifscCode || "-"}

                    </b>


                </div>


                <div class="detail-row">


                    <span>

                        UPI ID

                    </span>


                    <b>

                        ${customer.upiNumber || "-"}

                    </b>


                </div>


                <div class="payment-info-box">


                    <strong>

                        Account Information

                    </strong>


                    <p>

                        The account details shown above
                        are demonstration information only.
                        No payment is required.

                    </p>


                </div>


            </div>


        </div>


        <p class="status-demo-text">

            Application information for demonstration purposes.

        </p>

    `;

}


/* =========================================
   MOBILE HAMBURGER MENU
========================================= */

const menuBtn =
    document.getElementById("menuBtn");


const mainNav =
    document.getElementById("mainNav");


if (menuBtn && mainNav) {


    menuBtn.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle(
                "menu-open"
            );

        }
    );


    const menuLinks =
        mainNav.querySelectorAll("a");


    menuLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNav.classList.remove(
                        "menu-open"
                    );

                }
            );

        }
    );

}