const { Router } = require("express");
const blobStream = require("blob-stream");
const questions = require("../questions");
const mailer = require("../nodemailer");
const User = require("../models/User");
const generator = require("../pdfgenerator");

const router = Router();

router.get("/", (req, res) => {
  try {
    res.json(questions);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "что-то пошло не так" });
  }
});

router.post("/send", async (req, res) => {
  try {
    const { answers, user } = req.body;
    const { fio, tel, email } = user;

    if (!fio || !tel || !email) {
      return res.status(400).json({ message: "Не все данные указаны" });
    }

    let correct = 0;
    let unanswered = questions.length - answers.length;
    let result = [];

    const userAnswers = (answers) => {
      answers.map((v) => {
        if (v.t === true) {
          correct++;
        }
      });
    };

    userAnswers(answers);

    console.log(answers);

    questions.forEach((i, index) => {
      const answer = answers.find((i) => i.index == index);

      if (answer) {
        if (answer.t) {
          result.push(`${index + 1})${answer.answer} - Правильно.`);
        } else {
          result.push(`${index + 1})${answer.answer} - Неправильно.`);
        }
      } else {
        result.push(`${index + 1}) Неовеченный.`);
      }
    });

    const newUser = new User({ fio, tel, email, correct, unanswered });

    await newUser.save();

    generator(fio, tel, email, correct, unanswered, result);

    const message = {
      to: `olegderyabin22@gmail.com`, // list of receivers
      subject: "Результаты теста", // Subject line
      html: `Спасибо что прошли наше тестирование!<br>
      <strong>ФИО:</strong> ${fio}<br>
      <strong>Телефон:</strong> ${tel}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Правильных ответов:</strong> ${correct}<br>
      <strong>Неотвеченных:</strong> ${unanswered}<br>
      
      Вопросы:<br>
      ${result}`, // plain text body
    };

    // mailer(message);

    res
      .status(200)
      .json({ message: "Заявка отправлена", path: `${email}.pdf` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "что-то пошло не так" });
  }
});

router.post("/check", async (req, res) => {
  try {
    const { user } = req.body;

    const candidate = await User.findOne({ email: user.email });

    if (candidate && candidate.email != "olegderyabin22@gmail.com") {
      return res
        .status(400)
        .json({ message: "Полозователь с таким Email уже есть" });
    }

    res.status(200).json({ message: "все пучком" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "что-то пошло не так" });
  }
});

module.exports = router;
