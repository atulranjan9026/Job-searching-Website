// importing modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const sha256 = require("sha256");
const uniqid = require("uniqid");
const { ethers } = require('ethers');
const DataStorageABI = require('./DataStorageABI');

const contractAddress = "0x91f3c7Faabcf226b4863A11c2Ca5e5980C3dF101";
// creating express application
const app = express();

// UAT environment
const MERCHANT_ID = "PGTESTPAYUAT";
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_INDEX = 1;
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const APP_BE_URL = "http://localhost:3002"; // our application

// setting up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Defining a test route
app.get("/", (req, res) => {
  res.send("PhonePe Integration APIs!");
});

// endpoint to initiate a payment
app.get("/pay", async function (req, res, next) {
    // Initiate a payment

    // Transaction amount
    const amount = +req.query.amount;
    const sender = req.query.sender;
    const receiver = req.query.receiver;
    // User ID is the ID of the user present in our application DB
    let userId = "MUID123";

    // Generate a unique merchant transaction ID for each transaction
    let merchantTransactionId = uniqid();

    // redirect url => phonePe will redirect the user to this url once payment is completed. It will be a GET request, since redirectMode is "REDIRECT"
    let normalPayLoad = {
        merchantId: MERCHANT_ID, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amount * 100, // converting to paise
        redirectUrl: `${APP_BE_URL}/payment/validate/${merchantTransactionId}?amount=${amount}&sender=${sender}&receiver=${receiver}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    // make base64 encoded payload
    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64EncodedPayload = bufferObj.toString("base64");

    // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
    let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

    axios
        .post(
            `${PHONE_PE_HOST_URL}/pg/v1/pay`,
            {
                request: base64EncodedPayload,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerifyChecksum,
                    accept: "application/json",
                },
            }
        )
        .then(function (response) {
            console.log("response->", JSON.stringify(response.data));
            console.log("Payment validation response:",amount,sender,receiver);

            res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        })
        .catch(function (error) {
            res.send(error);
        });
});

// endpoint to check the status of payment
// endpoint to check the status of payment
app.get("/payment/validate/:merchantTransactionId", async function (req, res) {
    const { merchantTransactionId } = req.params;
    const sender = req.query.sender;
    const receiver = req.query.receiver;
    const amount = req.query.amount;

    // check the status of the payment using merchantTransactionId
    if (merchantTransactionId) {
        let statusUrl =
            `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` +
            merchantTransactionId;

        // generate X-VERIFY
        let string =
            `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
        let sha256_val = sha256(string);
        let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

        axios
            .get(statusUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerifyChecksum,
                    "X-MERCHANT-ID": merchantTransactionId,
                    accept: "application/json",
                },
            })
            .then(async function (response) {
                console.log("response->", response.data);
                console.log("Payment validation response:", amount, sender, receiver);
                if (response.data && response.data.code === "PAYMENT_SUCCESS") {
                    // Perform blockchain interaction
                    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
                    const accounts = await provider.listAccounts();
                    const account = accounts[0];

                    const signer = provider.getSigner(account);
                    const contract = new ethers.Contract(contractAddress, DataStorageABI, signer);

                    await contract.storeData(sender, receiver, BigInt(amount));

                    // Redirect to FE payment success status page
                    res.redirect("http://localhost:3000");
                } else {
                    // Handle other cases, like payment failure or pending
                    res.send("Payment failed or pending");
                }
            })
            .catch(function (error) {
                // Handle error
                res.send(error);
            });
    } else {
        res.send("Sorry!! Error");
    }
});


// Starting the server
const port = 3002;
app.listen(port, () => {
  console.log(`PhonePe application listening on port ${port}`);
});


