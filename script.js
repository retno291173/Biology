const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen"),
  alertBox = document.querySelector("#alert");

let questions = [
  {
    "question": "Apa itu keanekaragaman hayati?",
    "correct_answer": "Variasi makhluk hidup di Bumi",
    "incorrect_answers": ["Keanekaragaman hutan", "Keanekaragaman laut", "Keanekaragaman udara"]
  },
  {
    "question": "Tingkat keanekaragaman hayati yang meliputi variasi gen disebut?",
    "correct_answer": "Keanekaragaman gen",
    "incorrect_answers": ["Keanekaragaman ekosistem", "Keanekaragaman spesies", "Keanekaragaman bioma"]
  },
  {
    "question": "Keanekaragaman hayati terbesar terdapat di?",
    "correct_answer": "Hutan hujan tropis",
    "incorrect_answers": ["Gurun", "Kutub", "Hutan taiga"]
  },
  {
    "question": "Contoh keanekaragaman ekosistem?",
    "correct_answer": "Hutan, padang rumput, terumbu karang",
    "incorrect_answers": ["DNA, RNA, protein", "Air, tanah, udara", "Gunung, sungai, laut"]
  },
  {
    "question": "Penyebab utama hilangnya keanekaragaman hayati?",
    "correct_answer": "Aktivitas manusia",
    "incorrect_answers": ["Perubahan iklim", "Letusan gunung", "Angin topan"]
  },
  {
    "question": "Apa itu spesies endemik?",
    "correct_answer": "Spesies di wilayah tertentu",
    "incorrect_answers": ["Hidup di banyak ekosistem", "Bermigrasi sepanjang tahun", "Punah di alam liar"]
  },
  {
    "question": "Ancaman terbesar bagi keanekaragaman hayati?",
    "correct_answer": "Deforestasi",
    "incorrect_answers": ["Kepunahan alami", "Perubahan suhu global", "Migrasi burung"]
  },
  {
    "question": "Contoh keanekaragaman genetik?",
    "correct_answer": "Variasi warna bulu kucing",
    "incorrect_answers": ["Hutan, padang rumput", "Komunitas serangga", "Spesies ikan laut"]
  },
  {
    "question": "Apa itu bioma?",
    "correct_answer": "Komunitas ekosistem besar",
    "incorrect_answers": ["Jenis spesies tunggal", "Kelompok genetik", "Proses evolusi"]
  },
  {
    "question": "Contoh simbiosis mutualisme?",
    "correct_answer": "Lebah membantu penyerbukan",
    "incorrect_answers": ["Cacing pita pada hewan", "Buaya dan burung", "Ikan kecil pada ikan besar"]
  },
  {
    "question": "Ciri utama ekosistem laut?",
    "correct_answer": "Terumbu karang, ikan, mamalia laut",
    "incorrect_answers": ["Hutan, padang rumput", "Pohon dan serangga", "Komunitas burung dan reptil"]
  },
  {
    "question": "Dampak hilangnya keanekaragaman hayati?",
    "correct_answer": "Menurunkan stabilitas ekosistem",
    "incorrect_answers": ["Meningkatkan kesuburan tanah", "Meningkatkan spesies invasif", "Meningkatkan produktivitas lahan"]
  },
  {
    "question": "Apa itu spesies invasif?",
    "correct_answer": "Spesies yang merugikan ekosistem",
    "incorrect_answers": ["Punah secara alami", "Migrasi musiman", "Tinggal di habitat alami"]
  },
  {
    "question": "Cara melestarikan keanekaragaman hayati?",
    "correct_answer": "Cagar alam dan taman nasional",
    "incorrect_answers": ["Membakar hutan", "Mengeringkan lahan basah", "Menangkap spesies langka"]
  },
  {
    "question": "Fungsi keanekaragaman hayati?",
    "correct_answer": "Menjaga keseimbangan ekosistem",
    "incorrect_answers": ["Mengurangi sumber daya", "Meningkatkan risiko bencana", "Mengurangi populasi predator"]
  },  
    
  ],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
  const nama = document.querySelector("#nama").value.trim();
  const kelas = document.querySelector("#kelas").value.trim();

  if (nama === "" || kelas === "") {
    alert("Harap masukkan nama dan kelas Anda.");
    return; // Menghentikan eksekusi jika input kosong
  }

  startScreen.classList.add("hide");
  quiz.classList.remove("hide");
  currentQuestion = 1;
  showQuestion(questions[0]);
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  questionNumber.innerHTML = ` Soal <span class="current">${
    questions.indexOf(question) + 1
  }</span><span class="total">/${questions.length}</span>`;

  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");

submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      document.querySelectorAll(".answer").forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
    }
  } else {
    document.querySelectorAll(".answer").forEach((answer) => {
      if (
        answer.querySelector(".text").innerHTML ===
        questions[currentQuestion - 1].correct_answer
      ) {
        answer.classList.add("correct");
      }
    });
  }

  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");

const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
}
