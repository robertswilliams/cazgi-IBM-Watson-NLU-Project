const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
  const analyzeParams = {
    'url': req.query.url,
    'features': {
      'emotion': {
         'document': true
        }
    }
  };

  getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    return res.send(analysisResults.result.emotion.document.emotion);
  })
  .catch(err => {
    return res.send({"sadness": "0", "joy": "0", "fear": "0", "disgust": "0", "anger": "0"});
  });
});

app.get("/url/sentiment", (req,res) => {
  const analyzeParams = {
    'url': req.query.url,
    'features': {
      'sentiment': {
         'document': true
        }
    }
  };

  getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    return res.send(analysisResults.result.sentiment.document);
  })
  .catch(err => {
    return res.send({"score": "0", "label": "neutral"});
  });
});

app.get("/text/emotion", (req,res) => {
  const analyzeParams = {
    'text': req.query.text,
    'features': {
      'emotion': {
         'document': true
        }
    }
  };

  getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    return res.send(analysisResults.result.emotion.document.emotion);
  })
  .catch(err => {
    return res.send({"sadness": "0", "joy": "0", "fear": "0", "disgust": "0", "anger": "0"});
  });
});

app.get("/text/sentiment", (req,res) => {
  const analyzeParams = {
    'text': req.query.text,
    'features': {
      'sentiment': {
         'document': true
        }
    }
  };

  getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    return res.send(analysisResults.result.sentiment.document);
  })
  .catch(err => {
    return res.send({"score": "0", "label": "neutral"});
  });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
