const express = require("express");
const app = express();
const server = require("http").Server(app);
const databaseIngredients = require("./databaseIngredients");
const cookieSession = require("cookie-session");
const compression = require("compression");
const { s3Url } = require("./config");
const uidSafe = require("uid-safe");
const helmet = require("helmet");
const multer = require("multer");
const s3 = require("./s3");
const { addProduct, getLastProducts, getProductsByTyping } = require("./db");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 9097152
    }
});
const googleVision = async function(url) {
    // Imports the Google Cloud client library
    const vision = require("@google-cloud/vision");
    // Creates a client
    let client;
    if (process.env.NODE_ENV === "production") {
        client = new vision.ImageAnnotatorClient({
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
        });
    } else {
        client = new vision.ImageAnnotatorClient({
            keyFilename: __dirname + "/google1.json"
        });
    }

    // Performs label detection on the image file
    const [result] = await client.textDetection(url);
    console.log(client.textDetection(url));
    const labels = result.textAnnotations;
    return labels;
};

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    let finalRes = [];
    console.log("**************************************POST/upload");
    var ingredients = databaseIngredients.ingredients;

    const imageUrl = s3Url + req.file.filename;
    console.log("imageUrl: ", imageUrl);

    googleVision(imageUrl)
        .then(results => {
            let ingredientsFromAPI = [];
            for (var i = 0; i < results.length; i++) {
                ingredientsFromAPI.push(results[i].description.toLowerCase());
            }
            //REGEX THE REMOVES LINE BREAKS
            let ingredientsArr = ingredientsFromAPI[0].split(/[\n,]+/); //superimportanat DO NOT DELETE YOUR LIFE DEPENDS ON IT
            for (var z = 0; z < ingredientsArr.length; z++) {
                ingredientsArr[z] = ingredientsArr[z].trim();
            }
            for (var x = 0; x < ingredients.length; x++) {
                if (ingredientsArr.includes(ingredients[x].name)) {
                    finalRes.push(ingredients[x]);
                }
            }

            res.json({
                data: [finalRes]
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                err: "oops",
                data: "no results"
            });
        });
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(helmet());
app.use(express.static("./public"));
app.use(
    cookieSession({
        secret: "everything is garbage",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    res.redirect("/");
});

app.post("/addproduct", (req, res) => {
    console.log("*************** /add product POST ***********");
    addProduct(
        req.body.productName,
        req.body.brandname,
        req.body.producttype,
        req.body.fitsSystem
    )
        .then(data => {
            res.json({ data, success: true });
        })
        .catch(err => {
            console.log("err in /register POST: ", err);
            res.json({
                success: false
            });
        });
});

app.get("/getLastProducts.json", (req, res) => {
    console.log("*****************GET LAST products*******************");
    getLastProducts()
        .then(data => {
            // console.log(data);
            res.json(data.rows);
        })
        .catch(err => console.log(err));
});
//
app.post("/getinput/:product.json", (req, res) => {
    console.log("***************** post input*******************");
    getProductsByTyping(req.params.product)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
