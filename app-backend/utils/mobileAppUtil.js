const { MobileApp, MobileAppQuestionair, MobileAppQuestionairChoice, sequelize } = require('../database/models.js');

//This will return an mobile app Objects will full question and options

LoadFullMobileAppsByUserId = async (userId) => {
  const MobileApps = await MobileApp.findAll({
    raw: true,
    where: {
      user_id: userId
    }
  })
  const FullInfoMobileApp = await Promise.all(MobileApps.map(async app => {
    let questions = await MobileAppQuestionair.findAll({
      raw: true,
      where: {
        app_id: app.id,
        isObsolete:false
      }
    })
    let questionsWithOption = await Promise.all(questions.map(async question => {
      let options = await MobileAppQuestionairChoice.findAll({
        raw: true,
        where: {
          question_id: question.id
        }
      });
      question.isEditable = false;
      question.questionOptions = options
      return question;
    }));
    app.questionairList = questionsWithOption;
    return app;
  }));
  return FullInfoMobileApp;
}

LoadFullSingleMobileAppsByUserId = async (mobileAppId) => {
  const mobileApp = await MobileApp.findOne({
    raw: true,
    where: {
      id: mobileAppId
    }
  })
  let questions = await MobileAppQuestionair.findAll({
    raw: true,
    where: {
      app_id: mobileApp.id,
      isObsolete:false
    }
  })
  let questionsWithOption = await Promise.all(questions.map(async question => {
    let options = await MobileAppQuestionairChoice.findAll({
      raw: true,
      where: {
        question_id: question.id
      }
    });
    question.isEditable = false;
    question.questionOptions = options
    return question;
  }));
  mobileApp.questionairList = questionsWithOption;
  return mobileApp;
}




/*
Eager loading doesn't really work --- leave here for some reference in the future
*/
// //This method return an mobile with all the questions and options
// EagerLoadingSingleMobileApp = async (mobileApp) => {
//   const {id} = mobileApp;
//   const mobileApps = await MobileApp.findOne({
//     where: {
//       id: id,
//     },
//     include: [{
//        model: MobileAppQuestionair, as: "questionairList",
//        include:[{
//           model: MobileAppQuestionairChoice, as: "questionOptions"
//        }]
//     }]
//   });
//   return mobileApps.dataValues;
// }

// EagerLoadingMobileAppByUserId = async (userId) => {
//   const mobileApps = await MobileApp.findAll({
//     raw: true,
//     where: {
//       user_id: userId,
//     },
//     include: [{
//        model: MobileAppQuestionair, as: "questionairList",
//        include:[{
//           model: MobileAppQuestionairChoice, as: "questionOptions"
//        }]
//     }]
//   });
//   return mobileApps;
// }
module.exports = {
  LoadFullMobileAppsByUserId,
  LoadFullSingleMobileAppsByUserId
}
