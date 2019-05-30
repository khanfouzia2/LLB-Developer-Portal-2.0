const express = require('express');
const router = express.Router();
const { MobileApp, MobileAppQuestionair, MobileAppQuestionairChoice, MobileAppQuestionairAnswer, sequelize } = require('../database/models.js');
const { LoadFullMobileAppsByUserId, LoadFullSingleMobileAppsByAppId } = require('../utils/mobileAppUtil')

router.post('/q/:id', async function (req, res) {
  try {
    const appId = req.params.id;
    let foundedMobileApp = await LoadFullSingleMobileAppsByAppId(appId);
    const { questionairList } = foundedMobileApp;
    const data = questionairList.map(question => {
      let obj = {
        q_id: question.id,
        created_at: question.created_at,
        question: question.question,
        type: convertQuestionTypeToNumber(question.type),
        app_id: foundedMobileApp.id
      };
      if (question.questionOptions.length > 0) {
        let choicesString = question.questionOptions.map(x => x.content);
        let choices = choicesString.join("/@/");
        obj.choices = choices;
      }
      return obj;
    });

    let returnObj = {
      lib_token: "288d9ca5-4cec-4a82-84a5-f85421cfca73",
      message: "OK",
      code: 200,
      data: data
    }

    return res.status(200).send(returnObj);
  }
  catch (e) {
    console.log(`Error while trying to get a list of mobile app. error = ${e}`);
    res.status(500).send();
  }
});

/* Example request payload
{  
   "feedbacks":[  
      {  
         "q_id":80,
         "answer":"1"
      },
      {  
         "q_id":81,
         "answer":"3"
      },
      {  
         "q_id":82,
         "answer":"2"
      }
   ],
   "llb_token":"288d9ca5-4cec-4a82-84a5-f85421cfca73"
}

*/
router.post('/q_r', async function (req, res) {
  try {
    const payload = req.body;
    const { feedbacks } = payload;
    transaction = await sequelize.transaction();
    for (feedback of feedbacks) {
      let questionModel = await MobileAppQuestionair.findOne({ where: { id: feedback.q_id } })
      let answer = feedback.answer;
      if (questionModel != null) {
        if (questionModel.type == "singleChoice" || questionModel.type === "multipleChoice") {
          let ListOfChoice = await MobileAppQuestionairChoice.findAll({ where: { question_id: questionModel.id } })
          let choiceObj = ListOfChoice[answer];
          answer = choiceObj.content;
        }
      }
      let createdAnswer = await MobileAppQuestionairAnswer.create({
        answer: answer,
        question_id: feedback.q_id
      }, { transaction });
    }
    let returnObj = {
      lib_token: "288d9ca5-4cec-4a82-84a5-f85421cfca73",
      message: "OK",
      code: 200,
    }
    await transaction.commit();
    return res.status(200).send(returnObj);
  }
  catch (e) {
    console.log(`Error while trying to create question. error = ${e}`);
    res.status(500).send();
  }
});


convertQuestionTypeToNumber = (typeAsString) => {
  let numb = -1;
  switch (typeAsString) {
    case 'text':
      numb = 0;
      break;
    case 'singleChoice':
      numb = 1;
      break;
    case 'multipleChoice':
      numb = 2;
      break;
    case 'sentiment':
      numb = 3;
      break;
    case 'rating':
      numb = 4;
      break;
    default:
      numb = numb
  }
  return numb
}

module.exports = router;