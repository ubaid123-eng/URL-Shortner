const URL = require("../models/urlShort");
const shortid = require("shortid");

// handling to save the shortid for the provided url
const CreateUrlShortner = async (req, res) => {
  try {
    const body = req.body;
    
    //check if the requestes body has url or not
    if (!body.url) {
      return res.status(400).json({
        success: false,
        message: "please provide the url",
      });
    }

    const shortID = shortid();

    const url = new URL({
      shortId: shortID,
      redirectURL: body.url,
      visitedHistory: [],
    });

    await url.save();

    return res.status(201).json({
      success: true,
      message: "short id of the provided url created successfully",
      id: url.shortId,
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};





// handling the analytice of through shortid
const AnalysticUrl = async (req, res) => {
  try {
    const shortId = req.params.shortid;

    // check if the requestes shortern id exist or not
    const urldata = await URL.findOne({ shortId });
    if (!urldata) {
      return res.status(400).json({
        success: false,
        message: "short id doesn not exist!!!!!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "id found successfully!!!",
      AnalysticsUrlData: [
        {
          TotalClicks: urldata.visitedHistory.length,
          VisistHistory: urldata.visitedHistory,
        },
      ],
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};





// handling the redirection through shortid from db
const RedicrectUrlShortner = async (req, res) => {
  try {
    const shortId = req.params.shortid;

    // check if the requestes shortern id exist or not
    const existid = await URL.findOne({ shortId });
    if (!existid) {
      return res.status(400).json({
        success: false,
        message: "short id doesn not exist!!!!!!",
      });
    }

    const urldata = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    return res.redirect(urldata.redirectURL);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = {
  CreateUrlShortner,
  AnalysticUrl,
  RedicrectUrlShortner,
};
