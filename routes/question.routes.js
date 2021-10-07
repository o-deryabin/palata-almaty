const { Router } = require("express");
const questions = require("../questions");
const mailer = require("../nodemailer");

const router = Router();

router.get("/", (req, res) => {
  try {
    res.json(questions);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "что-то пошло не так" });
  }
});

router.post("/send", (req, res) => {
  try {
    const { answers, user } = req.body;

    if (!user.fio || !user.tel || !user.email) {
      return res.status(400).json({ message: "Не все данные указаны" });
    }

    let correct = 0;
    let unanswered =
      answers.length < questions.length ? questions.length - answers.length : 0;

    const userAnswers = (answers) => {
      answers.map((v) => {
        if (v.t === true) {
          correct++;
        }
      });
    };

    userAnswers(answers);

    const message = {
      to: "olegderyabin22@gmail.com", // list of receivers
      subject: "Результаты теста", // Subject line
      text: `Спасибо что прошли наше тестирование!
      ФИО: ${user.fio}
      Телефон: ${user.tel}
      Email: ${user.email} 
      Правильных ответов: ${correct}
      Неотвеченных: ${unanswered}`, // plain text body
    };

    mailer(message);

    res.status(200).json({ message: "Заявка отправлена" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "что-то пошло не так" });
  }
});

module.exports = router;
