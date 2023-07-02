import i18n from "../../common/i18n/i18n";

export const step2 = [
  {
    id: 1,
    question_no: 1,
    question: i18n.t("s2q1"),
    options: [
      { statement: "Kurumsal inovasyon farkındalığı yaratma", ranking: 1 },
      { statement: "İnovasyon odak alanları belirleme", ranking: 2 },
      { statement: "Startup ve ArGe firmaları ile çalışma", ranking: 3 },
      { statement: "Girişimlere yatırım yapma", ranking: 4 },
    ],
    short_name: "innovation_goals",
    question_type: "ranking",
  },
  {
    id: 2,
    question_no: 2,
    question: i18n.t("s2q2"),
    options: [
      "İnovasyon stratejisi veya dijital dönüşüm stratejisi çalışmaları yapıldı ve kurum içinde paylaşıldı",
      "Kurum içerisinde dedike olarak (sadece) inovasyon süreçlerini takip eden çalışanlar var",
      "Daha önce en az 1 girişim ile yapısal veya rastlantısal bir şekilde etkileşime girip, çalışma yapıldı",
      "Girişimcilik ekosisteminde en az bir yatırımcı veya hızlandırma ile işbirliğimiz var",
      "Kurum içinden kurum içi girişimcilik çalışmaları veya inovasyon projeleri sonucunda çıkmış ürün veya şirketler var",
    ],
    short_name: "innovation_state",
    question_type: "likert",
  },
  {
    id: 3,
    question_no: 3,
    question: i18n.t("s2q3"),
    options: [
      "Bir girişimle çalışmak",
      "Bir girişime yatırım yapmak",
      "Kurum içinde inovasyonla ilgili talepler almak",
    ],
    short_name: "success_definition",
    question_type: "multiple",
  },
];
