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
      question: "Apa itu keanekaragaman hayati?",
      correct_answer: "Variasi makhluk hidup di Bumi",
      incorrect_answers: ["Keanekaragaman hutan", "Keanekaragaman laut", "Keanekaragaman udara"],
    },
    {
      question: "Tingkat keanekaragaman hayati yang meliputi variasi gen disebut?",
      correct_answer: "Keanekaragaman gen",
      incorrect_answers: ["Keanekaragaman ekosistem", "Keanekaragaman spesies", "Keanekaragaman bioma"],
    },
    {
      question: "Keanekaragaman hayati terbesar di dunia terdapat di?",
      correct_answer: "Hutan hujan tropis",
      incorrect_answers: ["Gurun", "Kutub", "Hutan taiga"],
    },
    {
      question: "Apa contoh keanekaragaman ekosistem?",
      correct_answer: "Hutan, padang rumput, dan terumbu karang",
      incorrect_answers: ["DNA, RNA, dan protein", "Air, tanah, dan udara", "Gunung, sungai, dan laut"],
    },
    {
      question: "Penyebab utama hilangnya keanekaragaman hayati adalah?",
      correct_answer: "Aktivitas manusia",
      incorrect_answers: ["Perubahan iklim", "Letusan gunung berapi", "Angin topan"],
    },
    // Soal tambahan
    {
      question: "Apa yang dimaksud dengan spesies endemik?",
      correct_answer: "Spesies yang hanya ditemukan di wilayah geografis tertentu",
      incorrect_answers: ["Spesies yang hidup di banyak ekosistem", "Spesies yang bermigrasi sepanjang tahun", "Spesies yang punah di alam liar"],
    },
    {
      question: "Salah satu ancaman terbesar bagi keanekaragaman hayati adalah?",
      correct_answer: "Deforestasi",
      incorrect_answers: ["Kepunahan alami", "Perubahan suhu global", "Migrasi burung"],
    },
    {
      question: "Apa contoh keanekaragaman genetik?",
      correct_answer: "Variasi warna bulu pada kucing",
      incorrect_answers: ["Hutan dan padang rumput", "Komunitas serangga", "Spesies ikan dalam laut"],
    },
    {
      question: "Apakah yang dimaksud dengan bioma?",
      correct_answer: "Komunitas ekosistem besar yang mencakup wilayah luas",
      incorrect_answers: ["Jenis spesies tunggal", "Kelompok genetik individu", "Proses evolusi"],
    },
    {
      question: "Apa contoh interaksi simbiosis mutualisme?",
      correct_answer: "Lebah yang membantu penyerbukan bunga",
      incorrect_answers: ["Cacing pita dalam tubuh hewan", "Buaya dengan burung pemakan parasit", "Ikan kecil yang menempel pada ikan besar"],
    },
    {
      question: "Apa yang menjadi ciri utama keanekaragaman ekosistem laut?",
      correct_answer: "Variasi jenis terumbu karang, ikan, dan mamalia laut",
      incorrect_answers: ["Jenis hutan dan padang rumput", "Jenis pohon dan serangga", "Komunitas burung dan reptil"],
    },
    {
      question: "Apa dampak utama dari hilangnya keanekaragaman hayati terhadap ekosistem?",
      correct_answer: "Menurunkan stabilitas dan kesehatan ekosistem",
      incorrect_answers: ["Meningkatkan kesuburan tanah", "Meningkatkan jumlah spesies invasif", "Meningkatkan produktivitas lahan"],
    },
    {
      question: "Apa yang dimaksud dengan spesies invasif?",
      correct_answer: "Spesies yang bukan asli dan merugikan ekosistem lokal",
      incorrect_answers: ["Spesies yang punah secara alami", "Spesies yang bermigrasi secara musiman", "Spesies yang tinggal di habitat alami"],
    },
    {
      question: "Bagaimana cara melestarikan keanekaragaman hayati?",
      correct_answer: "Membuat cagar alam dan taman nasional",
      incorrect_answers: ["Membakar hutan", "Mengeringkan lahan basah", "Menangkap spesies langka untuk dijadikan hewan peliharaan"],
    },
    {
      question: "Apa fungsi utama keanekaragaman hayati dalam ekosistem?",
      correct_answer: "Menjaga keseimbangan dan stabilitas ekosistem",
      incorrect_answers: ["Mengurangi ketersediaan sumber daya", "Meningkatkan risiko bencana alam", "Mengurangi populasi hewan predator"],
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
